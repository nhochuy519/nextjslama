import Link from "next/link";

import styles from "./navbar.module.css";
import Links from "./links/Link";
import { auth } from "@/lib/auth";
async function Navbar() {
  const session = await auth();

  console.log(session);
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        Logo
      </Link>
      <div>
        <Links session={session} />
      </div>
    </div>
  );
}

export default Navbar;
