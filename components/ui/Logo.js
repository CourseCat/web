import Image from "next/image";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <div>
      <Image
        src="/images/logo.png"
        alt="Course Cat Logo"
        width={250}
        height={250}
      />
      <h1 className={styles.title}>CourseCat</h1>
    </div>
  );
}

export default Logo;
