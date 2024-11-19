import styles from "./contact.module.css";
import Image from "next/image";

import dynamic from "next/dynamic";

// const HydrationTestNoSSR = dynamic(() => import("@/components/hydrationTest"), {
//   ssr: false,
// });

export const metadata = {
  title: "Contact",
  description: "Contact description",
};

function ContactPage() {
  // const [isClient, setClient] = useState(false);

  // useEffect(() => {
  //   setClient(true);
  // }, []);
  // const a = Math.random();
  // console.log(a);
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/contact.png" alt="" fill className={styles.img} />
      </div>
      <div className={styles.formContainer}>
        {/* {isClient && "render o phia trinh duyet"}
        <HydrationTestNoSSR /> */}
        {/* <div suppressHydrationWarning>{a}</div> */}
        <form action="" className={styles.form}>
          <input type="text" placeholder="Name and Surname" />
          <input type="text" placeholder="Email Address" />
          <input type="text" placeholder="Phone Number (Optional)" />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Message"
          ></textarea>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
