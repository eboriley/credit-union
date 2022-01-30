import type { NextPage } from 'next'
import { GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { ReactNode } from "react";
import styles from "../styles/Home.module.css";
import MemberList from "../Components/MemberList";
import AddMember from "../Components/AddMember";
import MemberTable from "../Components/MemberTable";
import SortingTable from "../Components/SortingTable";
import FilteringTable from "../Components/FilteringTable";
import PagnationTable from "../Components/PagnationTable";
import MonthlyDuesPaymentForm from "../Components/MonthlyDuesPaymentForm";

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

const Home: NextPage<MemberProp[]> = ({ members }: any) => {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <MonthlyDuesPaymentForm members={members} />
      {/* <MemberList members={members} />
      <AddMember /> */}
      <PagnationTable members={members} />
    </div>
  );
};

export default Home
