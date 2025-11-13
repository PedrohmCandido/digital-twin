import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import AppSidebar from "../../pages/LandingPage/_components/Sidebar.jsx";
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar.js';

function safeGetUser() {
	try {
		const raw = localStorage.getItem("user");
		const parsed = raw ? JSON.parse(raw) : null;

		// unwrap common wrappers returned by auth endpoints
		if (parsed && typeof parsed === 'object') {
			if (parsed.user && typeof parsed.user === 'object') return parsed.user;
			if (parsed.data && typeof parsed.data === 'object') return parsed.data;
			if (parsed.payload && typeof parsed.payload === 'object') return parsed.payload;
		}

		return parsed;
	} catch {
		return null;
	}
}

export default function TechSheet() {
	const user = safeGetUser();
	const [patient, setPatient] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// try to fetch full patient record from backend
		// Prefer lookup by id (if available) using GET /patients/:id, otherwise fallback to fetching all and matching by email/name
		if (!user) return;
		(async () => {
			try {
				setLoading(true);
				const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
				// prefer id lookup when present
				const userId = user._id || user.id || user.userId || null;
				if (userId) {
					try {
						const res = await fetch(`${BASE}/patients/${userId}`);
						if (res.ok) {
							const p = await res.json();
							setPatient(p);
							return;
						}
						// if id lookup not found/available, fallthrough to list fetch
					} catch (err) {
						console.warn('id lookup failed, falling back to list fetch', err);
					}
				}
				// fallback: fetch all and match by email or name
				const res = await fetch(`${BASE}/patients`);
				if (!res.ok) return;
				const list = await res.json();
				const found = list.find(p => (user.email && p.email === user.email) || (user.name && (p.name === user.name || p.name === user.fullname)));
				if (found) setPatient(found);
			} catch (err) {
				console.error('Erro ao buscar paciente completo', err);
			} finally {
				setLoading(false);
			}
		})();
	}, [user]);

	// fields we consider part of a patient record
	const patientFields = [
		"name",
		"email",
		"phone",
		"address",
		"gender",
		"birthdate",
		"illnesses",
	];

		// Preferir sempre os dados do paciente vindos do servidor.
		// Não usar `user` (localStorage) como fallback para evitar exibir dados desatualizados.
		const source = patient || {};
		const isPatientLike = Object.keys(source).length > 0 && Object.keys(source).some((k) => patientFields.includes(k));

		const entries = isPatientLike
			? patientFields.filter((f) => source[f] !== undefined).map((k) => [k, source[k]])
			: [];

		if (!user) {
		return (
			<div className="min-h-screen flex items-center justify-center p-6">
				<div className="w-full max-w-md border border-black/10 p-6 rounded-2xl shadow-sm bg-white text-center">
					<p className="text-gray-600">Nenhum usuário encontrado.</p>
				</div>
			</div>
		);
	}

	// Caso exista sessão local (user) mas o paciente NÃO seja encontrado no backend,
	// preferimos mostrar uma mensagem clara (evita exibir dados stale do localStorage).
	if (user && !patient && !loading) {
		return (
			<div className="min-h-screen flex items-center justify-center p-6">
				<div className="w-full max-w-md border border-black/10 p-6 rounded-2xl shadow-sm bg-white text-center">
					<p className="text-gray-600">Paciente não encontrado no servidor. Os dados locais foram desconsiderados.</p>
					<div className="mt-4 flex justify-center gap-2">
						<button onClick={() => window.location.reload()} className="rounded-lg border px-3 py-1.5 text-sm">Recarregar</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<SidebarProvider>
			<div className="flex w-full">
				<AppSidebar />

				<div className="flex flex-col flex-1 transition-all duration-300">
					<header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-2">
						<div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
							<div className="flex items-center gap-2">
								<SidebarTrigger />
								<h1 className="text-2xl font-bold text-gray-800">Ficha Técnica do Paciente</h1>
							</div>

							<div className="flex items-center gap-2">
								<Link to="/landing-page" className="rounded-lg border px-3 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground">Página Principal</Link>
							</div>
						</div>
					</header>

					<div className="flex-1 p-4">
						<div className="mx-auto max-w-6xl">
							<div className="border border-black/10 rounded-2xl bg-white shadow-sm overflow-hidden">
								<div className="px-6 py-5 border-b flex items-center justify-between gap-4">
									<div>
										<h2 className="text-lg text-muted-foreground">Dados pessoais usados no cadastro</h2>
									</div>

									<div>
									</div>
								</div>

								<div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
									{/* Left: avatar + basic */}
									<aside className="col-span-1 flex flex-col items-center md:items-start">
										<div className="w-28 h-28 rounded-full bg-[#F3FAF9] border-4 border-[#6CB7BD]/30 flex items-center justify-center">
											<User size={36} color="#6CB7BD" />
										</div>
										<div className="mt-4 text-center md:text-left">
											<div className="text-lg font-medium text-[#324158]">{user.name || user.name || user.fullname || '—'}</div>
											{user.email && <div className="text-sm text-muted-foreground">{user.email}</div>}
											{user.phone && <div className="text-sm text-muted-foreground">{user.phone}</div>}
										</div>
									</aside>

									{/* Right: details grid spanning two cols on md */}
									<section className="col-span-1 md:col-span-2">
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
											{entries.map(([key, value]) => {
												// format fields
												let display = value;
												if (key === "birthdate" && value) {
													try {
														const d = new Date(value);
														display = d.toLocaleDateString();
													} catch {
														display = String(value);
													}
												} else if (key === "illnesses" && Array.isArray(value)) {
													display = value.length ? value.join(', ') : 'Nenhuma';
												} else if (value === null || value === undefined || value === '') {
													display = '—';
												}

												const label = String(key).replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

												return (
													<div key={key} className="rounded-lg border p-4">
														<div className="text-xs text-gray-500 mb-1">{label}</div>
														<div className="font-medium text-[#324158] text-sm">{Array.isArray(display) ? display.join(', ') : String(display)}</div>
													</div>
												);
											})}
										</div>
									</section>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</SidebarProvider>
	);
}
