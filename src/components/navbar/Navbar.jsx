import Link from "next/link";

import styles from "./navbar.module.css";
import Links from "./links/Link";
function Navbar() {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        Logo
      </Link>
      <div>
        <Links />
      </div>
    </div>
  );
}

export default Navbar;
