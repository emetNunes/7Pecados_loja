import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@heroui/react";
import { ItemCardHistory } from "./itemCardHistory";

type DatabaseItem = {
  key: string;
  description: string;
  info: string;
  value: string;
  title: string;
  type_movement: string;
};

type ColumnItem = {
  key: string;
  label: string;
};

type CardHistoryProps = {
  database: DatabaseItem[];
  columns: ColumnItem[];
};

export const CardHistory = ({ database, columns }: CardHistoryProps) => {
  // Pagination
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;
  const pages = Math.ceil(database.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return database.slice(start, end);
  }, [page, database]);

  // Custom Items
  const renderCell = React.useCallback(
    (
      date: {
        [x: string]: any;
        description:
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | Iterable<React.ReactNode>
          | React.ReactPortal
          | null
          | undefined;
        info:
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | Iterable<React.ReactNode>
          | React.ReactPortal
          | null
          | undefined;
        value:
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | Iterable<React.ReactNode>
          | React.ReactPortal
          | null
          | undefined;
      },
      columnKey: string | number
    ) => {
      const cellValue = date[columnKey];

      switch (columnKey) {
        case "description":
          return (
            <ItemCardHistory
              type_movement_to_icon={date.type_movement}
              description_item={String(date.description ?? "")}
            >
              {date.title}
            </ItemCardHistory>
          );
        case "info":
          return <div>{date.info}</div>;
        case "value":
          return (
            <div
              className={`${date.type_movement == "entrance" || "buy" ? "text-secondary" : "text-primary"}`}
            >
              {date.value}
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <div className="py-6 px-8 bg-base rounded-xl mt-4  shadow-2xs">
      <Table
        removeWrapper
        aria-label="Tabela de histórico de conta"
        classNames={{
          table: "min-w-full",
          th: "text-left border-b-2 border-none px-4 py-2 bg-base text-md",
          td: "border-b border-gray-200 border-dashed px-4 py-3",
        }}
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
