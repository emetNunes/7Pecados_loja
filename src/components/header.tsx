import { ThemeSwitch } from "@/components/theme-switch";
import { Image, User } from "@heroui/react";
import { Menu, UserCog, UserIcon } from "lucide-react";
import icon_7pecados_name from "@/icons/7pecados_name.png";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  onToggleMenu: () => void;
}

export const Header = ({ onToggleMenu }: HeaderProps) => {
  const pathname = useLocation().pathname;

  const titles: Record<string, string> = {
    "/": "Dashboard",
    "/stock": "Produtos",
    "/production": "Produção",
    "/service": "Atendimento",
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <header
      className="
        fixed top-0 left-0 right-0
        h-[72px]
        z-50
        flex items-center justify-between
        px-4 sm:px-6
        bg-background/90
        backdrop-blur
        border-b border-border
      "
    >
      {/* ESQUERDA */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleMenu}
          className="
            md:hidden
            h-10 w-10
            flex items-center justify-center
            rounded-lg
            hover:bg-primary/10
          "
        >
          <Menu size={24} />
        </button>

        <div>
          <div className="text-lg font-semibold leading-tight">
            {titles[pathname] ?? ""}
          </div>
          <Image src={icon_7pecados_name} height={18} />
        </div>
      </div>

      {/* DIREITA */}
      <div className="flex items-center gap-4">
        <ThemeSwitch />
        <User
          name={user?.name}
          description={user?.permission}
          avatarProps={{
            icon: user?.permission === "admin" ? <UserCog /> : <UserIcon />,
          }}
        />
      </div>
    </header>
  );
};
