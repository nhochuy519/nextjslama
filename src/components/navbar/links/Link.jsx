"use client";

import { useState } from "react";
import Link from "next/link";

import styles from "./link.module.css";
import Image from "next/image";

import NavLink from "./navLink/navLink";

import { handleGithubLogout } from "@/lib/action";

import { auth } from "@/lib/auth";
function Links({ session }) {
  const [open, setOpen] = useState(false);
  const links = [
    {
      title: "Homepage",
      path: "/",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Contact",
      path: "/contact",
    },
    {
      title: "Blog",
      path: "/blog",
    },
  ];

  const isAdmin = true;

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link, index) => {
          return <NavLink item={link} key={index} />;
        })}

        {session?.user ? (
          <>
            {session.user?.isAdmin && (
              <NavLink item={{ title: "Admin", path: "/admin" }} />
            )}

            <form action={handleGithubLogout}>
              <button className={styles.logout}>Logout</button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>

      <Image
        className={styles.menuButton}
        src={"/menu.png"}
        onClick={() => setOpen((prev) => !prev)}
        width={30}
        height={30}
        alt=""
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link, index) => {
            return <NavLink item={link} key={index} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Links;
