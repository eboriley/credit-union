import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import AddMember from "../../components/AddMember";
import { getSession, signIn } from "next-auth/react";
const Addmember: NextPage = () => {
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
      <AddMember />
    </div>
  );
};

export default Addmember;
