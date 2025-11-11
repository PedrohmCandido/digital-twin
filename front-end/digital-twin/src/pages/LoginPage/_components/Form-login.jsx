import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../../services/auth.js";
import { User, Mail, LockKeyhole, Eye, EyeOff } from "lucide-react";

export default function Form_login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    try {
      const user = await login(formData);
      if (!user) {
        setErrorMsg("Usuário ou senha inválidos.");
        setIsSubmitting(false);
        return;
      }
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/landing-page");
    } catch {
      setErrorMsg("Erro ao fazer login. Tente novamente.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md border border-black/10 p-8 shadow-2xl rounded-2xl bg-white">
      <div className="mx-auto grid size-20 place-items-center rounded-full border-4 border-[#6CB7BD]/40">
        <User size={28} color="#6CB7BD" />
      </div>

      <h1 className="mt-6 text-center text-3xl font-semibold tracking-wide text-[#324158]">
        LOGIN
      </h1>

      {errorMsg && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleLogin} className="mt-8 space-y-5">
        <div>
          <label htmlFor="email" className="sr-only">
            E-mail
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 grid pl-3 pr-2 place-items-center">
              <Mail size={18} color="#75A7BD" />
            </span>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="USERNAME"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-[#6CB7BD] text-[#324158] placeholder-[#75A7BD] py-3 pl-11 pr-3 focus:outline-none focus:ring-4 focus:ring-[#34D1B7]/30 focus:border-[#34D1B7] transition"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Senha
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 grid pl-3 pr-2 place-items-center">
              <LockKeyhole size={18} color="#75A7BD" />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="PASSWORD"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-[#6CB7BD] text-[#324158] placeholder-[#75A7BD] py-3 pl-11 pr-28 focus:outline-none focus:ring-4 focus:ring-[#34D1B7]/30 focus:border-[#34D1B7] transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 inset-y-0 my-1.5 px-3 rounded-lg text-xs font-semibold bg-[#6CB7BD]/20 text-[#357066] hover:bg-[#6CB7BD]/30 focus:outline-none focus:ring-2 focus:ring-[#34D1B7]"
              aria-pressed={showPassword}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex items-center gap-2 select-none text-[#324158]">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-[#6CB7BD] text-[#34D1B7] focus:ring-[#34D1B7]"
            />
            Remember me
          </label>
          <Link
            to="/forgot-password"
            className="font-semibold text-[#75A7BD] hover:underline"
          >
            Forgot Password
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#34D1B7] to-[#357066] hover:from-[#357066] hover:to-[#34D1B7] focus:outline-none focus:ring-4 focus:ring-[#75A7BD]/40 transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
              LOGGING IN...
            </span>
          ) : (
            "LOGIN"
          )}
        </button>

        <div className="h-px bg-gradient-to-r from-transparent via-[#6CB7BD]/40 to-transparent" />

        <p className="text-center text-sm text-[#324158]">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[#75A7BD] font-semibold hover:underline"
          >
            Create one
          </Link>
        </p>
      </form>

      <p className="mt-8 text-center text-xs text-[#6CB7BD]">
        Protegido por boas práticas de segurança •{" "}
        <span className="text-[#34D1B7]">v1.0</span>
      </p>
    </div>
  );
}
