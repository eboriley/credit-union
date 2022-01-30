import React, { useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import ReactPaginate from "react-paginate";

const MemberTable: NextPage = ({ members }: any) => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const membersPerPage: number = 10;
  const pagesVisited: number = pageNumber * membersPerPage;
  const displayMembers = members
    .slice(pagesVisited, pagesVisited + membersPerPage)
    .map((member: any) => (
      <tr className="even:bg-slate-100" key={member.staff_id}>
        <td className="w-18 p-1">
          <img
            className="w-10 h-10 rounded-full"
            src={member.photo}
            alt="profile photo"
          />
        </td>
        <td className="p-1 ">
          <Link href="/member/[id]" as={`/member/${member.staff_id}`}>
            <a>
              <p>{member.f_name}</p>
            </a>
          </Link>
        </td>
        <td className="p-1">
          <Link href="/member/[id]" as={`/member/${member.staff_id}`}>
            <a>
              <p>{member.surname}</p>
            </a>
          </Link>
        </td>
        <td className="p-1">
          <Link href="/member/[id]" as={`/member/${member.staff_id}`}>
            <a>
              <p>{member.phone_1}</p>
            </a>
          </Link>
        </td>
      </tr>
    ));

  const pageCount = Math.ceil(members.length / membersPerPage);

  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  return (
    <div className="container m-auto bg-white rounded-2xl w-max p-4 m-4">
      <table>
        <thead className="bg-green-500 text-white">
          <tr>
            <th>{"    "}</th>
            <th>First Name</th>
            <th>Surname</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>{displayMembers}</tbody>
      </table>
      <ReactPaginate
        className="flex space-x-4 m-auto max-w-fit"
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination"}
        previousLinkClassName={"prevbtn"}
        nextLinkClassName={"nextbtn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
};

export default MemberTable;
