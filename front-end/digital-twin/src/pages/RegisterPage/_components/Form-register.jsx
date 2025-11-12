import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../../services/auth.js";
import { createPatient } from "../../../services/patient.js";
import {
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  User,
  Phone,
  Home,
  Calendar,
} from "lucide-react";

export default function Form_register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    name: "",
    phone: "",
    address: "",
    gender: "",
    birthdate: "",
    illnesses: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg("");
  }

  async function handleRegister(e) {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.username.trim()) return setErrorMsg("Informe um usuário.");
    if (!formData.email.trim()) return setErrorMsg("Informe um email.");
    if (formData.password !== formData.confirm)
      return setErrorMsg("As senhas não coincidem.");

    try {
      setIsSubmitting(true);

      const user = await register({
        name: formData.username,
        email: formData.email,
        password: formData.password,
      });

      await createPatient({
        fk_user: user.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        gender: formData.gender,
        birthdate: formData.birthdate,
        illnesses: formData.illnesses
          ? formData.illnesses.split(",").map((item) => item.trim())
          : [],
      });

      localStorage.setItem("user", JSON.stringify(user));
      navigate("/landing-page");
    } catch (err) {
      setErrorMsg(err?.message || "Erro ao cadastrar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="rounded-2xl border shadow-sm overflow-hidden bg-card text-card-foreground">
        <div className="px-6 py-6 md:px-8 md:py-8 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
          <h1 className="text-2xl md:text-3xl font-semibold">Criar conta</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Preencha os campos abaixo para continuar
          </p>
        </div>

        <form
          onSubmit={handleRegister}
          className="px-6 py-6 md:px-8 md:py-8 space-y-8"
        >
          <section>
            <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-4">
              Dados pessoais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nome completo */}
              <div className="space-y-1">
                <label htmlFor="name" className="text-sm font-medium">
                  Nome completo
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    size={18}
                  />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border bg-background px-10 py-2 outline-none focus:ring-4 focus:ring-primary/30"
                  />
                </div>
              </div>

              {/* Telefone */}
              <div className="space-y-1">
                <label htmlFor="phone" className="text-sm font-medium">
                  Telefone
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    size={18}
                  />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border bg-background px-10 py-2 outline-none focus:ring-4 focus:ring-primary/30"
                  />
                </div>
              </div>

              {/* Data de nascimento */}
              <div className="space-y-1">
                <label htmlFor="birthdate" className="text-sm font-medium">
                  Data de nascimento
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    size={18}
                  />
                  <input
                    id="birthdate"
                    name="birthdate"
                    type="date"
                    value={formData.birthdate}
                    onChange={handleChange}
                    className="w-full rounded-xl border bg-background px-10 py-2 outline-none focus:ring-4 focus:ring-primary/30"
                  />
                </div>
              </div>

              {/* Gênero */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Gênero</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Masculino", "Feminino", "Outro"].map((opt) => (
                    <label
                      key={opt}
                      className={`cursor-pointer rounded-xl border px-3 py-2 text-sm text-center transition ${
                        formData.gender === opt
                          ? "border-primary ring-2 ring-primary/30"
                          : "hover:border-muted-foreground/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={opt}
                        checked={formData.gender === opt}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              {/* Endereço */}
              <div className="space-y-1 md:col-span-2">
                <label htmlFor="address" className="text-sm font-medium">
                  Endereço
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-3" size={18} />
                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Rua, número, bairro, cidade"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full rounded-xl border bg-background pl-10 pr-3 py-2 outline-none focus:ring-4 focus:ring-primary/30"
                  />
                </div>
              </div>

              {/* Doenças */}
              <div className="space-y-1 md:col-span-2">
                <label htmlFor="illnesses" className="text-sm font-medium">
                  Possui alguma doença?{" "}
                  <span className="text-muted-foreground">(opcional)</span>
                </label>
                <textarea
                  id="illnesses"
                  name="illnesses"
                  placeholder="Separe por vírgulas (ex: diabetes, asma)"
                  value={formData.illnesses}
                  onChange={handleChange}
                  className="w-full min-h-24 resize-y rounded-xl border bg-background px-3 py-2 outline-none focus:ring-4 focus:ring-primary/30"
                />
              </div>
            </div>
          </section>

          <hr className="border-muted/30" />

          {/* --- Conta de acesso --- */}
          <section>
            <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-4">
              Conta de acesso
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Usuário */}
              <div className="space-y-1">
                <label htmlFor="username" className="text-sm font-medium">
                  Usuário
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    size={18}
                  />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Seu usuário"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full rounded-xl border bg-background px-10 py-2 outline-none focus:ring-4 focus:ring-primary/30"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    size={18}
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="voce@exemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border bg-background px-10 py-2 outline-none focus:ring-4 focus:ring-primary/30"
                  />
                </div>
              </div>

              {/* Senha */}
              <div className="space-y-1">
                <label htmlFor="password" className="text-sm font-medium">
                  Senha
                </label>
                <div className="relative">
                  <LockKeyhole
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    size={18}
                  />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mínimo 6 caracteres"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-xl border bg-background px-10 pr-10 py-2 outline-none focus:ring-4 focus:ring-primary/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirmar senha */}
              <div className="space-y-1">
                <label htmlFor="confirm" className="text-sm font-medium">
                  Confirmar senha
                </label>
                <div className="relative">
                  <LockKeyhole
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    size={18}
                  />
                  <input
                    id="confirm"
                    name="confirm"
                    type={showPassword ? "text" : "password"}
                    placeholder="Repita a senha"
                    value={formData.confirm}
                    onChange={handleChange}
                    className="w-full rounded-xl border bg-background px-10 py-2 outline-none focus:ring-4 focus:ring-primary/30"
                  />
                </div>
              </div>
            </div>
          </section>

          {errorMsg && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
              {errorMsg}
            </p>
          )}

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-primary text-primary-foreground py-3 text-sm font-medium transition hover:opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? "Cadastrando..." : "Criar conta"}
            </button>
            <p className="text-sm text-center text-muted-foreground">
              Já possui uma conta?{" "}
              <Link
                to="/login"
                className="text-primary underline-offset-2 hover:underline"
              >
                Fazer login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
