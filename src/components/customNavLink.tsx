import { NavLink, type NavLinkProps } from "react-router-dom";
import type { ReactNode } from "react";

type CustomNavLinkProps = NavLinkProps & {
  children: ReactNode;
};

export const CustomNavLink = ({
  to,
  children,
  ...props
}: CustomNavLinkProps) => {
  const activeClass =
    "bg-primary text-base font-bold flex w-full justify-center px-6 p-2 rounded-e-lg";
  const inactiveClass = "px-6 p-2 rounded-e-lg";

  return (
    <div className="flex w-full justify-center">
      <NavLink
        to={to}
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        {...props}
      >
        {children}
      </NavLink>
    </div>
  );
};
