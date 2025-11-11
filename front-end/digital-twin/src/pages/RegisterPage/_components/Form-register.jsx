import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { register } from "../../../services/auth.js";
// import { createPatient } from "../../../services/patient.js";
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
    adress: "",
    gender: "",
    birth: "",
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
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      await createPatient({
        name: formData.name,
        phone: formData.phone,
        adress: formData.adress,
        gender: formData.gender,
        birth: formData.birth,
        illnesses: formData.illnesses,
      });
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
                    autoComplete="name"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border bg-background px-10 py-2 outline-none focus:ring-4 focus:ring-primary/30"
                  />
                </div>
              </div>

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
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border bg-background px-10 py-2 outline-none focus:ring-4 focus:ring-primary/30"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="birth" className="text-sm font-medium">
                  Data de nascimento
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    size={18}
                  />
                  <input
                    id="birth"
                    name="birth"
                    type="date"
                    value={formData.birth}
                    onChange={handleChange}
                    className="w-full rounded-xl border bg-background px-10 py-2 outline-none focus:ring-4 focus:ring-primary/30"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Gênero</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Masculino", "Feminino", "Outro"].map((opt) => (
                    <label
                      key={opt}
                      className={`cursor-pointer rounded-xl border px-3 py-2 text-sm text-center transition
                        ${
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

              <div className="space-y-1 md:col-span-2">
                <label htmlFor="adress" className="text-sm font-medium">
                  Endereço
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-3" size={18} />
                  <input
                    id="adress"
                    name="adress"
                    type="text"
                    autoComplete="street-address"
                    placeholder="Rua, número, bairro, cidade"
                    value={formData.adress}
                    onChange={handleChange}
                    className="w-full rounded-xl border bg-background pl-10 pr-3 py-2 outline-none focus:ring-4 focus:ring-primary/30"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Dica: incluir CEP ajuda no preenchimento automático depois.
                </p>
              </div>

              <div className="space-y-1 md:col-span-2">
                <label htmlFor="illnesses" className="text-sm font-medium">
                  Possui alguma doença?{" "}
                  <span className="text-muted-foreground">(opcional)</span>
                </label>
                <textarea
                  id="illnesses"
                  name="illnesses"
                  placeholder="Descreva alergias, condições ou medicações relevantes"
                  value={formData.illnesses}
                  onChange={handleChange}
                  className="w-full min-h-24 resize-y rounded-xl border bg-background px-3 py-2 outline-none focus:ring-4 focus:ring-primary/30"
                />
              </div>
            </div>
          </section>

          <hr className="border-muted/30" />

          <section>
            <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-4">
              Conta de acesso
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    autoComplete="username"
                    placeholder="Seu usuário"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full rounded-xl border bg-background px-10 py-2 outline-none focus:ring-4 focus:ring-primary/30"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Dica: use 4–20 caracteres, sem espaços.
                </p>
              </div>

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
                    autoComplete="email"
                    placeholder="voce@exemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border bg-background px-10 py-2 outline-none focus:ring-4 focus:ring-primary/30"
                  />
                </div>
              </div>

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
                    autoComplete="new-password"
                    placeholder="Mínimo 6 caracteres"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-xl border bg-background px-10 pr-10 py-2 outline-none focus:ring-4 focus:ring-primary/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    aria-label={
                      showPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Recomendado: combine letras, números e símbolos.
                </p>
              </div>

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
                    autoComplete="new-password"
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
