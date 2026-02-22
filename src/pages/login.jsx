import { ThemeSwitch } from "@/components/theme-switch";
import { Input, Button } from "@heroui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "../services/api";
import { Loader2, Lock } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) navigate("/", { replace: true });
  }, [navigate]);

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchApi("/user/login/", {
        method: "POST",
        body: { login: usuario, password },
      });

      if (data.token) localStorage.setItem("authToken", data.token);

      const userToStore =
        data.user ??
        (() => {
          const { token, ...rest } = data;
          return rest;
        })();

      localStorage.setItem("user", JSON.stringify(userToStore));

      const userName = userToStore?.name || usuario;
      toast.success(`Bem-vindo, ${userName}!`, "Login realizado com sucesso");

      navigate("/", { replace: true });
    } catch (err) {
      const errorMessage =
        err?.message || "Não foi possível acessar sua conta.";
      setError(errorMessage);
      toast.error(errorMessage, "Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <main className="grid lg:grid-cols-2 min-h-screen">
        {/* LEFT — BRAND / INFO */}
        <section className="hidden lg:flex flex-col justify-between p-12 bg-primary text-white">
          <div className="flex justify-end">
            <ThemeSwitch />
          </div>

          <div className="max-w-md">
            <h1 className="text-3xl font-bold leading-tight">
              Bem-vindo de volta
            </h1>
            <p className="mt-3 text-white/80">
              Acesse o painel administrativo e gerencie sua operação com
              eficiência e controle total.
            </p>
          </div>

          <span className="text-sm text-white/60">
            © {new Date().getFullYear()} • Codeflow - software development
          </span>
        </section>

        {/* RIGHT — LOGIN */}
        <section className="flex items-center justify-center px-6">
          <div
            className="
              w-full max-w-md
              rounded-2xl
              border border-default-200 dark:border-zinc-800
              bg-base dark:bg-zinc-900
              shadow-xl
              px-8 py-10
            "
          >
            <div className="flex justify-between items-center mb-6 lg:hidden">
              <ThemeSwitch />
            </div>

            {/* HEADER */}
            <div className="flex flex-col gap-1 mb-6">
              <h2 className="text-2xl font-semibold">Login</h2>
              <p className="text-sm text-default-500">
                Entre com suas credenciais para continuar
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <div
                className="
                  mb-4 rounded-lg
                  bg-red-50 text-red-700
                  dark:bg-red-900/30 dark:text-red-300
                  px-4 py-3 text-sm
                "
              >
                {error}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <Input
                label="Usuário"
                placeholder="Digite seu usuário"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                disabled={isLoading}
                autoFocus
              />

              <Input
                label="Senha"
                placeholder="Digite sua senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                startContent={<Lock size={16} />}
              />

              <Button
                type="submit"
                disabled={isLoading || !usuario || !password}
                className="
                  mt-2 h-[44px]
                  rounded-xl
                  bg-primary text-primary-foreground
                  font-semibold
                  flex items-center justify-center gap-2
                "
              >
                {isLoading && <Loader2 size={18} className="animate-spin" />}
                {isLoading ? "Entrando..." : "Acessar painel"}
              </Button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
