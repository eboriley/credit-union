import React from "react";
import Member from "./Member";

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

function MemberList({ members }: any) {
  return (
    <div>
      {members.map((member: any) => (
        <div key={member.staff_id}>
          <Member member={member} />
        </div>
      ))}
    </div>
  );
}

export default MemberList;
