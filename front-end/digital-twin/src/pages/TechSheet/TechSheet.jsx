import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

function safeGetUser() {
	try {
		const raw = localStorage.getItem("user");
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}

export default function TechSheet() {
	const navigate = useNavigate();
	const user = safeGetUser();

	if (!user) {
			return (
				<div className="min-h-screen flex items-center justify-center p-6">
					<div className="w-full max-w-md border border-black/10 p-6 rounded-2xl shadow-sm bg-white text-center">
						<p className="text-gray-600">Nenhum usuário encontrado.</p>
					</div>
				</div>
			)
	}

	// Exclude sensitive fields
	const excluded = ['password', 'token'];
	const entries = Object.entries(user).filter(([k]) => !excluded.includes(k));

	return (
		<div className="min-h-screen flex items-start justify-center p-6">
			<div className="w-full max-w-2xl">
				<div className="border border-black/10 p-6 rounded-2xl shadow-sm bg-white">
					<div className="flex items-center gap-4">
						<div className="mx-auto grid size-12 place-items-center rounded-full border-4 border-[#6CB7BD]/30 w-12 h-12">
							<User size={20} color="#6CB7BD" />
						</div>
						<div>
							<h1 className="text-2xl font-semibold text-[#324158]">Ficha Técnica do Usuário</h1>
							<p className="text-sm text-muted-foreground">Dados utilizados no cadastro do usuário</p>
						</div>
					</div>

								<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
									{entries.map(([key, value]) => (
										<div key={key} className="rounded-lg border p-3">
											<div className="text-xs text-gray-500 mb-1">{key.replace(/_/g, ' ')}</div>
											<div className="font-medium text-[#324158]">{Array.isArray(value) ? value.join(', ') : String(value)}</div>
										</div>
									))}
								</div>
				</div>
			</div>
		</div>
	);
}
