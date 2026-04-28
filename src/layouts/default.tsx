import { NavbarVertical } from "@/components/ui/navbar/navbarVertical";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <aside
          className="
            hidden md:flex
            w-20
            bg-base
            border-r border-gray-300
            sticky 
            z-40
          "
        >
          <NavbarVertical />
        </aside>

        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6">{children}</main>
      </div>
    </div>
  );
}
