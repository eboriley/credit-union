import React from "react";

export const FilterDuesTable = ({ filter, setFilter }: any) => {
  return (
    <div className="bg-slate-100">
      <span className="ml-3">
        Filter dues :{" "}
        <input
          className="focus:outline-none p-1 m-2 px-3 w-72 border-green-400 rounded-2xl"
          value={filter || ""}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="e.g month or year"
        />
      </span>
    </div>
  );
};
