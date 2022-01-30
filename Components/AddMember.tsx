import React, { useState } from "react";
import styles from "../styles/Home.module.css";

type MemberProp = {
  staff_id: string;
  f_name: string;
  surname: string;
  other_name?: string;
  photo?: string;
  dob: string;
  gender: string;
  phone_1: string;
  phone_2?: string;
  email?: string;
  next_of_kin: string;
  next_of_kin_phone: string;
  relationship: string;
  archived: string;
  status: string;
};

interface ErrorMessage {
  staff_id?: string;
  f_name?: string;
  surname?: string;
  dob?: string;
  phone_1?: string;
  next_of_kin?: string;
  next_of_kin_phone?: string;
  relationship?: string;
}

const errMessage: ErrorMessage = {};

const AddMember = () => {
  const [hiddenError, setHiddenError] = useState({
    staff_id: "",
    f_name: "",
    surname: "",
    dob: "",
    phone_1: "",
    next_of_kin: "",
    next_of_kin_phone: "",
    relationship: "",
  });

  const [errorMessage, setErrorMessage] = useState({
  });

  const validateInputs = (values: any) => {
    const updatedValues: any = {};

    if (!values.staff_id) {
      updatedValues.staff_id = "Staff ID is required";
    }

    if (!values.f_name) {
      updatedValues.f_name = "First Name is required";
    }

    if (!values.surname) {
      updatedValues.surname = "Surname Name is required";
    }

    if (!values.dob) {
      updatedValues.dob = "Date of birth is required";
    }

    if (!values.phone_1) {
      updatedValues.phone_1 = "Phone number is required";
    }
    if (!values.next_of_kin) {
      updatedValues.next_of_kin = "Next of Kin's name is required";
    }
    if (!values.next_of_kin_phone) {
      updatedValues.next_of_kin_phone =
        "Phone number of Next of Kin is required";
    }
    if (!values.relationship) {
      updatedValues.relationship = "Relationship of Next of Kin is required";
    }

    return updatedValues;
  };

  const renderErrorMessage = (error: any) => {
    let updatedValues: any = {};
    console.log(error);

    updatedValues.staff_id = error.staff_id ? "block" : "hidden";
    console.log(error.staff_id);
    console.log(updatedValues.staff_id);
    if (error.f_name) {
      updatedValues.f_name = "block";
    }

    if (error.surname) {
      updatedValues.surname = "block";
    }

    if (error.dob) {
      updatedValues.dob = "block";
    }

    if (error.phone_1) {
      updatedValues.phone_1 = "block";
    }
    if (error.next_of_kin) {
      updatedValues.next_of_kin = "block";
    }
    if (error.next_of_kin_phone) {
      updatedValues.next_of_kin_phone = "block";
    }
    if (error.relationship) {
      updatedValues.relationship = "block";
    }

    setHiddenError((prevState) => ({
      ...prevState,
      ...updatedValues,
    }));
  };

  const addMember = async (event: any) => {
    event.preventDefault();
    let values: any = {};
    values.staff_id = event.target.staff_id.value;
    values.f_name = event.target.f_name.value;
    values.surname = event.target.surname.value;
    values.dob = event.target.dob.value;
    values.phone_1 = event.target.phone_1.value;
    values.next_of_kin = event.target.next_of_kin.value;
    values.next_of_kin_phone = event.target.next_of_kin_phone.value;
    values.relationship = event.target.relationship.value;

    const errors = validateInputs(values);
    setErrorMessage((prevState) => ({
      ...prevState,
      ...errors,
    }));

    renderErrorMessage(errors);

    if (Object.keys(errors).length === 0) {
      const res = await fetch("http://localhost:5000/add-member", {
        body: JSON.stringify({
          staff_id: event.target.staff_id.value,
          f_name: event.target.f_name.value,
          surname: event.target.surname.value,
          other_name: event.target.other_name.value,
          photo: "/images/profile-placeholder.jpg",
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
    }
  };

  return (
    <>
      <form
        onSubmit={addMember}
        className="flex flex-col container m-auto max-w-sm bg-white rounded-2xl p-4 my-2 shadow-xl shadow-xl shadow-2xl "
      >
        <h2 className="text-center text-xl">Registration Form</h2>

        <InputField
          fieldName={"Staff ID"}
          id={"staff_id"}
          name={"staff_id"}
          type={"text"}
          asterix={" *"}
          errorShow={hiddenError.staff_id}
          errorMsg={errorMessage.staff_id}
          placeHolder="e.g. 238148 or PHD12320"
        />

        <InputField
          fieldName={"First Name"}
          id={"f_name"}
          name={"f_name"}
          type={"text"}
          asterix={" *"}
          errorShow={hiddenError.f_name}
          errorMsg={errorMessage.f_name}
          placeHolder="e.g. Joseph"
        />

        <InputField
          fieldName={"Surname"}
          id={"surname"}
          name={"surname"}
          type={"text"}
          asterix={" *"}
          errorShow={hiddenError.surname}
          errorMsg={errorMessage.surname}
          placeHolder="e.g. Agyemang"
        />

        <InputField
          fieldName={"Other Names"}
          id={"other_name"}
          name={"other_name"}
          type={"text"}
          asterix={" "}
          placeHolder="e.g. Ntim"
        />

        <label htmlFor="dob">Date of birth</label>
        <input
          id="dob"
          name="dob"
          type="date"
          className={`rounded-md border border-green-400 outline-1 p-1.5 outline-green-700 ${styles.input}`}
        />

        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          name="gender"
          className={`border-2 rounded-md ${styles.input}`}
        >
          <option value="hybrid">--Please choose an option--</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <InputField
          fieldName={"Phone 1"}
          id={"phone_1"}
          name={"phone_1"}
          type={"tel"}
          asterix={" *"}
          errorShow={hiddenError.phone_1}
          errorMsg={errorMessage.phone_1}
          placeHolder="e.g. xxx-xxx-xxxx"
        />

        <InputField
          fieldName={"Phone 2"}
          id={"phone_2"}
          name={"phone_2"}
          type={"text"}
          placeHolder="e.g. xxx-xxx-xxxx"
        />

        <InputField
          fieldName={"Email"}
          id={"email"}
          name={"email"}
          type={"text"}
          placeHolder="e.g. email@example.com"
        />

        <InputField
          fieldName="Next Of Kin"
          id="next_of_kin"
          name="next_of_kin"
          type="text"
          asterix=" *"
          errorShow={hiddenError.next_of_kin}
          errorMsg={errorMessage.next_of_kin}
          placeHolder="e.g. Yusuf Ibrahim"
        />

        <InputField
          fieldName="Next of Kin's phone"
          id="next_of_kin_phone"
          name="next_of_kin_phone"
          type="tel"
          asterix=" *"
          errorShow={hiddenError.next_of_kin_phone}
          errorMsg={errorMessage.next_of_kin_phone}
          placeHolder="e.g. xxx-xxx-xxxx"
        />

        <InputField
          fieldName="Relationship to next of kin"
          id="relationship"
          name="relationship"
          type="text"
          asterix=" *"
          errorShow={hiddenError.relationship}
          errorMsg={errorMessage.relationship}
          placeHolder="e.g. sibling"
        />

        <button
          type="submit"
          className={`bg-green-600 shadow-md text-white text-xl rounded-md py-3 mt-3 transition duration-700 hover:bg-green-500 hover:font-medium`}
        >
          Add Member
        </button>
      </form>
    </>
  );
};

const InputField = (props: any) => {
  return (
    <div>
      <div className="flex flex-col">
        <label htmlFor="staff_id">
          {props.fieldName}
          <span className="text-red-600">{props.asterix}</span>
        </label>
        <input
          id={props.id}
          name={props.name}
          type={props.type}
          placeholder={props.placeHolder}
          className={`rounded-md border border-green-400 outline-1 p-1.5 outline-green-700 ${styles.input}`}
        />
        <small className={`text-red-400 ${props.errorShow}`}>
          {props.errorMsg}
        </small>
      </div>
    </div>
  );
};

export default AddMember;
