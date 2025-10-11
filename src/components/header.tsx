import { ThemeSwitch } from "@/components/theme-switch";
import { Image, Badge, User } from "@heroui/react";
import { Bell } from "lucide-react";
import icon_7pecados_name from "@/icons/7pecados_name.png";
import { useLocation } from "react-router-dom";

export const Header = () => {
  let currentPage = "";
  switch (useLocation().pathname) {
    case "/":
      currentPage = "Dashboard";
      break;
    case "/stock":
      currentPage = "Gerenciamento de produtos";
      break;
    case "/production":
      currentPage = "Área de produção";
      break;
    case "/service":
      currentPage = "Ponto de Atendimento";
      break;
  }

  return (
    <header className=" flex justify-between items-center">
      <section>
        <div className="text-2xl font-bold">{currentPage}</div>
        <div>
          <Image
            alt="icon 7pecados"
            src={icon_7pecados_name}
            height={"1.4rem"}
          />
        </div>
      </section>
      <section className="flex gap-4 items-center">
        <ThemeSwitch />
        <div className="flex flex-row gap-6 items-center">
          <Badge size="sm" color="danger" content="99+" shape="circle">
            <Bell className="text-primary" size={24} strokeWidth={2.4} />
          </Badge>
          <div className="flex flex-col items-center">
            <User
              avatarProps={{
                src: "https://avatars.githubusercontent.com/u/88737544?v=4",
              }}
              description="Front-End"
              name="Victor Santos"
              classNames={{
                name: "font-bold",
                description: "text-sm text-default-500",
              }}
            />
          </div>
        </div>
      </section>
    </header>
  );
};
