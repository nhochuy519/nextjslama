"use client";

import styles from "./navLink.module.css";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
function NavLink({ item }) {
  const pathName = usePathname();
  const classNames = clsx(styles.container, {
    [styles.active]: item.path === pathName,
  });
  return (
    <Link href={item.path} className={classNames}>
      {item.title}
    </Link>
  );
}

export default NavLink;
