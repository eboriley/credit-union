import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Head from "next/head";

const member = ({ member }: any) => {
  const date = new Date(member[0].dob);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let month = date.getMonth();
  let day = date.getDay();
  let dayDate = date.getDate();
  let year = date.getFullYear();
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="flex h-screen">
        <div className="container m-auto max-w-sm bg-white rounded-2xl p-2 shadow-xl shadow-xl shadow-2xl ">
          <img
            src={
              member[0].photo
                ? member[0].photo
                : "/images/profile-placeholder.jpg"
            }
            className="m-auto w-full h-86"
            alt="profile-photo"
          />
          <p className="text-center font-bold text-2xl">
            {member[0].f_name} {member[0].surname} {member[0].other_name}
          </p>
          <p className="flex text-sm">
            <span className="mx-2 mb-1.5">
              <Image
                src={"/images/birthday-cake.png"}
                width={20}
                height={20}
                alt="birthday-cake"
              />{" "}
            </span>{" "}
            {`born on ${months[month]} ${dayDate} ${year}, ${days[day]}`}
          </p>
          <p className="flex text-sm">
            <span className="mx-2 mb-1.5">
              <Image
                src={"/images/gender-fluid.png"}
                width={20}
                height={20}
                alt="gender"
              />{" "}
            </span>{" "}
            {member[0].gender}
          </p>
          <p className="flex text-sm">
            <span className="mx-2 mb-1.5">
              <Image
                src={"/images/phone-book.png"}
                width={20}
                height={20}
                alt="phone"
              />{" "}
            </span>{" "}
            {member[0].phone_1}
          </p>
          <p className="flex text-sm">
            <span className="mx-2 mb-1.5">
              <Image
                src={"/images/phone-book.png"}
                width={20}
                height={20}
                alt="phone"
              />{" "}
            </span>{" "}
            {member[0].phone_2}
          </p>
          <p className="flex text-sm">
            <span className="mx-2 mb-1.5">
              <Image
                src={"/images/email.png"}
                width={20}
                height={20}
                alt="email"
              />{" "}
            </span>{" "}
            {member[0].email}
          </p>
          <Link
            href="/editmember/[id]"
            as={`/editmember/${member[0].staff_id}`}
          >
            <a>
              <img src="https://img.icons8.com/material-outlined/24/000000/edit--v4.png" />
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async (context: any) => {
  const res = await fetch(`http://localhost:5000/members/${context.params.id}`);
  const member = await res.json();

  return {
    props: {
      member,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:5000/members");
  const members = await res.json();

  const ids = members.map((member: any) => member.staff_id);

  const paths = ids.map((id: any) => ({ params: { id: id.toString() } }));
  return {
    paths,
    fallback: false,
  };
};

export default member;
