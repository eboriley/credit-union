import React from "react";

export const GlobalFilter = ({ filter, setFilter }: any) => {
  return (
    <div className="bg-slate-100">
      <span className="ml-3">
        Search :{" "}
        <input
          className="focus:outline-none p-1 m-2 px-3 w-72 border-green-400 rounded-2xl"
          value={filter || ""}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="e.g name  phone  staff id"
        />
      </span>
    </div>
  );
};
