import React, { useMemo } from "react";
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
      return (
        <MemberImage
          href="/member/[id]"
          asHref={`/member/${props.row.values.staff_id}`}
          src={props.row.values.photo}
        />
      );
    },
  },
  {
    Header: "First",
    Footer: "First",
    accessor: "f_name",
    Cell: (props: any) => {
      return (
        <CellItem
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
      return (
        <CellItem
          href="/member/[id]"
          asHref={`/member/${props.row.values.staff_id}`}
          cellItem={props.row.values.surname}
        />
      );
    },
  },
  {
    Header: () => <h3 className="">Other names</h3>,
    Footer: "Other Name",
    accessor: "other_name",
    Cell: (props: any) => {
      return (
        <CellItem
          href="/member/[id]"
          asHref={`/member/${props.row.values.staff_id}`}
          cellItem={props.row.values.other_name}
        />
      );
    },
  },
  {
    Header: () => <h3 className="">Date of Birth</h3>,
    Footer: "Date of Birth",
    accessor: "dob",
    Cell: (props: any) => {
      return (
        <CellItem
          href="/member/[id]"
          asHref={`/member/${props.row.values.staff_id}`}
          cellItem={props.row.values.dob}
        />
      );
    },
  },
  {
    Header: () => <h3 className="">Gender</h3>,
    Footer: "Gender",
    accessor: "gender",
    Cell: (props: any) => {
      return (
        <CellItem
          href="/member/[id]"
          asHref={`/member/${props.row.values.staff_id}`}
          cellItem={props.row.values.gender}
        />
      );
    },
  },
  {
    Header: () => <h3 className="">Phone 1</h3>,
    Footer: "Phone 1",
    accessor: "phone_1",
    Cell: (props: any) => {
      return (
        <CellItem
          href="/member/[id]"
          asHref={`/member/${props.row.values.staff_id}`}
          cellItem={props.row.values.phone_1}
        />
      );
    },
  },
  {
    Header: () => <h3 className="">Phone 2</h3>,
    Footer: "Phone 2",
    accessor: "phone_2",
    Cell: (props: any) => {
      return (
        <CellItem
          href="/member/[id]"
          asHref={`/member/${props.row.values.staff_id}`}
          cellItem={props.row.values.phone_2}
        />
      );
    },
  },
  {
    Header: () => <h3 className="">Email</h3>,
    Footer: "Email",
    accessor: "email",
    Cell: (props: any) => {
      return (
        <CellItem
          href="/member/[id]"
          asHref={`/member/${props.row.values.staff_id}`}
          cellItem={props.row.values.email}
        />
      );
    },
  },
  {
    Header: () => <h3 className="">Next of Kin</h3>,
    Footer: "Next of Kin",
    accessor: "next_of_kin",
    Cell: (props: any) => {
      return (
        <CellItem
          href="/member/[id]"
          asHref={`/member/${props.row.values.staff_id}`}
          cellItem={props.row.values.next_of_kin}
        />
      );
    },
  },
  {
    Header: () => <h3 className="">Institution</h3>,
    Footer: "Institution",
    accessor: "institution",
    Cell: (props: any) => {
      return (
        <CellItem
          href="/member/[id]"
          asHref={`/member/${props.row.values.staff_id}`}
          cellItem={props.row.values.institution}
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
      <div className="container w-278 bg-white p-2">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <div className="overflow-hidden overflow-x-scroll">
          <table className={`${styles.table}`} {...getTableProps()}>
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
  );
};

export default MemberTable;

export const MemberImage = (props: any) => {
  return (
    <div className="w-10 mr-1">
      <Link href={props.href} as={props.asHref}>
        <a>
          <img
            className="w-10 h-10 rounded-full mr-2 text-sm"
            src={props.src}
            alt="profile photo"
          />
        </a>
      </Link>
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
    <div className="px-2 mx-2">
      <Link href={props.href} as={props.asHref}>
        <a>
          <p>{props.cellItem}</p>
        </a>
      </Link>
    </div>
  );
};
