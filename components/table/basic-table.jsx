"use client";
import * as React from "react";

import { ChevronDown } from "lucide-react";

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

import Link from "next/link";

export function BasicDataTable({
    columns = [],
    form,
    data = [],
    addButtonLabel,
    to = false,
}) {
    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 rounded-lg">
                {/* Left side controls */}
                <div className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="flex items-center gap-1"
                            >
                                Columns <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Input
                        placeholder="Filter by email..."
                        value={table.getColumn("email")?.getFilterValue() || ""}
                        onChange={(e) =>
                            table
                                .getColumn("email")
                                ?.setFilterValue(e.target.value)
                        }
                        className="w-[200px] sm:w-[250px] h-10"
                    />
                </div>

                {/* Right side actions — optional */}
                <div className="flex items-center gap-2">
                    {/* You can put actions here like export, add new, etc. */}
                    {to ? (
                        <Link
                            href={to}
                            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                            {addButtonLabel}
                        </Link>
                    ) : (
                        <Button
                            onClick={() => {
                                form.setValue("openModel", true);
                            }}
                        >
                            {addButtonLabel}
                        </Button>
                    )}
                </div>
            </div>

            <div>
                <div className="rounded-lg h-full">
                    <Table className="min-w-full">
                        <TableHeader className="sticky top-0 z-10 bg-background">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="flex items-center flex-wrap gap-4 px-4 py-4">
                <div className="flex-1 text-sm text-muted-foreground whitespace-nowrap">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>

                <div className="flex gap-2  items-center">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="h-8 w-8"
                    >
                        <Icon
                            icon="heroicons:chevron-left"
                            className="w-5 h-5 rtl:rotate-180"
                        />
                    </Button>

                    {table.getPageOptions().map((page, pageIdx) => (
                        <Button
                            key={`basic-data-table-${pageIdx}`}
                            onClick={() => table.setPageIndex(pageIdx)}
                            variant={`${
                                pageIdx ===
                                table.getState().pagination.pageIndex
                                    ? ""
                                    : "outline"
                            }`}
                            className={cn("w-8 h-8")}
                        >
                            {page + 1}
                        </Button>
                    ))}

                    <Button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                    >
                        <Icon
                            icon="heroicons:chevron-right"
                            className="w-5 h-5 rtl:rotate-180"
                        />
                    </Button>
                </div>
            </div>
        </>
    );
}
export default BasicDataTable;
