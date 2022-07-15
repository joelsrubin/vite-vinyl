import { useEffect, useMemo, useState } from "react";

import { isMobile } from "react-device-detect";
import { rankItem, RankingInfo } from "@tanstack/match-sorter-utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
  FilterFn,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import DebouncedInput from "./DebouncedInput";
import { omittedBasicInformation } from "../constants";
import { finalFormat, formatRows } from "../utils";
import { useSearchParams } from "react-router-dom";

declare module "@tanstack/table-core" {
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

type Album = {
  artists: string;
  genres: string;
  labels: string;
  styles: string;
  title: string;
  year: number;
};

const optionsObj = isMobile
  ? {
      Year: false,
      Genres: false,
      Labels: false,
      Styles: false,
    }
  : {};

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export function MyTable({ items }: { items: Release[] }) {
  let [searchParams, setSearchParams] = useSearchParams();
  if (items.length === 0) {
    return (
      <div className="flex justify-center content-center items-center min-h-screen">
        <h1 className="text-lg font-mono">No albums found!</h1>
      </div>
    );
  }
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState(
    optionsObj as VisibilityState
  );

  const [globalFilter, setGlobalFilter] = useState("");
  const columns = Object.keys(items[0].basic_information).filter(
    (h) => !omittedBasicInformation.includes(h)
  );

  // extract the row data for each album
  const rows = items.map((album) => {
    const row: any = {};
    columns.forEach((header: any) => {
      //@ts-ignore
      row[header] = album.basic_information[header];
    });
    return row;
  });

  const data = formatRows(rows);
  const final: Album[] = useMemo(() => finalFormat(data), []);
  const cols: ColumnDef<Album>[] = useMemo(
    () => [
      {
        header: "Title",
        cell: (info) => info.getValue(),
        accessorKey: "title",
        sortable: true,
      },
      {
        header: "Artists",
        accessor: "artists",
        accessorFn: (info) => info.artists,
      },
      {
        header: "Year",
        accessor: "year",
        accessorFn: (info) => info.year,
        sortable: false,
      },
      {
        header: "Genres",
        accessor: "genres",
        accessorFn: (info) => info.genres,
      },
      {
        header: "Labels",
        accessor: "labels",
        accessorFn: (info) => info.labels,
      },

      {
        header: "Styles",
        accessor: "styles",
        accessorFn: (info) => info.styles,
      },
    ],
    []
  );
  const table = useReactTable({
    data: final,
    columns: cols,
    state: {
      sorting,
      columnVisibility,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  function handleChange(val: string) {
    const params = new URLSearchParams();
    params.append("query", val);
    setSearchParams(params);
    setGlobalFilter(val);
  }

  useEffect(() => {
    if (searchParams.get("query")) {
      setGlobalFilter(String(searchParams.get("query")));
    }
  }, [searchParams]);

  return (
    <>
      <div className="justify-center content-center items-center flex mt-5">
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => handleChange(String(value))}
          className={`p-4 text-lg shadow border border-block font-mono ${
            isMobile ? "w-1/2" : "w-1/4"
          } `}
          placeholder="Search all..."
        />
      </div>
      <table className="font-mono place-items-center m-auto mt-10 ">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-5 text-left mr-5"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="odd:bg-slate-100">
              {row.getVisibleCells().map((cell) => {
                return (
                  <td key={cell.id} className="pl-5 text-left py-5 pr-5">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="justify-evenly content-center items-center flex mt-5 mb-5">
        <button
          className="border rounded p-5"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-5"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
      </div>
    </>
  );
}
