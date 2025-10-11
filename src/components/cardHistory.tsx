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

const database = [
    {
        key: "1",
        description: "Rua tal, nº 100",
        info: "22/08/2025",
        value: "R$ 80,96",
        title: "Feita na loja",
        type_movement: "entrance"
    },
    {
        key: "2",
        description: "Rua tal, nº 100",
        info: "22/08/2025",
        value: "R$ 80,96",
        title: "Feita na loja",
        type_movement: "exit"
    },
    {
        key: "3",
        description: "Rua tal, nº 100",
        info: "22/08/2025",
        value: "R$ 80,96",
        title: "Feita na loja",
        type_movement: "exit"
    },
    {
        key: "4",
        description: "Rua tal, nº 100",
        info: "22/08/2025",
        value: "R$ 80,96",
        title: "Feita na loja",
        type_movement: "exit"
    },
    {
        key: "5",
        description: "Rua tal, nº 100",
        info: "22/08/2025",
        value: "R$ 80,96",
        title: "Feita na loja",
        type_movement: "entrance"
    },
    {
        key: "6",
        description: "Rua tal, nº 100",
        info: "22/08/2025",
        value: "R$ 80,96",
        title: "Feita na loja",
        type_movement: "entrance"
    },
    {
        key: "7",
        description: "Rua tal, nº 100",
        info: "22/08/2025",
        value: "R$ 80,96",
        title: "Feita na loja",
        type_movement: "entrance"
    },
];

const columns = [
    {
        key: "description",
        label: "Resumo",
    },
    {
        key: "info",
        label: "Data",
    },
    {
        key: "value",
        label: "Valor",
    },
];

export const CardHistory = () => {
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
    const renderCell = React.useCallback((date: { [x: string]: any; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; info: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, columnKey: string | number) => {
        const cellValue = date[columnKey];

        switch (columnKey) {
            case "description":
                return (
                    <ItemCardHistory type_movement_to_icon={date.type_movement} description_item={String(date.description ?? '')}>
                        {date.title}
                    </ItemCardHistory>
                );
            case "info":
                return (
                    <div>{date.info}</div>
                );
            case "value":
                return (
                    <div className={`${date.type_movement == "entrance" ? "text-secondary" : "text-primary"}`}>{date.value}</div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div className="py-6 px-8 bg-base rounded-xl mt-4">
            <Table removeWrapper
                aria-label="Tabela de histórico de conta" classNames={{
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
                }>
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={items}>
                    {(item) => (
                        <TableRow key={item.key}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}