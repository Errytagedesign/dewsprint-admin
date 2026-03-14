"use client";
import { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { cn } from "@/libs/utils";

export interface Column<T> {
  title: string | ReactNode;
  key: keyof T;
  render?: (value: T[keyof T], record: T) => ReactNode;
  headerClassName?: string;
  columnClassName?: string;
  noMobile?: true;
}

export interface TableComponentProps<T> {
  title?: string;
  columns: Column<T>[];
  data: T[];
  containerClassName?: string;
  className?: string;
  headerClassName?: string;
  headerWrapperClassName?: string;
  path?: string;
  handleRowClick?: (row: T) => void;
}

export default function TableComponent<T extends Record<string, any>>(
  props: TableComponentProps<T>,
) {
  const {
    title,
    columns,
    data,
    className,
    containerClassName,
    handleRowClick,
    headerWrapperClassName,
  } = props;

  return (
    <Table
      containerClassName={containerClassName}
      className={` ${className ? className : ""}`}
    >
      {title && <TableCaption className="sr-only">{title}</TableCaption>}

      <TableHeader className={headerWrapperClassName}>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead
              key={index}
              className={cn(
                "text-grey-500 text-sm whitespace-nowrap",
                column?.noMobile ? "hidden lg:table-cell" : "",
              )}
            >
              {column.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow
            key={row.id || rowIndex}
            onClick={() => handleRowClick && handleRowClick(row)}
          >
            {columns.map((column) => {
              return (
                <TableCell
                  key={`${rowIndex}-${column.key.toString()}`}
                  className={cn(
                    "!text-ggrey-800 py-5 whitespace-nowrap",
                    column?.noMobile ? "hidden lg:table-cell" : "",
                    handleRowClick ? "cursor-pointer" : "",
                  )}
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : (row[column.key] as ReactNode)}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
