import { ThemeSwitch } from "@/components/theme-switch";
import { Image, Badge, User } from "@heroui/react";
import { Bell, UserCog, UserIcon } from "lucide-react";
import icon_7pecados_name from "@/icons/7pecados_name.png";
import { useLocation } from "react-router-dom";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

export const Header = () => {
  const userString = localStorage.getItem("user");
  let user_save = null;
  if (userString) {
    try {
      user_save = JSON.parse(userString);
    } catch (e) {
      console.error("Erro ao fazer parse do usuário:", e);
      localStorage.removeItem("user");
    }
  }

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <header className=" flex justify-between items-center bg-background shadow-lg py-2 px-10">
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
          <div onClick={onOpen} className="cursor-pointer hidden">
            <Badge size="sm" color="danger" content="99+" shape="circle">
              <Bell className="text-primary" size={24} strokeWidth={2.4} />
            </Badge>
          </div>
          <div className="flex flex-col items-center">
            <User
              avatarProps={{
                icon:
                  user_save.permission === "admin" ? (
                    <UserCog />
                  ) : (
                    <UserIcon size={24} />
                  ),
              }}
              description={user_save.permission}
              name={user_save.name}
              classNames={{
                name: "font-bold",
                description: "text-sm text-default-500",
              }}
            />
          </div>
        </div>
      </section>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} className="hidden">
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Nofificações
              </DrawerHeader>
              <DrawerBody>Fazer as notificações aqui!</DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </header>
  );
};
