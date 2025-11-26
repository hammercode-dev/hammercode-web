"use client";

import { useState, useEffect } from "react";
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { TablePagination } from "./TablePagination";
import { TableToolbar } from "./TableToolbar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { usePagination, useDebounced, useQueryParams } from "@/hooks";

interface TableDataProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  itemsPerPage?: number;
  className?: string;
  rightAction?: React.ReactNode;
  currentPage?: number;
  totalPages?: number;
}

function TableData<T>({
  data,
  columns,
  searchable = false,
  searchPlaceholder = "Search...",
  itemsPerPage = 5,
  className,
  rightAction,
  currentPage = 1,
  totalPages = 1,
}: TableDataProps<T>) {
  const { getParam, getNumberParam, setParams } = useQueryParams();
  const [searchValue, setSearchValue] = useState(getParam("search", ""));
  const debouncedSearchValue = useDebounced(searchValue, 500);
  const { handleItemsPerPageChange } = usePagination({ currentPage, totalPages, itemsPerPage });

  const currentSearch = getParam("search", "");
  const currentPageParam = getNumberParam("page", 1);

  useEffect(() => {
    const nextSearch = debouncedSearchValue || null;
    const nextPage = currentPageParam || 1;

    if (currentSearch === (nextSearch ?? "") && currentPageParam === nextPage) {
      return;
    }

    setParams({
      search: nextSearch,
      page: nextPage === currentPageParam ? null : nextPage,
    });
  }, [debouncedSearchValue, currentPageParam, currentSearch]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <div className={`space-y-4 ${className}`}>
      <TableToolbar
        searchable={searchable}
        searchPlaceholder={searchPlaceholder}
        searchValue={searchValue}
        onSearchChange={(value) => {
          setSearchValue(value);
        }}
        rightAction={rightAction}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-foreground font-semibold">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-muted-foreground h-24 text-center">
                  No data found.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-muted-foreground text-sm">
              {currentPage} of {totalPages} pages
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">Items per page:</span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  const newItemsPerPage = parseInt(value, 10);
                  handleItemsPerPageChange(newItemsPerPage);
                }}
              >
                <SelectTrigger className="w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TablePagination currentPage={currentPage} totalPages={totalPages} itemsPerPage={itemsPerPage} />
        </div>
      )}
    </div>
  );
}

export default TableData;
