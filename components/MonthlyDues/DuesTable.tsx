import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { GlobalFilter } from "../GlobalFilter";
import { FilterDuesTable } from "./FilterDuesTable";
import { ColumnFilter } from "../ColumnFilter";
import { useRouter } from "next/router";
import { url } from "../../config/url";

function truncateString(str: string) {
  if (str === null) return;
  const truncStr = str.substring(0, 10);
  return truncStr;
}

const duesColumn = [
  {
    Header: "",
    Footer: "",
    accessor: "transaction_id",
    Filter: ColumnFilter,
    disableFilters: true,
    Cell: (props: any) => {
      return (
        <CellItem
          href="/member/[id]"
          asHref={`/member/${props.row.values.transaction_id}`}
        />
      );
    },
  },
  {
    Header: "First",
    Footer: "",
    accessor: "f_name",
    Filter: ColumnFilter,
    disableFilters: true,
    Cell: (props: any) => {
      return (
        <CellItem
          href="/member/[id]"
          asHref={`/member/${props.row.values.transaction_id}`}
          value={props.row.values.f_name}
        />
      );
    },
  },
  {
    Header: "Surname",
    Footer: "",
    accessor: "surname",
    Filter: ColumnFilter,
    disableFilters: true,
    Cell: (props: any) => {
      return (
        <CellItem
          href="/member/[id]"
          asHref={`/member/${props.row.values.transaction_id}`}
          value={props.row.values.surname}
        />
      );
    },
  },
  {
    Header: "Date",
    Footer: "Date",
    accessor: "date",
    Filter: ColumnFilter,
    disableFilters: true,
    Cell: (props: any) => {
      return (
        <CellItem
          href="/member/[id]"
          asHref={`/member/${props.row.values.transaction_id}`}
          value={truncateString(props.row.values.date)}
        />
      );
    },
  },
  {
    Header: "Period",
    Footer: "Period",
    accessor: "period",
    Filter: ColumnFilter,
    disableFilters: true,
    Cell: (props: any) => {
      return (
        <CellItem
          href="/member/[id]"
          asHref={`/member/${props.row.values.transaction_id}`}
          value={props.row.values.period}
        />
      );
    },
  },
  {
    Header: "Amount",
    Footer: "Amount",
    accessor: "credit",
    Filter: ColumnFilter,
    disableFilters: true,
    Cell: (props: any) => {
      return (
        <CellItem
          href="/member/[id]"
          asHref={`/member/${props.row.values.transaction_id}`}
          value={props.row.values.credit}
        />
      );
    },
  },
  {
    Header: "Month",
    Footer: "Month",
    accessor: "month",
    Filter: ColumnFilter,
    disableFilters: true,
    Cell: (props: any) => {
      return (
        <CellItem
          href="/member/[id]"
          asHref={`/member/${props.row.values.transaction_id}`}
          value={props.row.values.month}
        />
      );
    },
  },
  {
    Header: "Year",
    Footer: "Year",
    accessor: "year",
    Filter: ColumnFilter,
    disableFilters: true,
    Cell: (props: any) => {
      return (
        <CellItem
          href="/member/[id]"
          asHref={`/member/${props.row.values.transaction_id}`}
          value={props.row.values.year}
        />
      );
    },
  },
  {
    Header: "",
    id: "delete",
    accessor: (str: any) => "delete",
    Filter: ColumnFilter,
    disableFilters: true,
    Cell: (props: any) => {
      return <DeleteItem id={props.row.values.transaction_id} />;
    },
  },
];

const DuesTable = () => {
  const [monthlydues, setMonthlyDues] = useState([]);

  const tableInstance = useTable(
    {
      columns: duesColumn,
      data: monthlydues,
    },
    useFilters,
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

  const loadMonthlyDues = (id: string = "") => {
    fetch(`${url}/get-monthlydues-id/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMonthlyDues(data);
      })
      .catch((error) => {
        error;
      });
  };

  useEffect(() => {
    loadMonthlyDues();
  }, []);

  return (
    <div className="w-full=">
      <h2 className="text-xl">Member&apos;s monthly dues archive</h2>
      <p></p>
      <div className="bg-slate-100">
        <span className="ml-3">
          Search Member Staff ID:{" "}
          <input
            className="focus:outline-none p-1 m-2 px-3 w-72 border-green-400 rounded-2xl"
            placeholder="member's staff id"
            onChange={(event) => {
              loadMonthlyDues(event.target.value);
            }}
          />
        </span>
      </div>
      <>
        <div className="container  w-278 bg-white p-2 mb-4 shadow-xl">
          <FilterDuesTable filter={globalFilter} setFilter={setGlobalFilter} />
          <div className="overflow-hidden overflow-x-scroll">
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
                              {column.canFilter
                                ? column.render("Filter")
                                : null}
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
                    <tr
                      className="even:bg-slate-100"
                      key={key}
                      {...restRowProps}
                    >
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
          </div>

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
    </div>
  );
};

export default DuesTable;

export const CellItem = (props: any) => {
  return (
    <div className="mr-7 my-2">
      <Link href={props.href} as={props.asHref}>
        <a>
          <p>{props.value}</p>
        </a>
      </Link>
    </div>
  );
};

export const DeleteItem = (props: any) => {
  const router = useRouter();
  const deleteMonthlyDues = async () => {
    const res = await fetch(`${url}/remove-monthlydues/${props.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    const result = await res.json();
    if (result) {
      router.reload();
    }
    console.log(result);
  };
  return (
    <div>
      <button onClick={deleteMonthlyDues}>delete</button>
    </div>
  );
};
