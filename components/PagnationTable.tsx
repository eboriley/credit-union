import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
// import { memberCols, groupedMemberCols } from "./columns/columns";
import { GlobalFilter } from "./GlobalFilter";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export const memberCols = [
  {
    Header: "",
    Footer: "",
    accessor: "staff_id",
    Cell: (props: any) => {
      return (
        <MemberID
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
      return <MemberImage src={props.photo} />;
    },
  },
  { Header: "First Name", Footer: "First Name", accessor: "f_name" },
  { Header: "Surname", Footer: "Surname", accessor: "surname" },
  { Header: "Other Name", Footer: "Other Name", accessor: "other_name" },
  { Header: "Date of Birth", Footer: "Date of Birth", accessor: "dob" },
  { Header: "Gender", Footer: "Gender", accessor: "gender" },
  { Header: "Phone 1", Footer: "Phone 1", accessor: "phone_1" },
  { Header: "Phone 2", Footer: "Phone 2", accessor: "phone_2" },
  { Header: "Email", Footer: "Email", accessor: "email" },
];

export const groupedMemberCols = [
  {
    Header: "",
    Footer: "",
    accessor: "staff_id",
    Cell: (props: any) => {
      return (
        <MemberID
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
    Header: "Name",
    Footer: "Name",
    columns: [
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
      { Header: "Surname", Footer: "Surname", accessor: "surname" },
      { Header: "Other Name", Footer: "Other Name", accessor: "other_name" },
    ],
  },
  {
    Header: "Info",
    Footer: "Info",
    columns: [
      { Header: "Date of Birth", Footer: "Date of Birth", accessor: "dob" },
      { Header: "Gender", Footer: "Gender", accessor: "gender" },
      { Header: "Phone 1", Footer: "Phone 1", accessor: "phone_1" },
      { Header: "Phone 2", Footer: "Phone 2", accessor: "phone_2" },
      { Header: "Email", Footer: "Email", accessor: "email" },
    ],
  },
];

const PagnationTable = ({ members }: any) => {
  const columns = useMemo(() => groupedMemberCols, []);
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
      <div className="container m-auto w-max bg-white rounded-2xl p-2 my-8 shadow-xl shadow-xl shadow-2xl">
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
    </>
  );
};

export default PagnationTable;

export const MemberImage = (props: any) => {
  return (
    <div>
      <img
        className="w-10 h-10 rounded-full mr-2"
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
