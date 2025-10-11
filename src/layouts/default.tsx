import { Header } from "@/components/header";
import { NavbarVertical } from "@/components/navbarVertical";
import { motion } from "framer-motion";
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col w-full h-screen bg-background">
      <main className="mx-auto max-[1980px] flex-grow w-full">
        <section className="grid grid-cols-[auto_1fr]">
          <div className="grid col h-dvh bg-base rounded-e-xl">
            <NavbarVertical />
          </div>
          <div className="grid col">
            <main className="py-8 px-10">
              <motion.div
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }} // Duração da animação
              >
                <Header />
                <div className="mt-4">{children}</div>
              </motion.div>
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
