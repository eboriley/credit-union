import React from "react";

export const ColumnFilter = ({ column }: any) => {
  const { filterValue, setFilter } = column;
  return (
    <div>
      <input
        className="focus:outline-none p-1 m-2 px-3 w-20 border-green-400 rounded-2xl text-black"
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};
