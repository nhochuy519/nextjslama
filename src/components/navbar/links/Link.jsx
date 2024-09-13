"use client";

import { useState } from "react";
import Link from "next/link";

import styles from "./link.module.css";

import NavLink from "./navLink/navLink";
function Links() {
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
  const session = true;
  const isAdmin = true;
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link, index) => {
          return <NavLink item={link} key={index} />;
        })}

        {session ? (
          <>
            {isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
            <button className={styles.logout}>Logout</button>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>

      <button
        className={styles.menuButton}
        onClick={() => setOpen((prev) => !prev)}
      >
        Menu
      </button>

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
