import { ThemeSwitch } from "@/components/theme-switch";
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";
import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://api-7pecados.onrender.com";

export default function LoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      console.log("Usuário já está logado, redirecionando para /");
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/user/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: usuario,
          password: password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          localStorage.setItem("authToken", data.token);
        }
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          const userData = { ...data };
          delete userData.token;
          localStorage.setItem("user", JSON.stringify(userData));
        }
        console.log("Login realizado com sucesso, redirecionando...");
        navigate("/", { replace: true });
      } else {
        console.error("Falha no login: Usuário ou senha inválidos.");
        setError("Falha no login: Usuário ou senha inválidos.");
      }
    } catch (error) {
      console.error("Erro de rede ou ao conectar com a API:", error);
      setError("Erro de rede. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen">
      <main className="grid max-w-[1080px] h-full m-auto">
        <div className="flex flex-col">
          <header className="flex justify-end mt-4">
            <ThemeSwitch />
          </header>
          <section className="flex justify-center items-center h-full mt-[-120px]">
            <div className="flex flex-col bg-base py-12 px-6 rounded-xl shadow-2xl gap-6">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold">Login</h2>
                <p className="text-default-700">Olá usuário, bem vindo</p>
              </div>
              <div className="grid gap-4 w-[360px]">
                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <form
                  onSubmit={handleLogin}
                  className="grid grid-rows-2 gap-4 w-[360px]"
                >
                  <Input
                    label="Usuário"
                    placeholder="Digite seu usuário"
                    type="text"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    disabled={isLoading}
                  />
                  <Input
                    label="Senha"
                    placeholder="Digite sua senha"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />

                  <Button
                    className="bg-primary text-base rounded-xl"
                    type="submit"
                    disabled={isLoading}
                  >
                    <span className="default invert">
                      {isLoading ? "Aguardando..." : "Acessar"}
                    </span>
                  </Button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
