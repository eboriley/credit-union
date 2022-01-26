import React, { useMemo } from "react";
import { useTable } from "react-table";
import { memberCols, groupedMemberCols } from "./columns/columns";

const MemberTable = ({ members }: any) => {
  const columns = useMemo(() => groupedMemberCols, []);
  const data = useMemo(() => members, []);
  const tableInstance = useTable({
    columns: columns,
    data: data,
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = tableInstance;
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
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
    </table>
  );
};

export default MemberTable;
