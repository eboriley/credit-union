import React, { useMemo, useState } from "react";

const MonthlyDuesPaymentForm = ({ members }: any) => {
  const data = useMemo(() => members, []);
  const [member, setMember] = useState([]);
  console.log(data);

  function filterMembers(event) {
    const _member = members.filter(
      (member) => member.staff_id === event.target.value.toUpperCase().trim()
    );
    setMember(_member);
    console.log(_member);
  }
  return (
    <div>
      <label htmlFor="staff_id">Staff ID</label>
      <input
        id="staff_id"
        name="staff_id"
        type="text"
        className="border-2 rounded-md"
        onChange={filterMembers}
      />
      <div>
        <p>First Name: {member[0]?.f_name}</p>
        <p>Last Name: {member[0]?.surname}</p>
        <p>Other Name: {member[0]?.other_name}</p>
        <p>Date Of Birth: {member[0]?.dob}</p>
        <p>Gender: {member[0]?.gender}</p>
      </div>
    </div>
  );
};

export default MonthlyDuesPaymentForm;
