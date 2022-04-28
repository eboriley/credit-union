import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "/styles/Home.module.css";

const Layout = ({ children }: any) => {
  const { data: session }: any = useSession();
  console.log(session);
  const router = useRouter();
  const [menuIcon, setMenuIcon] = useState("/images/hamburger.png");
  const [displayMenu, setDisplayMenu] = useState("hidden");
  const menuItems = [
    {
      href: "/",
      title: "Dashboard",
      icon: "fas fa-home",
    },
    {
      href: "/addmember",
      title: "Add Member",
      icon: "fas fa-user",
    },
    {
      href: "/member",
      title: "Members",
      icon: "fas fa-users",
    },
    {
      href: "/addmonthlydues",
      title: "Add Monthly Dues",
      icon: "fas fa-coins",
    },
    {
      href: "/monthlydues",
      title: "Monthly Dues",
      icon: "fas fa-coins",
    },
    {
      href: "/removemember",
      title: "Remove member",
      icon: "fas fa-cog",
    },
    {
      href: "/monthlyduesreport",
      title: "Monthly Dues Report",
      icon: "fas fa-coins",
    },
  ];
  return (
    <div className="flex h-screen text-sm">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <>
        <Script src="https://kit.fontawesome.com/df5897ee86.js" />
      </>
      <div className="flex flex-col sm:flex-col flex-1 container m-auto w-full bg-white p-2 my-8 shadow-xl h-5.5/6 md:rounded-xl">
        <header className={`flex bg-slate-100 p-2 items-center rounded-xl`}>
          <div className="">
            <Link href="/">
              <a className="flex items-center">
                <img
                  className="w-10 h-10 mr-3"
                  src="/images/IMG-20220223-WA0008.jpg"
                  alt="Credit Union logo"
                />
                <p className="text-xl font-semibold">NIBS</p>
              </a>
            </Link>
          </div>
          <div className="ml-auto flex  text-black p-1 rounded-xl items-center ">
            <div className="relative flex">
              <p className="mx-2">
                <i className="fas fa-bell text-emerald-500 text-2xl"></i>
              </p>

              <div className="flex justify-center items-center w-2 h-2 bg-orange-500 p-2.5 rounded-full text-white relative right-4 bottom-1 shadow-xl">
                <p>7</p>
              </div>
            </div>

            <img
              className="w-8 h-8 rounded-full mr-2"
              src={`${session?.user?.photo}`}
              alt="profile photo"
            />
            <div>
              <p>{session?.user?.f_name + " " + session?.user?.surname}</p>
              <small>{session?.user?.email}</small>
            </div>
            {!session && (
              <div>
                <Link href="/api/auth/signin">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      signIn();
                    }}
                  >
                    Sign In
                  </a>
                </Link>
              </div>
            )}
            {session && (
              <div>
                <Link href="/api/auth/signout">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      signOut();
                    }}
                  >
                    Sign Out
                  </a>
                </Link>
              </div>
            )}
          </div>
        </header>
        <div className="flex flex-col sm:flex-row">
          <aside className="md:w-1/7">
            <div
              className="p-1 w-10 block sm:hidden"
              onClick={() => {
                if (displayMenu === "hidden") {
                  setDisplayMenu("block");
                  setMenuIcon("/images/close.png");
                } else {
                  setDisplayMenu("hidden");
                  setMenuIcon("/images/hamburger.png");
                }
              }}
            >
              <img src={menuIcon} alt="menu icon" />
            </div>
            <nav className={`${displayMenu} bg-green-500 sm:block sm:bg-white`}>
              <ul>
                {menuItems.map(({ href, title, icon }) => (
                  <li
                    className={`my-1 mx-2 pl-3 text-sm flex items-center ${
                      router.pathname === href
                        ? "sm:bg-zinc-200 rounded-xl p-1 font-medium cursor-pointer"
                        : "sm:bg-white hover:bg-zinc-300 cursor-pointer rounded-xl p-1"
                    }`}
                    key={title}
                    onClick={() => {
                      setDisplayMenu("hidden");
                      setMenuIcon("/images/hamburger.png");
                    }}
                  >
                    <i className={`${icon} `}></i>
                    <Link href={href}>
                      <a className="flex p-2 ">{title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <main className="w-3.5/4 w-full">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
