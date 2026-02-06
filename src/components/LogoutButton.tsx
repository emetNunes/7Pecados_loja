import { Button } from "@heroui/react";
import { ReactNode } from "react";
import { useToast } from "@/contexts/ToastContext";

const API_URL = "https://api-7pecados.onrender.com";

interface User {
  id: number;
}

type LogoutButtonProps = {
  children: ReactNode;
};

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const userString = localStorage.getItem("user");

      if (token && userString) {
        const user: User = JSON.parse(userString);
        const userId = user.id;
        const response = await fetch(`${API_URL}/user/logout`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: userId,
          }),
        });

        if (response.ok) {
          console.log("Token invalidado no servidor com sucesso.");
        } else {
          console.warn(
            "O servidor falhou em invalidar o token, mas o logout local continuará."
          );
        }
      }
    } catch (error) {
      console.error("Erro ao conectar com a API para logout:", error);
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      toast.info("Você foi desconectado", "Logout realizado");
      // Pequeno delay para mostrar a notificação antes de redirecionar
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    }
  };

  return (
    <Button onClick={handleLogout} className="bg-base">
      {children}
    </Button>
  );
};
