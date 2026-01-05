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
import { ItemCardHistory } from "../itemCardHistory";

/* ================================
   NORMALIZAÇÃO DE TIPO (BLINDADA)
================================ */
const normalizeMovementType = (raw) => {
  if (!raw) return null;

  const value = raw.toLowerCase();

  if (["entrada", "entrace", "entrance", "buy"].includes(value))
    return "entrance";

  if (["saida", "saída", "exit", "sell"].includes(value)) return "exit";

  return null;
};

const movementLabelPT = (type) => {
  if (type === "entrance") return "Entrada";
  if (type === "exit") return "Saída";
  return "-";
};

const movementTitlePT = (type) => {
  if (type === "entrance") return "Compra de mercadoria";
  if (type === "exit") return "Venda na loja";
  return "";
};

const movementColor = (type) => {
  if (type === "entrance") return "text-secondary";
  if (type === "exit") return "text-primary";
  return "text-default-600";
};

/* ================================
   COMPONENT
================================ */
export const CardHistory = ({
  database = [],
  columns = [],
  isLoading = false,
}) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const pages = Math.max(1, Math.ceil(database.length / rowsPerPage));

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return database.slice(start, start + rowsPerPage);
  }, [page, database]);

  const renderCell = useCallback((item, columnKey) => {
    const movementType = normalizeMovementType(item.type_movement || item.tipo);
    /* =====================
       PRODUTOS
    ===================== */
    if (columnKey === "description") {
      return (
        <ItemCardHistory
          type_movement_to_icon="buy"
          description_item={item.category || "Produto"}
        >
          <span className="font-semibold text-default-900 dark:text-default-100">
            {item.name}
          </span>
        </ItemCardHistory>
      );
    }

    if (columnKey === "prices") {
      if (!Array.isArray(item.prices)) return "-";

      return (
        <div className="flex flex-wrap gap-2">
          {item.prices.map((p, idx) => (
            <span
              key={idx}
              className="
                rounded-md px-2 py-0.5 text-xs font-medium
                bg-default-100 dark:bg-zinc-800
                text-default-700 dark:text-default-300
              "
            >
              R$ {Number(p.value).toFixed(2)} ({p.size})
            </span>
          ))}
        </div>
      );
    }

    /* =====================
       FINANCEIRO / ESTOQUE
    ===================== */
    if (columnKey === "description2") {
      return (
        <ItemCardHistory
          type_movement_to_icon={movementType}
          description_item={item.description || item.location || "Estoque"}
        >
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-default-900 dark:text-default-100">
              {movementTitlePT(movementType)}
            </span>

            {item.info && (
              <span className="text-xs text-default-500 dark:text-default-400">
                {item.info}
              </span>
            )}
          </div>
        </ItemCardHistory>
      );
    }

    if (columnKey === "type") {
      return (
        <span className="text-sm font-medium text-default-700 dark:text-default-300">
          {movementLabelPT(movementType)}
        </span>
      );
    }

    if (columnKey === "value") {
      return (
        <span
          className={`text-sm font-semibold ${movementColor(movementType)}`}
        >
          {item.value}
        </span>
      );
    }

    if (columnKey === "info") {
      return (
        <span className="text-sm text-default-600 dark:text-default-400">
          {item.info || "-"}
        </span>
      );
    }

    return item[columnKey] ?? "-";
  }, []);

  return (
    <section
      className="
        mt-6 rounded-2xl
        border border-default-200 dark:border-zinc-800
        bg-base dark:bg-zinc-900
        shadow-sm
      "
    >
      {/* LOADING */}
      {isLoading ? (
        <div className="py-10 text-center text-sm text-default-500">
          Carregando dados…
        </div>
      ) : database.length === 0 ? (
        <div className="py-10 text-center text-sm text-default-500">
          Nenhum registro encontrado.
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
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>

          <TableBody items={items}>
            {(item) => (
              <TableRow key={item._id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </section>
  );
};
