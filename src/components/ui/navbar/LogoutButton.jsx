import { Button, Tooltip } from "@heroui/react";
import { ReactNode } from "react";
import {
  LogOut,
} from "lucide-react";
const API_URL = "https://api-7pecados.onrender.com";



export const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const userString = localStorage.getItem("user");

      if (token && userString) {
        const user = JSON.parse(userString);

        await fetch(`${API_URL}/user/logout`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id: user.id }),
        });
      }
    } catch (error) {
      console.error("Erro ao conectar com a API para logout:", error);
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");

      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    }
  };

  return (
    <Button className="
              w-12 h-12
              flex items-center justify-center
              text-primary
              bg-base rounded-none
              hover:bg-primary hover:text-base
              border-r-1 border-gray-300
            " onClick={handleLogout}>

      <Tooltip content="Sair" placement="right" showArrow>
          <div
            
          >
            <LogOut size={24} strokeWidth={2.3} />
          </div>
        </Tooltip>
    </Button>
  );
};
