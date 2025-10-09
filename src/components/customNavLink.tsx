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
  const activeClass = "text-primary font-bold";
  const inactiveClass = "";

  return (
    <div>
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
