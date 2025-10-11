import { Divider } from "@heroui/divider";
import { CustomNavLink } from "./customNavLink";
import { Image, Tooltip } from "@heroui/react";
import icon_nabar_7pecados from "@/icons/icon_nabar_7pecados.png";
import {
  House,
  PackageSearch,
  SquareKanban,
  ShoppingCart,
  LogOut,
} from "lucide-react";

let icon_size = 32;
let icon_stroke = 2.4;

let navbarList = [
  {
    router: "/",
    icon: <House size={icon_size} strokeWidth={icon_stroke} />,
    namePage: "Dashboard",
  },
  {
    router: "/stock",
    icon: <PackageSearch size={icon_size} strokeWidth={icon_stroke} />,
    namePage: "Gerenciamento de produtos",
  },
  {
    router: "/production",
    icon: <SquareKanban size={icon_size} strokeWidth={icon_stroke} />,
    namePage: "Área de produção",
  },
  {
    router: "/service",
    icon: <ShoppingCart size={icon_size} strokeWidth={icon_stroke} />,
    namePage: "Ponto de atendimento",
  },
];

export const NavbarVertical = () => {
  return (
    <div className="col-span-3 lg:col-span-2">
      <section className="flex flex-col w-full h-full justify-between items-center py-4">
        <div>
          <Image
            alt="icon 7pecados"
            src={icon_nabar_7pecados}
            height={icon_size}
          />
        </div>
        <Divider className="my-4" />
        <nav className="flex flex-col items-center h-full gap-6">
          {navbarList.flatMap((elemento, index) => {
            const items = [
              <CustomNavLink to={`${elemento.router}`}>
                <Tooltip content={`${elemento.namePage}`} showArrow={true}>
                  {elemento.icon}
                </Tooltip>
              </CustomNavLink>,
            ];
            if (index === 1) {
              items.push(<Divider key="divider-1" />);
            }
            return items;
          })}
        </nav>
        <Divider className="my-4" />
        <div className="text-primary">
          <LogOut size={24} />
        </div>
      </section>
    </div>
  );
};
