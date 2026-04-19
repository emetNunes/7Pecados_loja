import { useCallback, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@heroui/react";

import {
  BanknoteArrowUp,
  BanknoteArrowDown,
  ShoppingBasket,
} from "lucide-react";

import useSWR from "swr";
import clsx from "clsx";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function CardTransactions() {
  const [page, setPage] = useState(1);

  const {
    data: inventory,
    isLoading,
    error,
  } = useSWR(
    "https://api-7pecados.onrender.com/admin/stock/inventory/historic",
    fetcher,
  );

  let database = [];
  if (!isLoading && !error) {
    database = inventory.formatted;
  }

  const rowsPerPage = 5;
  const pages = Math.max(1, Math.ceil(database.length / rowsPerPage));
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return database.slice(start, start + rowsPerPage);
  }, [page, database]);

  return (
    <section
      className="
        mt-6 rounded-2xl
        border border-default-200 dark:border-zinc-800
        bg-base dark:bg-zinc-900
        shadow-sm
      "
    >
      {isLoading ? (
        <div className="py-10 text-center text-sm text-default-500">
          Carregando dados…
        </div>
      ) : database.length === 0 ? (
        <div className="py-10 text-center text-sm text-default-500">
          Nenhuma transação encontrada.
        </div>
      ) : (
        <Table
          removeWrapper
          aria-label="Histórico"
          classNames={{
            th: `
              px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide
              text-default-500 dark:text-default-400
            `,
            td: `
              px-5 py-4 text-sm
              border-b border-dashed
              border-default-200 dark:border-zinc-800
            `,
          }}
          bottomContent={
            pages > 1 && (
              <div className="flex justify-center py-4">
                <Pagination
                  isCompact
                  showControls
                  page={page}
                  total={pages}
                  onChange={setPage}
                  color="secondary"
                />
              </div>
            )
          }
        >
          <TableHeader>
            <TableColumn>Resumo</TableColumn>
            <TableColumn>Tipo</TableColumn>
            <TableColumn>Data</TableColumn>
            <TableColumn>Valor</TableColumn>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>

                  <div className="flex items-center rounded-lg gap-4">
                    <div
                      className={clsx(
                        "p-2 rounded-lg text-base",
                        {
                          "text-base bg-primary dark:text-dark dark:bg-primary border-primary":
                            item.type_movement == "exit",
                        },
                        {
                          "dark:text-secondary bg-secondary dark:bg-base":
                            item.type_movement == "entrance",
                        },
                      )}
                    >
                      {item.type == "exit" ? (
                        <BanknoteArrowDown size={32} />
                      ) : (
                        <BanknoteArrowUp size={32} />
                      )}
                    </div>
                    <div className="grid grid-rows-1">
                      <div className="font-bold">

                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-semibold text-default-900 dark:text-white">
                            {clsx(
                              {
                                "Compra de mercadoria":
                                  item.type_movement == "exit",
                              },
                              {
                                "Venda na loja": item.type_movement === "entrance",
                              },
                            )}
                          </span>

                          {item.info && (
                            <span className="text-xs text-default-500 dark:text-default-400">
                              {item.info}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-[0.8rem] text-default-500">{item.description}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium text-default-700 dark:text-default-300">
                    {clsx(
                      { Entrada: item.type_movement == "entrance" },
                      { Saida: item.type_movement == "exit" },
                    )}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-default-600 dark:text-default-400">
                    {item.info || "-"}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={clsx(`text-sm font-semibold text-primary `, {
                      "text-secondary": item.type_movement == "entrance",
                    })}
                  >
                    {item.value}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
}
