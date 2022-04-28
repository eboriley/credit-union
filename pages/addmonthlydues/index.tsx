import React, { useState, useEffect } from "react";
import AddMonthlyDues_ from "../../components/MonthlyDues/AddMonthlyDues_";
import type { NextPage } from "next";
import { getSession, signIn } from "next-auth/react";
const AddMonthlyDues = () => {
  const [loading, setLoading] = useState(true);
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
  }, []);
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <AddMonthlyDues_ />
    </div>
  );
};

export default AddMonthlyDues;
