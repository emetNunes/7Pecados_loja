import { Divider } from "@heroui/divider";
import { CustomNavLink } from "./customNavLink";

export const NavbarVertical = () => {
  return (
    <div className="col-span-3 lg:col-span-2 bg-gray-200">
      <section className="flex flex-col w-full h-full justify-between p-6 items-center">
        <div className="">
          LOGO
          <Divider className="my-4" />
        </div>
        <nav className="flex flex-col items-start h-full">
          <div>
            <CustomNavLink to={"/"}>Linha 1</CustomNavLink>
          </div>
          <div>
            <CustomNavLink to="/stock">Linha 2</CustomNavLink>
          </div>
          <Divider className="my-4" />
          <div>
            <CustomNavLink to="/production">Linha 3</CustomNavLink>
          </div>
          <div>
            <CustomNavLink to="/service">Linha 4</CustomNavLink>
          </div>
        </nav>
        <div className="">
          <Divider className="my-4" />
          Sair
        </div>
      </section>
    </div>
  );
};
