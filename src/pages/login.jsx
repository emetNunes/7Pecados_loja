import { ThemeSwitch } from "@/components/theme-switch";
import FormLogin from "@/components/ui/login/form-login";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) navigate("/", { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen w-full bg-background">
      <main className="grid lg:grid-cols-2 min-h-screen">
        <section className="hidden lg:flex flex-col justify-between p-12 bg-primary text-white">
          <div className="flex justify-end">
            <ThemeSwitch />
          </div>

          <div className="max-w-md">
            <h1 className="text-3xl font-bold leading-tight">
              Bem-vindo de volta!
            </h1>
            <p className="mt-3 text-white/80">
              Sistema oficial da 7Pecados Gourmet.
            </p>
          </div>

          <span className="text-sm text-white/60">
            © {new Date().getFullYear()} • Codeflow - todos os direitos
            reservados!
          </span>
        </section>

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

            <div className="flex flex-col gap-1 mb-6">
              <h2 className="text-2xl font-semibold">Login</h2>
              <p className="text-sm text-default-500">
                Entre com seus dados para continuar
              </p>
            </div>

            <FormLogin />
          </div>
        </section>
      </main>
    </div>
  );
}
