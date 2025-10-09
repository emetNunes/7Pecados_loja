import { Header } from "@/components/header";
import { NavbarVertical } from "@/components/navbarVertical";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen bg-background">
      <main className="container mx-auto max-w-8xl flex-grow">
        <section className="grid grid-cols-[auto_1fr]">
          <div className="grid col h-dvh bg-base">
            <NavbarVertical />
          </div>
          <div className="grid col">
            <main className="p-6">
              <Header />
              <div className="mt-4">{children}</div>
            </main>
          </div>
        </section>
      </main>

      {/* Pensar no footer depois */}
      {/* <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://flowcode.com.br/"
          title="CodeFlow Página"
        >
          <span className="text-default-600">Criado por</span>
          <p className="text-primary">CodeFlow</p>
        </Link>
      </footer> */}
    </div>
  );
}
