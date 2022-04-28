import React, { useState, useEffect } from "react";
import styles from "/styles/Home.module.css";
import { url } from "../../config/url";
import { getSession, signIn } from "next-auth/react";

const Removemember = () => {
  const [members, setMembers]: any = useState([]);
  const [status, setStatus] = useState("");
  const [activeDelBtn, setActiveDelBtn] = useState(true);
  const [loading, setLoading] = useState(true);

  //args is someid because I dont want it to preload any members
  const loadMembers = (id: string = "") => {
    fetch(`${url}/members/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMembers(data);
      })
      .catch((error) => {
        error;
      });
  };

  const handleStatus = (event: any) => {
    setStatus(event.target.value);
  };

  console.log(status);

  const displayName = (member: any) => {
    if (member === undefined) {
      return;
    } else {
      return (
        member?.f_name +
        " " +
        member?.surname +
        " " +
        (member?.other_name === null ? "" : member?.other_name)
      );
    }
  };

  const updateMember = async (event: any) => {
    event.preventDefault();
    if (status !== "") {
      const res = await fetch(`${url}/update-member/${members[0].staff_id}`, {
        body: JSON.stringify({
          staff_id: members[0]?.staff_id,
          f_name: members[0]?.f_name,
          surname: members[0]?.surname,
          other_name: members[0]?.other_name,
          photo: members[0]?.photo,
          dob: members[0]?.dob,
          gender: members[0]?.gender,
          phone_1: members[0]?.phone_1,
          phone_2: members[0]?.phone_2,
          email: members[0]?.email,
          next_of_kin: members[0]?.next_of_kin,
          next_of_kin_phone: members[0]?.next_of_kin_phone,
          relationship: members[0]?.relationship,
          status: status,
          archived: status === "active" ? "false" : "true",
          institution: members[0]?.institution,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      });

      const result = await res.json();

      console.log(result);
    }
  };

  const handleDeleteMember = (event: any) => {
    event.preventDefault();
    if (event.target.value === members[0].staff_id) {
      return setActiveDelBtn(false);
    }
    return setActiveDelBtn(true);
  };

  const deleteMember = async () => {
    const res = await fetch(`${url}/remove-member/${members[0].staff_id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    const result = await res.json();
  };
  console.log(members);
  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      if (!session) {
        signIn();
      } else {
        setLoading(false);
      }
    };
    securePage();
    loadMembers();
  }, []);
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div className="w-full">
        <h2 className="text-xl">Remove Member</h2>
        <p></p>
        <div className="bg-slate-100">
          <span className="ml-3">
            Search Member Staff ID:{" "}
            <input
              className="focus:outline-none p-1 m-2 px-3 w-72 border-green-400 rounded-2xl"
              placeholder="member's staff id"
              onChange={(event) => {
                loadMembers(event.target.value);
              }}
            />
          </span>
        </div>
      </div>
      <div>
        <img className="w-40 h-40" src={members[0]?.photo} />
        <h3 className="text-md">{displayName(members[0])}</h3>
      </div>
      <>
        <label htmlFor="status" className="text-lg">
          Update member&apos;s status
        </label>
        <select
          id="status"
          name="status"
          className={`border-2 block rounded-md ${styles.input}`}
          value={status}
          onChange={handleStatus}
        >
          <option value="">--Please choose an option--</option>
          <option value="active">Active</option>
          <option value="retired">Retired</option>
          <option value="terminated">Terminated</option>
          <option value="deceased">Deceased</option>
        </select>

        <button
          className={`bg-green-600 w-full shadow-md text-white text-xl rounded-md py-3 mt-3 transition duration-700 hover:bg-green-500 hover:font-medium`}
          onClick={updateMember}
        >
          Update Status
        </button>
      </>
      <div className=" mt-2 w-auto bg-white rounded-xl my-2 p-2 h-fit sm:mt-0">
        <h2 className="text-lg">Completely remove member</h2>
        <div className="w-auto">
          <p>Enter the staff ID {members[0]?.staff_id} to confirm delete</p>
          <InputField
            id="staffID"
            name="staffID"
            type="text"
            onChange={handleDeleteMember}
            placeholder={`${members[0]?.staff_id}`}
          />

          <button
            onClick={deleteMember}
            className={
              activeDelBtn
                ? "bg-red-300 w-full shadow-md text-white text-xl rounded-md py-3 mt-3 cursor-pointer"
                : "bg-red-600 w-full shadow-md text-white text-xl rounded-md py-3 mt-3 cursor-pointer"
            }
            disabled={activeDelBtn}
          >
            Delete Member
          </button>
        </div>
      </div>
    </>
  );
};
const InputField = (props: any) => {
  return (
    <div>
      <div className="flex flex-col">
        <label>{props.fieldName}</label>
        <input
          id={props.id}
          name={props.name}
          type={props.type}
          className={`rounded-md border border-green-400 outline-1 p-1.5 outline-green-700 ${styles.input}`}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
          placeholder={props.placeholder}
        />
      </div>
    </div>
  );
};
export default Removemember;
