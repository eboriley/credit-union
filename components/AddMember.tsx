import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import ReactDOM from "react-dom";
import AddMemberSuccess from "./Member/AddMemberSuccess";
import ReactToPrint from "react-to-print";
import { url } from "../config/url";
import { getSession, signIn, useSession } from "next-auth/react";

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
  password?: string;
  password2?: string;
}

const errMessage: ErrorMessage = {};

const AddMember = () => {
  const { data: session }: any = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hiddenError, setHiddenError] = useState({
    staff_id: "",
    f_name: "",
    surname: "",
    dob: "",
    phone_1: "",
    next_of_kin: "",
    next_of_kin_phone: "",
    relationship: "",
    password: "",
    password2: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    staff_id: "",
    f_name: "",
    surname: "",
    dob: "",
    phone_1: "",
    next_of_kin: "",
    next_of_kin_phone: "",
    relationship: "",
    password: "",
    password2: "",
  });
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState("");

  const validateInputs = (values: any) => {
    const updatedValues: any = {};
    const strongRegex = new RegExp(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
    );
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

    if (!values.password) {
      updatedValues.password = "Password is required";
    } else if (!strongRegex.test(values.password)) {
      updatedValues.password =
        "Password must contain at least one special character and numeric digit";
    }
    if (!values.password) {
      updatedValues.password = "Password is required";
    }
    if (values.password2) {
      if (values.password !== values.password2) {
        updatedValues.password = "Password does not match";
      }
    }

    return updatedValues;
  };

  const renderErrorMessage = (error: any) => {
    let updatedValues: any = {};

    updatedValues.staff_id = error.staff_id ? "block" : "hidden";

    updatedValues.f_name = error.f_name ? "block" : "hidden";

    updatedValues.surname = error.surname ? "block" : "hidden";

    updatedValues.dob = error.dob ? "block" : "hidden";

    updatedValues.phone_1 = error.phone_1 ? "block" : "hidden";

    updatedValues.next_of_kin = error.next_of_kin ? "block" : "hidden";

    updatedValues.next_of_kin_phone = error.next_of_kin_phone
      ? "block"
      : "hidden";

    updatedValues.relationship = error.relationship ? "block" : "hidden";

    updatedValues.password = error.password ? "block" : "hidden";

    updatedValues.password2 = error.password2 ? "block" : "hidden";
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
    values.password = event.target.password.value;

    const errors = validateInputs(values);
    setErrorMessage((prevState) => ({
      ...prevState,
      ...errors,
    }));

    renderErrorMessage(errors);

    if (Object.keys(errors).length === 0) {
      const res = await fetch(`${url}/add-member`, {
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
          institution: event.target.institution.value,
          password: event.target.password.value,
          type: event.target.type.value,
          beneficiary_1: event.target.beneficiary_1.value,
          beneficiary_2: event.target.beneficiary_2.value,
          beneficiary_3: event.target.beneficiary_3.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const result = await res.json();
      if (result === "Member information added successfully") {
        setInfo(result);
        setShow(true);
      }
    }
  };

  useEffect(() => {
    const securePage = async () => {
      const session: any = await getSession();
      if (!session) {
        signIn();
      } else {
        setLoading(false);
      }
    };
    securePage();
  });
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (session?.user.type !== "admin") {
    return <h2>You are not allowed to view this page</h2>;
  }

  return (
    <div className="flex bg-slate-100 flex-col m-2 rounded-xl">
      <form onSubmit={addMember} className="">
        <h2 className="text-center text-xl">Member Registration Form</h2>
        <div className="container mx-auto m-3 p-2 px-4 sm:flex">
          <div className="mr-5 w-full bg-white rounded-xl h-fit my-2 p-2">
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

            <label htmlFor="dob">
              Date of birth<span className="text-red-600"> *</span>
            </label>
            <input
              id="dob"
              name="dob"
              type="date"
              className={`block rounded-md border border-green-400 outline-1 p-1.5 outline-green-700 ${styles.input}`}
            />

            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              className={`block border-2 rounded-md ${styles.input}`}
            >
              <option value="hybrid">--Please choose an option--</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="mr-5 w-full">
            <div className="mr-5 w-full bg-white rounded-xl h-fit my-2 p-2">
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
                fieldName="Institution Name"
                id="institution"
                name="institution"
                type="text"
                asterix=" "
                placeHolder="e.g. Nkawkaw Islamic Basic Sch"
              />
            </div>
            <div className="mr-5 w-full bg-white rounded-xl h-fit my-2 p-2">
              <InputField
                fieldName={"Password"}
                id={"password"}
                name={"password"}
                type={"password"}
                asterix={" *"}
                errorShow={hiddenError.password}
                errorMsg={errorMessage.password}
                placeHolder="min of 8 Characters"
              />

              <InputField
                fieldName={"Confirm password"}
                id={"password2"}
                name={"password2"}
                type={"password"}
                asterix={" *"}
                errorShow={hiddenError.password2}
                errorMsg={errorMessage.password2}
                placeHolder="min of 8 Characters"
              />

              <label htmlFor="type">Type of member</label>
              <select
                id="type"
                name="type"
                className={`block border-2 rounded-md ${styles.input}`}
              >
                <option value="member">--Please choose an option--</option>
                <option value="admin">Admin</option>
                <option value="member">Member</option>
              </select>
            </div>
          </div>
          <div className="mr-5 w-full bg-white rounded-xl h-fit my-2 p-2">
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

            <InputField
              fieldName="Beneficiary 1"
              id="beneficiary_1"
              name="beneficiary_1"
              type="text"
              asterix=" "
              placeHolder="e.g. Edward Obeng"
            />

            <InputField
              fieldName="Beneficiary 2"
              id="beneficiary_2"
              name="beneficiary_2"
              type="text"
              asterix=" "
              placeHolder="e.g. Felix Obeng"
            />

            <InputField
              fieldName="Beneficiary 3"
              id="beneficiary_3"
              name="beneficiary_3"
              type="text"
              asterix=" "
              placeHolder="e.g.  Mariam Obeng"
            />

            <button
              type="submit"
              className={`bg-green-600 shadow-md text-white text-xl rounded-md py-3 px-2 mt-3 mr-3 transition duration-700 hover:bg-green-500 hover:font-medium`}
            >
              Add Member
            </button>
          </div>
        </div>
      </form>
      <AddMemberSuccess
        show={show}
        close={() => router.push("/member")}
        info={info}
      />
    </div>
  );
};

export default AddMember;

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
