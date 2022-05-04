import React from "react";
import ReactDOM from "react-dom";

const AddMemberSuccess = ({ show, close, info }: any) => {
  if (!show) return null;
  return ReactDOM.createPortal(
    <div className="container bg-white rounded-xl flex flex-col items-center w-96 p-4 justify-center relative -translate-y-96 m-auto shadow-md ">
      <p>{info}</p>
      <button
        className={`bg-green-600 shadow-md text-white text-xl rounded-md py-3 px-10 mt-3 mr-3 transition duration-700 hover:bg-green-500 hover:font-medium`}
        onClick={close}
      >
        Ok
      </button>
    </div>,
    document.getElementById("addmember-portal")!
  );
};

export default AddMemberSuccess;
