import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { memberCols, groupedMemberCols } from "./columns/columns";

const SortingTable = ({ members }: any) => {
  const columns = useMemo(() => groupedMemberCols, []);
  const data = useMemo(() => members, []);
  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
    },
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    rows,
    prepareRow,
  } = tableInstance;
  return (
    <table {...getTableProps()}>
      <thead className="bg-green-500 text-white">
        {headerGroups.map((headerGroup) => {
          const { key, ...restHeaderGroupProps } =
            headerGroup.getHeaderGroupProps();
          return (
            <tr key={key} {...restHeaderGroupProps}>
              {headerGroup.headers.map((column) => {
                const { key, ...restColumn } = column.getHeaderProps();
                return (
                  <th
                    className="mr-7 text-left border border-transparent"
                    key={key}
                    {...restColumn}
                  >
                    {column.render("Header")}
                    <div className="block">
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody {...getTableBodyProps}>
        {page.map((row) => {
          prepareRow(row);
          const { key, ...restRowProps } = row.getRowProps();
          return (
            <tr className="even:bg-slate-100" key={key} {...restRowProps}>
              {row.cells.map((cell) => {
                const { key, ...restCellProps } = cell.getCellProps();
                return (
                  <td
                    className="border border-transparent"
                    key={key}
                    {...restCellProps}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
      {/* <tfoot>
        {footerGroups.map((footerGroup) => (
          <tr {...footerGroup.getFooterGroupProps()}>
            {footerGroup.headers.map((column) => (
              <td {...column.getHeaderProps()}>{column.render("Footer")}</td>
            ))}
          </tr>
        ))}
      </tfoot> */}
    </table>
  );
};

export default SortingTable;
