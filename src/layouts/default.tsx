import { NavbarVertical } from "@/components/ui/navbar/navbarVertical";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="flex h-full min-h-screen">
        <div
          className="
            hidden md:flex
            w-20
            bg-base
            
            sticky top-0 
            z-40 h-screen
          "
        >
          <NavbarVertical />
        </div>
        <div className="flex-1 px-4 sm:px-6 lg:px-10 py-6">{children}</div>
      </section>
    </main>
  );
}
