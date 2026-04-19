import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Header } from "@/components/ui/navbar/header";
import { NavbarVertical } from "@/components/ui/navbar/navbarVertical";

const SIDEBAR_WIDTH = 80;

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onToggleMenu={() => setMenuOpen(true)} />

      <div className="flex pt-[72px] min-h-screen">
        <aside
          className="
            hidden md:flex
            w-20
            bg-base
            border-r border-gray-300
            sticky top-[72px]
            h-[calc(100dvh-72px)]
            z-40
          "
        >
          <NavbarVertical />
        </aside>

        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.aside
                initial={{ x: -SIDEBAR_WIDTH }}
                animate={{ x: 0 }}
                exit={{ x: -SIDEBAR_WIDTH }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="
                  fixed
                  left-0
                  top-[72px]
                  z-50
                  w-20
                  h-[calc(100dvh-72px)]
                  bg-base
                  border-r border-border
                  md:hidden
                "
              >
                <NavbarVertical />
              </motion.aside>

              <div
                onClick={() => setMenuOpen(false)}
                className="
                  fixed inset-0
                  top-[72px]
                  bg-black/40
                  z-40
                  md:hidden
                "
              />
            </>
          )}
        </AnimatePresence>

        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6">{children}</main>
      </div>
    </div>
  );
}
