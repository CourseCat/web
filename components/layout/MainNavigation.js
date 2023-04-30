import Link from "next/link";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">CourseCat</Link>
      </div>
      <nav>
        <ul className="justify-between">
          <li>
            <Link href="/">Search</Link>
          </li>
          <li>
            <Link href="https://course.cat">Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
