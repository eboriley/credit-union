import React, { useState, useEffect } from "react";
import styles from "/styles/Home.module.css";
import { url } from "../../config/url";
import { getSession, signIn } from "next-auth/react";

const Monthlyduesreport = () => {
  const [displayDownloadBtn, setdisplayDownloadBtn] = useState("invisible");
  const [loading, setLoading] = useState(true);
  const [dateFrom, setDateFrom] = useState({
    fromDay: "",
    fromMonth: "",
    fromYear: "",
  });
  const [dateTo, setDateTo] = useState({
    toDay: "",
    toMonth: "",
    toYear: "",
  });

  const handleDateFrom = (e: any) => {
    const { name, value } = e.target;
    setDateFrom((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    //validateDownload();
  };

  const handleDateTo = (e: any) => {
    const { name, value } = e.target;
    setDateTo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // validateDownload();
  };

  const validateDownload = () => {
    if (
      dateFrom.fromYear === "" ||
      dateFrom.fromMonth === "" ||
      dateFrom.fromDay === "" ||
      dateTo.toYear === "" ||
      dateTo.toMonth === "" ||
      dateTo.toDay === ""
    ) {
      setdisplayDownloadBtn("invisible");
    } else setdisplayDownloadBtn("visible");
  };

  const getReport1 = async (event: any) => {
    event.preventDefault();
    const res = await fetch("http://localhost:5000/transactionbydate/123123", {
      body: JSON.stringify({
        from: `${dateFrom.fromYear}-${dateFrom.fromMonth}-${dateFrom.fromDay}`,
        to: `${dateTo.toYear}-${dateTo.toMonth}-${dateTo.toDay}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();

    console.log(result);
    // setdisplayDownloadBtn("visible");
  };

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
    validateDownload();
  }, []);
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <div>
        <InputField
          fieldName="Day"
          id="fromDay"
          name="fromDay"
          type="text"
          value={dateFrom.fromDay}
          onChange={handleDateFrom}
        />
        <InputField
          fieldName="Month"
          id="fromMonth"
          name="fromMonth"
          type="text"
          value={dateFrom.fromMonth}
          onChange={handleDateFrom}
        />
        <InputField
          fieldName="Year"
          id="fromYear"
          name="fromYear"
          type="text"
          value={dateFrom.fromYear}
          onChange={handleDateFrom}
        />
      </div>
      <div>
        <InputField
          fieldName="Day"
          id="toDay"
          name="toDay"
          type="text"
          value={dateTo.toDay}
          onChange={handleDateTo}
        />
        <InputField
          fieldName="Month"
          id="toMonth"
          name="toMonth"
          type="text"
          value={dateTo.toMonth}
          onChange={handleDateTo}
        />
        <InputField
          fieldName="Year"
          id="toYear"
          name="toYear"
          type="text"
          value={dateTo.toYear}
          onChange={handleDateTo}
        />
      </div>
      <button
        className={`bg-green-600 shadow-md text-white text-xl rounded-md py-3 px-2 mt-3 mr-3 transition duration-700 hover:bg-green-500 hover:font-medium`}
        onClick={getReport1}
      >
        Generate report
      </button>
      <a
        className={`bg-green-600 shadow-md text-white text-xl rounded-md ${displayDownloadBtn} py-3 px-2 mt-3 mr-3 transition duration-700 hover:bg-green-500 hover:font-medium`}
        href={`https://nibs.nkawkawislamicschool.com/reportbydate/134577?from=${dateFrom.fromYear}-${dateFrom.fromMonth}-${dateFrom.fromDay}&to=${dateTo.toYear}-${dateTo.toMonth}-${dateTo.toDay}`}
      >
        Download Report
      </a>
    </div>
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

export default Monthlyduesreport;
