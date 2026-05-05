import { HandPlatter, X, Users } from "lucide-react";
import { useState, useMemo } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AccountClient({ onSelectClient, setPage }) {
  const API_URL =
    "https://api-7pecados.onrender.com/sale/account_client/historic/?isOpen=true";

  const { data, error, isLoading, mutate } = useSWR(API_URL, fetcher);

  const accounts = data?.account ?? [];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {isLoading ? (
        <div className="animate-pulse">
          <header className="flex items-center justify-between px-4 py-4">
            <div className="h-6 w-48 bg-zinc-300 dark:bg-zinc-700 rounded-md" />
          </header>

          <div className="px-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="
                px-4 py-4
                flex items-center justify-between
                border border-dashed my-2 rounded-2xl border-zinc-300 dark:border-zinc-700
              "
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-300 dark:bg-zinc-700" />

                  <div className="flex flex-col gap-2">
                    <div className="h-4 w-32 bg-zinc-300 dark:bg-zinc-700 rounded" />
                    <div className="h-3 w-24 bg-zinc-200 dark:bg-zinc-600 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <header className="flex items-center justify-between px-4 py-4 ">
            <div>
              <p className="text-2xl font-bold text-foreground">
                Contas em aberto
              </p>
            </div>
          </header>
          <div className="h-[500px] overflow-scroll">
            {accounts.map((acc) => (
              <div
                key={acc._id}
                className="
              px-4 py-4
              flex items-center justify-between border border-dashed my-2 rounded-2xl border-zinc-400
              hover:bg-default-100 dark:hover:bg-zinc-800
              transition cursor-pointer
            "
                onClick={() => onSelectClient(acc._id, acc.name)}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-2xl bg-primary text-base">
                    <HandPlatter size={40} />
                  </div>

                  <div>
                    <p className="font-bold text-lg">{acc.name}</p>
                    <span className="text-xs text-muted-foreground">
                      7 Pedidos registrado
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <footer className="p-4 border-t border-zinc-300 mt-auto ">
            <button
              className={`
                        w-full py-4 rounded-xl font-semibold transition bg-primary text-primary-foreground hover:bg-primary/90"
                      `}
            >
              Adicionar conta
            </button>
          </footer>
        </div>
      )}
    </div>
  );
}
