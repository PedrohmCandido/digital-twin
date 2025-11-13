import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPatient, updatePatient } from "../../services/patient";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import AppSidebar from "../../pages/LandingPage/_components/Sidebar.jsx";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Settings() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [patient, setPatient] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    adress: "",
    birth: "",
    gender: "",
  });

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      setError(null);
      try {
        const data = await getPatient();

        // A API pode retornar array ou objeto.
        const p = Array.isArray(data) ? data[0] : data;

        if (!p) {
          // Nenhum paciente: manter vazio mas informar
          if (mounted) {
            setPatient(null);
            setError("Nenhum paciente encontrado.");
          }
          return;
        }

        if (mounted) {
          setPatient(p);
          setForm({
            name: p.name || "",
            email: p.email || "",
            phone: p.phone || "",
            adress: p.adress || "",
            birth: p.birth || "",
            gender: p.gender || "",
          });
        }
      } catch (err) {
        console.error("Erro ao carregar paciente:", err);
        if (mounted) setError("Erro ao carregar dados. Veja o console.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!patient || !patient.id) {
      alert("Paciente inválido. Não é possível atualizar.");
      return;
    }

    setUpdating(true);
    setError(null);
    try {
      const updated = await updatePatient(patient.id, form);
      setPatient(updated);
      alert("Informações atualizadas com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar:", err);
      setError("Erro ao atualizar. Veja o console para detalhes.");
    } finally {
      setUpdating(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-10 h-10 text-[#324158]" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        {/* Sidebar */}
        <AppSidebar />

        {/* Conteúdo */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-20 border-b border-[#75A7BD] bg-[#324158]/8 backdrop-blur p-4">
            <div className="mx-auto max-w-6xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="text-[#34D1B7]" />
                <h1 className="text-2xl font-semibold text-[#324158]">
                  Configurações
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleLogout}
                  className="rounded-md bg-[#34D1B7] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#6CB7BD] transition"
                >
                  Sair
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">
            <div className="mx-auto max-w-5xl space-y-6">
              {error && (
                <div className="rounded-md bg-[#FFDCDC]/40 border border-red-200 p-3 text-red-800">
                  {error}
                </div>
              )}

              {/* Card com informações do usuário */}
              <Card className="border border-[#75A7BD] shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#324158]">
                    Suas informações
                  </CardTitle>
                </CardHeader>

                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[#324158]">
                  <div>
                    <p className="text-sm text-gray-600">Nome</p>
                    <p className="font-medium">{patient?.name || "-"}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{patient?.email || "-"}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Telefone</p>
                    <p className="font-medium">{patient?.phone || "-"}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Endereço</p>
                    <p className="font-medium">{patient?.adress || "-"}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Nascimento</p>
                    <p className="font-medium">{patient?.birth || "-"}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Gênero</p>
                    <p className="font-medium">{patient?.gender || "-"}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Card de edição */}
              <Card className="border border-[#75A7BD] shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#324158]">
                    Editar informações
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Nome</Label>
                        <Input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          className="border-[#75A7BD]"
                        />
                      </div>

                      <div>
                        <Label>Email</Label>
                        <Input
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          type="email"
                          className="border-[#6CB7BD]"
                        />
                      </div>

                      <div>
                        <Label>Telefone</Label>
                        <Input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className="border-[#34D1B7]"
                        />
                      </div>

                      <div>
                        <Label>Endereço</Label>
                        <Input
                          name="adress"
                          value={form.adress}
                          onChange={handleChange}
                          className="border-[#357066]"
                        />
                      </div>

                      <div>
                        <Label>Nascimento</Label>
                        <Input
                          name="birth"
                          value={form.birth}
                          onChange={handleChange}
                          type="date"
                          className="border-[#75A7BD]"
                        />
                      </div>

                      <div>
                        <Label>Gênero</Label>
                        <Input
                          name="gender"
                          value={form.gender}
                          onChange={handleChange}
                          className="border-[#6CB7BD]"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <Button
                        type="submit"
                        disabled={updating}
                        className="bg-[#324158] hover:bg-[#75A7BD] text-white"
                      >
                        {updating ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "Salvar alterações"
                        )}
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          // reverter campos para os dados do patient
                          setForm({
                            name: patient?.name || "",
                            email: patient?.email || "",
                            phone: patient?.phone || "",
                            adress: patient?.adress || "",
                            birth: patient?.birth || "",
                            gender: patient?.gender || "",
                          });
                        }}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
