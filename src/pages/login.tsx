import { ThemeSwitch } from "@/components/theme-switch";
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";
import { useState, FormEvent } from "react";

const API_URL = "https://api-7pecados.onrender.com";

export default function LoginPage() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    console.log("Enviando para API:");
    console.log("Usuário:", usuario);
    console.log("Senha:", password);

    try {
      const response = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usuario,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login realizado com sucesso!", data);
      } else {
        console.error("Falha no login: Usuário ou senha inválidos.");
      }
    } catch (error) {
      console.error("Erro de rede ou ao conectar com a API:", error);
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
              <div className="grid grid-rows-2 gap-4 w-[360px]">
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
                  />
                  <Input
                    label="Senha"
                    placeholder="Digite sua senha"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <Button
                    className="bg-primary text-base rounded-xl"
                    type="submit"
                  >
                    <span className="default invert">Acessar</span>
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
