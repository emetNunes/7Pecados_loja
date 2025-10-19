import { ThemeSwitch } from "@/components/theme-switch";
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";

export default function LoginPage() {
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
                <Input
                  label="Usuário"
                  placeholder="Digite seu usuário"
                  type="text"
                />
                <Input
                  label="Senha"
                  placeholder="Digite sua senha"
                  type="password"
                />
                <button className="flex text-md text-default-700 cursor-pointer hover:text-default-500">
                  Esqueceu sua senha? Clique aqui
                </button>
              </div>
              <Button className="bg-primary text-base rounded-xl">
                <span className="default invert">Acessar</span>
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
