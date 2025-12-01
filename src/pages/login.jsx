import { ThemeSwitch } from "@/components/theme-switch";
import { Input, Button } from "@heroui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "../services/api";

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
  const [error, setError] = useState(null);

  async function handleLogin(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const loginData = {
        login: usuario,
        password: password,
      };

      const data = await fetchApi("/user/login/", {
        method: "POST",
        body: loginData,
      });

      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }

      let userToStore;

      if (data.user) {
        userToStore = data.user;
      } else {
        const { token, ...userData } = data;
        userToStore = userData;
      }

      localStorage.setItem("user", JSON.stringify(userToStore));

      navigate("/", { replace: true });
    } catch (err) {
      if (err instanceof Error) {
        console.error("Falha no login:", err.message);
        setError(err.message);
      } else {
        console.error("Erro inesperado:", err);
        setError("Ocorreu um erro inesperado.");
      }
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
