import clsx from "clsx";
import {
  HandPlatter,
  X,
  Users,
  CircleAlert,
  ArrowBigDown,
  ArrowLeft,
  CircleX,
} from "lucide-react";
import { useState, useMemo } from "react";
import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

const formatDate = (date) => {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return "--";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "UTC",
  }).format(parsedDate);
};

export default function AccountClient({ handlerClient, setPageCurrent }) {
  const API_URL =
    "https://api-7pecados.onrender.com/sale/account_client/historic";

  const { data: accounts, error, isLoading, mutate } = useSWR(API_URL, fetcher);
  const [statusOn, setStatus] = useState("true");

  const groupAccounts =
    accounts?.account.reduce((acc, account) => {
      const status = account.isOpen;
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(account);

      return acc;
    }, {}) || {};

  accounts?.account.length > 0 &&
    !statusOn &&
    statusOn === "" &&
    setStatus(Object.keys(groupAccounts)[0]);

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
        <div className=" h-full flex flex-col">
          <header className="flex items-center justify-between p-5">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-2xl">
                <HandPlatter className="text-primary" size={22} />
              </div>

              <div>
                <h1 className="text-xl font-bold">Contas cadastradas</h1>

                <div className="flex items-center gap-2 mt-1">
                  <span className="font-medium text-primary">
                    Gerencie os clientes
                  </span>
                </div>
              </div>
            </div>
          </header>

          {accounts?.account?.length > 0 ? (
            <div className="h-full">
              <div className="w-full flex flex-row gap-2 justify-between  rounded-2xl bg-background">
                <div className="flex p-1 bg-zinc-100 rounded-2xl gap-1">
                  {Object.entries(groupAccounts).map(
                    ([status, pedidosGrupo]) => (
                      <button
                        key={status}
                        onClick={() => setStatus(status)}
                        className={clsx(
                          "flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                          {
                            "bg-white shadow text-primary": statusOn === status,
                          },
                          {
                            "text-zinc-500 hover:text-zinc-700":
                              statusOn !== status,
                          },
                        )}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <span>
                            {status == "true" ? "Abertas" : "Fechadas"}
                          </span>

                          <span
                            className={clsx(
                              "text-xs px-2 py-0.5 rounded-full",
                              statusOn === status
                                ? "bg-primary/10 text-primary"
                                : "bg-zinc-200 text-zinc-500",
                            )}
                          >
                            {pedidosGrupo.length}
                          </span>
                        </div>
                      </button>
                    ),
                  )}
                </div>
              </div>
              <div className="overflow-y-scroll max-h-[530px]">
                {accountCard(groupAccounts, statusOn, handlerClient)}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <CircleX size={100} className="text-primary" />
              <p className="font-bold text-[20px]">Nenhuma conta encontrada</p>
              <p className="text-center text-zinc-600">
                Cadastre uma conta através do botão abaixo.
              </p>
            </div>
          )}

          <footer className="p-4 border-t  border-zinc-300 mt-auto   ">
            <button
              onClick={() => {
                setPageCurrent("createAccount");
              }}
              className="w-full flex justify-center  items-center py-4 rounded-xl font-semibold transition bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <div>Cadastrar conta</div>
              <ArrowLeft size={18} className="ml-2 rotate-180" />
            </button>
          </footer>
        </div>
      )}
    </div>
  );
}

const accountCard = (groupAccounts, statusOn, handlerClient) => {
  return Object.entries(groupAccounts).map(([status, accounts]) => (
    <>
      {statusOn == status && (
        <>
          {accounts.map((acc) => (
            <div
              key={acc._id}
              className="
                        px-4 py-2
                        flex items-center justify-between border border-dashed my-2 rounded-2xl border-zinc-400
                        hover:bg-default-100 dark:hover:bg-zinc-800
                        transition cursor-pointer
                      "
              onClick={() => handlerClient([acc._id, acc.name])}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <HandPlatter size={18} />
                </div>

                <div>
                  <span className="font-bold">{acc.name}</span>
                  <div className="flex gap-2 items-center">
                    <span className="text-xs text-default-500">
                      #{acc._id?.slice(-5)}
                    </span>
                    <span className="text-zinc-300">•</span>
                    <span className="text-xs text-default-500">
                      Aberto em: {formatDate(acc.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  ));
};
