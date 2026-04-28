import { Divider } from "@heroui/divider";
import { CustomNavLink } from "./customNavLink";
import { Image, Tooltip, User } from "@heroui/react";
import {
  House,
  PackageSearch,
  SquareKanban,
  ShoppingCart,
  UserIcon,
} from "lucide-react";

import icon_nabar_7pecados from "../../../../public/icons/icon_nabar_7pecados.png";
import { LogoutButton } from "./LogoutButton";
import { ThemeSwitch } from "@/components/theme-switch";
import UserButton from "./UserButton";

const ICON_SIZE = 26;
const ICON_STROKE = 2.3;

const navItems = [
  { to: "/", label: "Dashboard", icon: House },
  { to: "/stock", label: "Produtos", icon: PackageSearch },
  { to: "/production", label: "Produção", icon: SquareKanban },
  { to: "/service", label: "Atendimento", icon: ShoppingCart },
];

const user = JSON.parse(localStorage.getItem("user") || "{}");

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

      <ThemeSwitch />

      <Divider className="w-10 my-4" />

      <Tooltip content={user?.name} placement="right" showArrow>
        <div
          className="
                  w-12 h-12
                  flex items-center justify-center
                  rounded-xl
                  transition
                  bg-primary/10
                  hover:bg-primary/20 mb-4
                "
        >
          <UserIcon size={ICON_SIZE} strokeWidth={ICON_STROKE} />
        </div>
      </Tooltip>

      <LogoutButton />
    </nav>
  );
};
