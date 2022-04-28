import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import { url } from "../../../config/url";
import { getSession, signIn } from "next-auth/react";

const Member_ = ({ member }: any) => {
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
      <div className="flex bg-slate-100 flex-col m-2 rounded-xl">
        <div className="container mx-auto m-3 p-2 px-4 sm:flex">
          <div className="rounded-xl bg-white shadow-xl">
            <img
              src={
                member[0].photo
                  ? member[0].photo
                  : "/images/profile-placeholder.jpg"
              }
              className="w-full"
              alt="profile-photo"
            />
            <p className="text-center font-bold text-2xl p-2">
              {member[0].f_name} {member[0].surname} {member[0].other_name}
            </p>
          </div>

          <div className="w-full bg-white mt-3 p-3 rounded-2xl shadow-xl ml-0 sm:mt-0 ml-5">
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
            <p className="flex text-sm">
              <span className="mx-2 mb-1.5">
                <Image
                  src={"/images/email.png"}
                  width={20}
                  height={20}
                  alt="email"
                />{" "}
              </span>{" "}
              {member[0].next_of_kin}
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
              {member[0].next_of_kin_phone}
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
              {member[0].institution}
            </p>
            <Link
              href="/editmember/[id]"
              as={`/editmember/${member[0].staff_id}`}
            >
              <a>edit</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async (context: any) => {
  const res = await fetch(`${url}/members/${context.params.id}`);
  const member = await res.json();

  return {
    props: {
      member,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`${url}/members`);
  const members = await res.json();

  const ids = members.map((member: any) => member.staff_id);

  const paths = ids.map((id: any) => ({ params: { id: id.toString() } }));
  return {
    paths,
    fallback: false,
  };
};

export default Member_;
