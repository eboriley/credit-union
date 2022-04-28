import type { NextPage } from 'next'
import { GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Script from "next/script";
import { url } from "../config/url";
import { getSession, signIn } from "next-auth/react";

interface MemberProp {
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
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${url}/members`);

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
    <div className={`${styles.container} w-full h-full`}>
      {/* <MonthlyDuesPaymentForm members={members} /> */}
      {/* <MemberList members={members} />
      <AddMember /> */}
      {/* <PagnationTable members={members} /> */}
    </div>
  );
};

export default Home
