import React, { useMemo, useState } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
// import { memberCols, groupedMemberCols } from "./columns/columns";
import { GlobalFilter } from "../GlobalFilter";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import DuesTable from "./DuesTable";

export const memberCols = [
  {
    Header: "",
    Footer: "",
    accessor: "staff_id",
    Cell: (props: any) => {
      return (
        <MemberID
          key={props.href}
          href="/member/[id]"
          asHref={`/member/${props.row.values.staff_id}`}
        />
      );
    },
  },
  {
    Header: "",
    Footer: "",
    accessor: "photo",
    Cell: (props: any) => {
      return <MemberImage src={props.row.values.photo} />;
    },
  },
  {
    Header: "First Name",
    Footer: "First Name",
    accessor: "f_name",
    Cell: (props: any) => {
      return (
        <MemberLink
          href="/member/[id]"
          asHref={`/member/${props.row.values.staff_id}`}
          cellItem={props.row.values.f_name}
        />
      );
    },
  },
  {
    Header: "Surname",
    Footer: "Surname",
    accessor: "surname",
    Cell: (props: any) => {
      return <CellSurname cellItem={props.row.values.surname} />;
    },
  },
  {
    Header: () => <h3 className="hidden lg:block">Other names</h3>,
    Footer: "Other Name",
    accessor: "other_name",
    Cell: (props: any) => {
      return (
        <CellOtherName
          href="/member/[id]"
          asHref={`/member/${props.row.values.staff_id}`}
          cellItem={props.row.values.other_name}
        />
      );
    },
  },
];

const MemberTable = ({ members }: any) => {
  const columns = useMemo(() => memberCols, []);
  const data = useMemo(() => members, []);
  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex } = state;

  return (
    <>
      <div className="container w-max bg-white p-2 shadow-xl flex">
        <div>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          <table className={styles.table} {...getTableProps()}>
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
                          className="py-1 border border-transparent"
                          key={key}
                          {...restColumn}
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? "🔽"
                                : "🔼"
                              : ""}
                          </span>
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
          </table>
          <div className="flex space-x-4 m-auto max-w-fit">
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberTable;

export const MemberImage = (props: any) => {
  return (
    <div>
      <img
        className="w-10 h-10 rounded-full mr-2 text-sm"
        src={props.src}
        alt="profile photo"
      />
    </div>
  );
};

export const MemberLink = (props: any) => {
  return (
    <div>
      <Link href={props.href} as={props.asHref}>
        <a>
          <p>{props.cellItem}</p>
        </a>
      </Link>
    </div>
  );
};

export const MemberID = (props: any) => {
  return (
    <div>
      <Link href={props.href} as={props.asHref}>
        <a>
          <p></p>
        </a>
      </Link>
    </div>
  );
};

export const CellItem = (props: any) => {
  return (
    <div className="md:hidden">
      <Link href={props.href} as={props.asHref}>
        <a>
          <p>{props.cellItem}</p>
        </a>
      </Link>
    </div>
  );
};

export const CellSurname = (props: any) => {
  return (
    <div className="hidden md:block">
      <p
        onClick={() => {
          console.log(props.cellItem);
        }}
      >
        {props.cellItem}
      </p>
    </div>
  );
};

export const CellOtherName = (props: any) => {
  return (
    <div className="hidden lg:block">
      <Link href={props.href} as={props.asHref}>
        <a>
          <p>{props.cellItem}</p>
        </a>
      </Link>
    </div>
  );
};
