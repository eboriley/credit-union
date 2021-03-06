import React, { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { memberCols, groupedMemberCols } from "./columns/columns";
import { GlobalFilter } from "./GlobalFilter";

const FilteringTable = ({ members }: any) => {
  // const columns = useMemo(() => groupedMemberCols, []);
  // const data = useMemo(() => members, []);
  // const tableInstance = useTable(
  //   {
  //     columns: columns,
  //     data: data,
  //   },
  //   useGlobalFilter,
  //   useSortBy
  // );

  // const {
  //   getTableProps,
  //   getTableBodyProps,
  //   headerGroups,
  //   footerGroups,
  //   rows,
  //   prepareRow,
  //   state,
  //   setGlobalFilter,
  // } = tableInstance;

  // const { globalFilter } : any = state;
  return (
    <>
      {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column : any) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? "🔽" : "🔼") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => (
                <td {...column.getHeaderProps()}>{column.render("Footer")}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table> */}
    </>
  );
};

export default FilteringTable;
