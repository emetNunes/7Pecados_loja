import clsx from "clsx";
import { useState } from "react";
import { Input, Button } from "@heroui/react";
import { Loader2, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FormLogin() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function User(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (login === "" || password === "")
        throw new Error("Preencha os campos informados");

      const payload = {
        login: login.trim(),
        password: password.trim(),
      };

      const sendLogin = await fetch(
        "https://api-7pecados.onrender.com/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await sendLogin.json();

      if (data.status == 500) throw new Error(data.message);

      if (!data.token) throw new Error("Acesso não autorizado!");

      const userToStore =
        data.user ??
        (() => {
          const { token, ...rest } = data;
          return rest;
        })();

      console.log(userToStore);

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(userToStore));

      const userName = userToStore?.name || login;

      navigate("/", { replace: true });
    } catch (err) {
      setError(err?.message || "Não foi possível acessar sua conta.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={User} className="flex flex-col gap-4">
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
      <Input
        label="Login"
        placeholder="Digite seu usuário"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
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
        disabled={login == "" || password == ""}
        className={clsx(
          "bg-primary mt-2 h-[44px] rounded-xl text-primary-foreground font-semibold flex items-center justify-center gap-2",
          { "dark:bg-zinc-800": login == "" || password == "" },
        )}
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Entrando...
          </>
        ) : (
          "Entrar"
        )}
      </Button>
    </form>
  );
}
