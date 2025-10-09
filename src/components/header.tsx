import { ThemeSwitch } from "@/components/theme-switch";

export const Header = () => {
  return (
    <header className=" flex justify-between items-center">
      <section>
        <div>Pagina</div>
        <div>Logo</div>
      </section>
      <section className="flex gap-4 items-center">
        <div>
          <ThemeSwitch />
        </div>
        <div className="flex flex-row gap-4 items-center">
          <div>Notificação</div>
          <div className="flex flex-col">
            <div>Nome Usuário</div>
            <div>Cargo</div>
          </div>
        </div>
      </section>
    </header>
  );
};
