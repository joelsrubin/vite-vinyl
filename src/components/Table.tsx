import { useMemo, useState } from "react";

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
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import DebouncedInput from "./DebouncedInput";
import { omittedBasicInformation } from "../constants";

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

function finalFormat(d: any) {
  return d.map((row: any) => {
    const formattedRow: any = {};
    Object.keys(row).forEach((key) => {
      const value = row[key];
      if (typeof value === "object") {
        formattedRow[key] = value.name;
      } else {
        formattedRow[key] = value;
      }
    });
    return formattedRow;
  });
}

function formatRows(data: any) {
  return data.map((row: any) => {
    const formattedRow: any = {};
    Object.keys(row).forEach((key) => {
      const value = row[key];
      if (Array.isArray(value)) {
        formattedRow[key] = value[0];
      } else if (typeof value === "string") {
        formattedRow[key] = value;
      } else if (typeof value === "object") {
        formattedRow[key] = value.name;
      } else if (typeof value === "number") {
        if (value === 0) {
          formattedRow[key] = "";
        } else {
          formattedRow[key] = value;
        }
      }
    });
    return formattedRow;
  });
}
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
    debugTable: true,
  });

  return (
    <>
      <div className="justify-center content-center items-center flex mt-5">
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          className={`p-2 font-lg shadow border border-block ${
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
    </>
  );
}
