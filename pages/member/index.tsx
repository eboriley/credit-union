import React from "react";
import { NextPage } from "next";
import { GetStaticProps } from "next";
import Head from "next/head";
import MemberTable from "../../Components/Member/MemberTable";
type MemberProp = {
  staffID: string;
  fName: string;
  surname: string;
  otherName?: string;
  photo?: string;
  dob: string;
  gender: string;
  phone1: string;
  phone2?: string;
  email?: string;
  nextOfKin: string;
  nextOfKinPhone: string;
  relationship: string;
  archived: string;
  status: string;
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("http://localhost:5000/members");

  async function getRes() {
    if (res.status === 200) {
      return res.json();
    }
  }

  const members: MemberProp[] = await getRes();

  return {
    props: {
      members,
    },
  };
};

const Member: NextPage<MemberProp> = ({ members }: any) => {
  return (
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <MemberTable members={members} />
    </div>
  );
};

export default Member;
