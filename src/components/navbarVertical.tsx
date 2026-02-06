import { Divider } from "@heroui/divider";
import { CustomNavLink } from "./customNavLink";
import { Image, Tooltip } from "@heroui/react";
import {
  House,
  PackageSearch,
  SquareKanban,
  ShoppingCart,
  LogOut,
} from "lucide-react";
import icon_nabar_7pecados from "@/icons/icon_nabar_7pecados.png";
import { LogoutButton } from "../components/LogoutButton";

const ICON_SIZE = 26;
const ICON_STROKE = 2.3;

const navItems = [
  { to: "/", label: "Dashboard", icon: House },
  { to: "/stock", label: "Produtos", icon: PackageSearch },
  { to: "/production", label: "Produção", icon: SquareKanban },
  { to: "/service", label: "Atendimento", icon: ShoppingCart },
];

export const NavbarVertical = () => {
  return (
    <nav className="h-full w-full flex flex-col items-center py-5">
      {/* LOGO */}
      <div className="mb-5">
        <Image src={icon_nabar_7pecados} height={32} />
      </div>

      <Divider className="w-10 mb-4" />

      {/* MENU */}
      <ul className="flex flex-1 flex-col items-center gap-3">
        {navItems.map(({ to, label, icon: Icon }) => (
          <CustomNavLink key={to} to={to}>
            <Tooltip content={label} placement="right" showArrow>
              <div
                className="
                  w-12 h-12
                  flex items-center justify-center
                  rounded-xl
                  transition
                  hover:bg-primary/10
                "
              >
                <Icon size={ICON_SIZE} strokeWidth={ICON_STROKE} />
              </div>
            </Tooltip>
          </CustomNavLink>
        ))}
      </ul>

      <Divider className="w-10 my-4" />

      {/* LOGOUT */}
      <LogoutButton>
        <Tooltip content="Sair" placement="right" showArrow>
          <div
            className="
              w-12 h-12
              flex items-center justify-center
              rounded-xl
              text-primary
              hover:bg-danger/10
            "
          >
            <LogOut size={24} strokeWidth={2.3} />
          </div>
        </Tooltip>
      </LogoutButton>
    </nav>
  );
};
