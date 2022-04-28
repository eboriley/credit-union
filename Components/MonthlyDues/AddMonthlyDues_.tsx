import React, { useState } from "react";
import styles from "../../styles/Home.module.css";
import { url } from "../../config/url";

const AddMonthlyDues = () => {
  const [creditDate, setCreditDate] = useState("");
  const [amount, setAmount] = useState("");
  const [member, setMember]: any = useState([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleDatePeriods = (e: any) => {
    const date = new Date(e.target.value);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let month = date.getMonth();
    let year = date.getFullYear();

    setMonth(months[month]);
    setYear(`${year}`);
    setCreditDate(e.target.value);
  };

  function filterMembers(event: any) {
    event.preventDefault();
    fetch(`${url}/members/${event.target.value}`)
      .then((res) => res.json())
      .then((data) => {
        setMember(data);
      })
      .catch((error) => {
        error;
      });
  }

  const addMonthlyDues = async () => {
    const res = await fetch(`${url}/add-monthlydues`, {
      body: JSON.stringify({
        date: creditDate,
        description: "Monthly Dues",
        credit: parseFloat(amount),
        staff_id: member[0]?.staff_id,
        month: month,
        year: year,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
    if (result === "Monthly dues added to member successfully!") {
      console.log("Monthly dues added to member successfully!");
      setMonth("");
      setYear("");
      setCreditDate("");
      setAmount("");
    }
  };

  return (
    <div className="bg-slate-100 rounded-xl m-2 mx-auto px-3 py-3">
      <h2>Add monthly dues</h2>
      <FilterInput
        id={"staff_id"}
        name={"staff_id"}
        type={"text"}
        placeHolder=""
        onChange={filterMembers}
      />
      <div className="mr-5 w-auto bg-white rounded-xl h-fit my-2 p-2">
        <InputField
          fieldName={"First"}
          id={"f_name"}
          name={"f_name"}
          type={"text"}
          placeHolder=""
          disabled={true}
          value={member[0]?.f_name}
        />
        <InputField
          fieldName={"Surname"}
          id={"surname"}
          name={"surname"}
          type={"text"}
          placeHolder=""
          disabled={true}
          value={member[0]?.surname}
        />
        <label htmlFor="date">Select Period from Calendar</label>
        <p>The month and year will be recorded as selected from the calendar</p>
        <input
          className={`block rounded-md border border-green-400 outline-1 p-1.5 outline-green-700 ${styles.input}`}
          type="date"
          id="date"
          name="date"
          onChange={handleDatePeriods}
        />
        <div>
          <InputField
            fieldName={"Month"}
            id={"month"}
            name={"month"}
            type={"text"}
            placeHolder=""
            disabled={true}
            value={month}
          />
          <InputField
            fieldName={"Year"}
            id={"year"}
            name={"year"}
            type={"text"}
            placeHolder=""
            disabled={true}
            value={year}
          />

          <label htmlFor="amount">Amount</label>
          <input
            className={`block rounded-md text-xl border border-green-400 outline-1 p-1.5 outline-green-700 ${styles.input}`}
            type="text"
            name="amount"
            id="amount"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          <button
            className={`bg-green-600 shadow-md text-white text-xl rounded-md py-3 px-2 mt-3 mr-3 transition duration-700 hover:bg-green-500 hover:font-medium`}
            onClick={addMonthlyDues}
          >
            Credit Amount
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMonthlyDues;

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
          onChange={props.onChange}
          disabled={props.disabled}
          value={props.value}
          className={`rounded-md border border-green-400 outline-1 p-1.5 outline-green-700 ${styles.input}`}
        />
        <small className={`text-red-400 ${props.errorShow}`}>
          {props.errorMsg}
        </small>
      </div>
    </div>
  );
};

const FilterInput = (props: any) => {
  return (
    <div className="bg-slate-100">
      <div className="flex flex-col">
        <span className="ml-3">
          Search :{" "}
          <input
            id={props.id}
            name={props.name}
            type={props.type}
            placeholder={props.placeHolder}
            onChange={props.onChange}
            disabled={props.disabled}
            className={`focus:outline-none p-1 m-2 px-3 w-72 border-green-400 rounded-2xl`}
          />
        </span>
      </div>
    </div>
  );
};
