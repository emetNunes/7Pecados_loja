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
  IceCreamBowl,
} from "lucide-react";

import useSWR from "swr";
import clsx from "clsx";
import { Link } from "react-router-dom";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function CardProduct() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useSWR(
    "https://api-7pecados.onrender.com/admin/stock/products/historic",
    fetcher,
  );

  let database = [];
  if (!isLoading && !error) {
    database = data.product;
  }

  const rowsPerPage = 5;
  const pages = Math.max(1, Math.ceil(database.length / rowsPerPage));

  console.log(database);

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
            <TableColumn>Categoria</TableColumn>
            <TableColumn>Ação</TableColumn>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                    <div className="flex items-center rounded-lg gap-4">
                      <div
                        className="p-2 rounded-lg bg-secondary text-base"
                      >
                      <IceCreamBowl size={32}/>
                      </div>
                
                      <div className="grid grid-rows-1">
                        <div className="font-bold">{item.name}</div>
                          <div className="text-[0.8rem] text-default-500">
                            {item.description}
                          </div>
                      </div>
                    </div>
                </TableCell>

                <TableCell>
                  <span className="rounded-lg text-secondary font-bold text-lg ">
                    {item.category}
                  </span>
                </TableCell>
               
                 <TableCell>
                  <Link to={`/stock/product/?id=${item._id}`} className="rounded-lg bg-primary hover:bg-primary/80 p-3 text-base font-bold  ">
                    Ver produto
                  </Link>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
}
