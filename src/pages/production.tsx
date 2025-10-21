import DefaultLayout from "@/layouts/default";
import { Input } from "@heroui/input";
import { Search } from "lucide-react";

export default function ProductionPage() {
  return (
    <DefaultLayout>
      <main className="flex flex-col gap-6">
        <section className="flex gap-4">
          <div className="h-full bg-primary flex p-4 rounded-2xl text-base font-bold">
            1/6
          </div>
          <div className="max-w-[320px]">
            <Input
              className="bg-base shadow-2xl rounded-xl"
              label="Pesquisar Cliente"
              placeholder="Digite aqui..."
              type="email"
              startContent={<Search />}
            />
          </div>
        </section>
        <section>Grid</section>
      </main>
    </DefaultLayout>
  );
}
