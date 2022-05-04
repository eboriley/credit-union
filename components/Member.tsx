import React from "react";
import Link from "next/link";

type MemberProp = {
  staff_id: string;
  f_name: string;
  surname: string;
  other_name?: string;
  photo?: string;
  dob: string;
  gender: string;
  phone1: string;
  phone2?: string;
  email?: string;
  nextOfKin: string;
  nextOfKinPhone: string;
  relationship: string;
  archived: string;
  status: string;
};

const Member = ({ member }: any) => {
  return (
    <Link href="/member/[id]" as={`/member/${member.staff_id}`}>
      <a>
        <h3>{member.f_name}</h3>
        <p>{member.surname}</p>
      </a>
    </Link>
  );
};

export default Member;
