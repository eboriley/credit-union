import React from "react";

const AddMember = () => {
  const addMember = async (event: any) => {
    event.preventDefault();
    const res = await fetch("http://localhost:5000/add-member", {
      body: JSON.stringify({
        staff_id: event.target.staff_id.value,
        f_name: event.target.f_name.value,
        surname: event.target.surname.value,
        other_name: event.target.other_name.value,
        dob: event.target.dob.value,
        gender: event.target.gender.value,
        phone_1: event.target.phone_1.value,
        phone_2: event.target.phone_2.value,
        email: event.target.email.value,
        next_of_kin: event.target.next_of_kin.value,
        next_of_kin_phone: event.target.next_of_kin_phone.value,
        relationship: event.target.relationship.value,
        archived: "false",
        status: "active",
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
    console.log(result);
  };
  return (
    <form onSubmit={addMember} className="flex flex-col">
      <label htmlFor="staff_id">Staff ID</label>
      <input
        id="staff_id"
        name="staff_id"
        type="text"
        className="border-2 rounded-md"
      />
      <label htmlFor="f_name">First Name</label>
      <input
        id="f_name"
        name="f_name"
        type="text"
        className="border-2 rounded-md"
      />

      <label htmlFor="f_name">Second Name</label>
      <input
        id="surname"
        name="surname"
        type="text"
        className="border-2 rounded-md"
      />
      <label htmlFor="other_name">Other Names</label>
      <input
        id="other_name"
        name="other_name"
        type="text"
        className="border-2 rounded-md"
      />

      <label htmlFor="dob">Date of birth</label>
      <input id="dob" name="dob" type="date" className="border-2 rounded-md" />

      <label htmlFor="gender">Gender</label>
      <select id="gender" name="gender" className="border-2 rounded-md">
        <option value="">--Please choose an option--</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <label htmlFor="phone_1">Phone 1</label>
      <input
        id="phone_1"
        name="phone_1"
        type="tel"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        className="border-2 rounded-md"
      />

      <label htmlFor="phone_2">Phone 2</label>
      <input
        id="phone_2"
        name="phone_2"
        type="tel"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        className="border-2 rounded-md"
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="text"
        className="border-2 rounded-md"
      />
      <label htmlFor="next_of_kin">Next of kin</label>
      <input
        id="next_of_kin"
        name="next_of_kin"
        type="text"
        className="border-2 rounded-md"
      />

      <label htmlFor="next_of_kin_phone">Next of kin phone</label>
      <input
        id="next_of_kin_phone"
        name="next_of_kin_phone"
        type="tel"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        className="border-2 rounded-md"
      />

      <label htmlFor="relationship">Relationship</label>
      <input
        id="relationship"
        name="relationship"
        type="text"
        className="border-2 rounded-md"
      />

      <button
        type="submit"
        className="bg-indigo-800 shadow-md text-white rounded-md py-1 my-1"
      >
        Add Member
      </button>
    </form>
  );
};

export default AddMember;
