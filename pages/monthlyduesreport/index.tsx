import React, { useState, useEffect } from "react";
import styles from "/styles/Home.module.css";
import { url } from "../../config/url";
import { getSession, signIn, useSession } from "next-auth/react";

const Monthlyduesreport = () => {
  const { data: session }: any = useSession();
  const [displayDownloadBtn, setdisplayDownloadBtn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState({
    from: "",
    to: "",
  });

  const handleDate = (e: any) => {
    const { name, value } = e.target;
    setDate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validateDownload();
  };

  const validateDownload = () => {
    if (date.from === "" && date.to === "") {
      setdisplayDownloadBtn(false);
    } else setdisplayDownloadBtn(true);
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

    setDate(date);
  }, []);
  if (loading) {
    return <h2>Loading...</h2>;
  }

  console.log(date);
  return (
    <div>
      <h1>Generate statement of account</h1>
      <div>
        <label htmlFor="from">
          Date From<span className="text-red-600"> *</span>
        </label>
        <input
          id="from"
          name="from"
          type="date"
          className={`block rounded-md border border-green-400 outline-1 p-1.5 outline-green-700 ${styles.input}`}
          onChange={handleDate}
        />

        <label htmlFor="to">
          Date To<span className="text-red-600"> *</span>
        </label>
        <input
          id="to"
          name="to"
          type="date"
          className={`block rounded-md border border-green-400 outline-1 p-1.5 outline-green-700 ${styles.input}`}
          onChange={handleDate}
        />
      </div>
      {/* <button
        className={`bg-green-600 shadow-md text-white text-xl rounded-md py-3 px-2 mt-3 mr-3 transition duration-700 hover:bg-green-500 hover:font-medium`}
        onClick={getReport1}
      >
        Generate report
      </button> */}
      <div className="mt-6">
        <a
          className={
            displayDownloadBtn
              ? "bg-green-600 w-full shadow-md text-white text-xl rounded-md py-3 mt-3 p-3 cursor-pointer"
              : "bg-green-300 w-full shadow-md text-white text-xl rounded-md py-3 mt-3 p-3 cursor-pointer"
          }
          href={`${url}/reportbydate/${session?.user.staff_id}?from=${date.from}&to=${date.to}`}
        >
          Download Report
        </a>
      </div>
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
