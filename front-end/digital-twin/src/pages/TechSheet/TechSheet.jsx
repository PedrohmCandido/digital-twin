import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

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
		// try to fetch full patient record from backend (no GET /patients/:id available), so fetch all and match by email or name
		if (!user) return;
		(async () => {
			try {
				setLoading(true);
				const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
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

		const source = patient || user || {};
		const isPatientLike = Object.keys(source).some((k) => patientFields.includes(k));

		const entries = isPatientLike
			? patientFields.filter((f) => source[f] !== undefined).map((k) => [k, source[k]])
			: Object.entries(source).filter(([k]) => !["password", "token"].includes(k));

		if (!user) {
		return (
			<div className="min-h-screen flex items-center justify-center p-6">
				<div className="w-full max-w-md border border-black/10 p-6 rounded-2xl shadow-sm bg-white text-center">
					<p className="text-gray-600">Nenhum usuário encontrado.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-surface p-6">
			<div className="mx-auto max-w-5xl">
				<div className="border border-black/10 rounded-2xl bg-white shadow-sm overflow-hidden">
					<div className="px-6 py-5 border-b flex items-center justify-between gap-4">
						<div>
							<h1 className="text-2xl font-semibold text-[#324158]">Ficha Técnica do Paciente</h1>
							<p className="text-sm text-muted-foreground mt-1">Dados pessoais usados no cadastro</p>
						</div>

						{/* Button to go back to Landing Page */}
						<div>
							<Link
								to="/landing-page"
								className="rounded-lg border px-3 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
							>
								Voltar à Página Inicial
							</Link>
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
	);
}
