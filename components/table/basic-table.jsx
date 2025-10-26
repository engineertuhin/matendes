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

import { DataTableFacetedFilter } from "@/components/table/data-table-faceted-filter";
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
import { getFilterParams, setFilterParams, debounce } from "@/utility/helpers";

export function BasicDataTable({
    columns = [],
    form,
    data = [],
    addButtonLabel,
    to = false,
    filter = true,
    pagination = true,
    refetch,
    loading = false,
    filterCustom = [],
}) {
    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [searchValue, setSearchValue] = React.useState(
        getFilterParams("search") || ""
    );

    // Create debounced search function
    const debouncedSearch = React.useCallback(
        debounce((searchTerm) => {
            setFilterParams("search", searchTerm);
            setFilterParams("page", 1); // Reset to first page when searching
            if (refetch) refetch();
        }, 500), // 500ms delay
        [refetch]
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            columnVisibility,
            rowSelection,
            // Only use client-side state if we don't have server pagination
            ...(typeof pagination === "object" && pagination.total
                ? {}
                : {
                      sorting,
                      columnFilters,
                  }),
        },
        // Only enable client-side features if we don't have server pagination
        ...(typeof pagination === "object" && pagination.total
            ? {
                  manualPagination: true,
                  manualSorting: true,
                  manualFiltering: true,
              }
            : {
                  onSortingChange: setSorting,
                  onColumnFiltersChange: setColumnFilters,
                  getPaginationRowModel: getPaginationRowModel(),
                  getSortedRowModel: getSortedRowModel(),
                  getFilteredRowModel: getFilteredRowModel(),
                  state: {
                      sorting,
                      columnFilters,
                      columnVisibility,
                      rowSelection,
                  },
              }),
    });

    return (
        <>
            {(filter || addButtonLabel) && (
                <div className="flex flex-wrap items-center justify-between gap-4 py-4 rounded-lg">
                    {/* Left side controls */}
                    {filter && (
                        <div className="flex items-center gap-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="flex items-center gap-1"
                                    >
                                        Columns{" "}
                                        <ChevronDown className="h-4 w-4" />
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
                                                    column.toggleVisibility(
                                                        !!value
                                                    )
                                                }
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            {Object.entries(filterCustom).map(
                                ([key, values]) => (
                                    <DataTableFacetedFilter
                                        key={key}
                                        index={key}
                                        title={key
                                            .replace(/_/g, " ") // replace underscores with spaces
                                            .replace(/\b\w/g, (c) =>
                                                c.toUpperCase()
                                            )} // capitalize first letter of each word
                                        options={values.map((data) => {
                                               let {key,value}= data;
                                          
                                            return { label: value, value: key };
                                        })}
                                        addServerFilter={setFilterParams}
                                        refetch={refetch}
                                    />
                                )
                            )}

                            <Input
                                placeholder="Search..."
                                value={searchValue}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    // Update local state immediately for UI feedback
                                    setSearchValue(value);
                                    // Use debounced search for server requests
                                    debouncedSearch(value);
                                }}
                                className="w-full sm:w-[250px] h-10"
                            />
                        </div>
                    )}

                    {/* Right side actions — optional */}
                    {addButtonLabel && (
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
                                        form.reset({
                                            ...Object.fromEntries(
                                                Object.entries(
                                                    form.getValues()
                                                ).map(([key, value]) => {
                                                    // If the field value is an array (useFieldArray), reset it to empty array
                                                    if (Array.isArray(value))
                                                        return [key, []];
                                                    // Otherwise, reset normal fields to empty string
                                                    return [key, ""];
                                                })
                                            ),
                                            openModel: true, // keep this field true
                                        });
                                    }}
                                >
                                    {addButtonLabel}
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div>
                <div className="rounded-lg h-full w-full">
                    <Table>
                        <TableHeader className="sticky top-0 z-10 bg-background">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className={
                                                header?.column?.columnDef
                                                    ?.thClass
                                            } // <-- this is your thClass
                                        >
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
                            {loading ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                                            <span className="ml-2">
                                                Loading...
                                            </span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                className={
                                                    cell.column.columnDef
                                                        ?.tdClass || ""
                                                } // <-- Use tdClass if defined
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    <div className="flex items-center justify-center">
                                        <span className="ml-2">
                                            No results.
                                        </span>
                                    </div>
                                </TableCell>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            {pagination && (
                <div className="flex items-center flex-wrap gap-4 px-4 py-4">
                    {/* Show server-side pagination info if pagination object has server data */}
                    {typeof pagination === "object" && pagination.total ? (
                        <>
                            <div className="flex-1 text-sm text-muted-foreground whitespace-nowrap">
                                Showing {pagination.from || 0} to{" "}
                                {pagination.to || 0} of {pagination.total || 0}{" "}
                                entries
                            </div>

                            <div className="flex gap-2 items-center">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => {
                                        const newPage =
                                            pagination.current_page - 1;
                                        setFilterParams("page", newPage);
                                        if (refetch) refetch();
                                    }}
                                    disabled={pagination.current_page <= 1}
                                    className="h-8 w-8"
                                >
                                    <Icon
                                        icon="heroicons:chevron-left"
                                        className="w-5 h-5 rtl:rotate-180"
                                    />
                                </Button>

                                {/* Generate page numbers */}
                                {Array.from(
                                    {
                                        length: Math.min(
                                            5,
                                            pagination.last_page
                                        ),
                                    },
                                    (_, i) => {
                                        const pageNumber =
                                            pagination.current_page <= 3
                                                ? i + 1
                                                : pagination.current_page -
                                                  2 +
                                                  i;

                                        if (
                                            pageNumber > pagination.last_page ||
                                            pageNumber < 1
                                        )
                                            return null;

                                        return (
                                            <Button
                                                key={`server-pagination-${pageNumber}`}
                                                onClick={() => {
                                                    setFilterParams(
                                                        "page",
                                                        pageNumber
                                                    );
                                                    if (refetch) refetch();
                                                }}
                                                variant={
                                                    pageNumber ===
                                                    pagination.current_page
                                                        ? ""
                                                        : "outline"
                                                }
                                                className={cn("w-8 h-8")}
                                            >
                                                {pageNumber}
                                            </Button>
                                        );
                                    }
                                )}

                                <Button
                                    onClick={() => {
                                        const newPage =
                                            pagination.current_page + 1;
                                        setFilterParams("page", newPage);
                                        if (refetch) refetch();
                                    }}
                                    disabled={
                                        pagination.current_page >=
                                        pagination.last_page
                                    }
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
                        </>
                    ) : (
                        /* Fallback to client-side pagination */
                        <>
                            <div className="flex-1 text-sm text-muted-foreground whitespace-nowrap">
                                {
                                    table.getFilteredSelectedRowModel().rows
                                        .length
                                }{" "}
                                of {table.getFilteredRowModel().rows.length}{" "}
                                row(s) selected.
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
                                        onClick={() => {
                                            setFilterParams(
                                                "page",
                                                pageIdx + 1
                                            );
                                            table.setPageIndex(pageIdx);
                                            if (refetch) refetch();
                                        }}
                                        variant={`${
                                            pageIdx ===
                                            (getFilterParams("page") - 1 || 0)
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
                        </>
                    )}
                </div>
            )}
        </>
    );
}
export default BasicDataTable;
