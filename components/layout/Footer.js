import { Typography } from "@mui/material";
import Link from "next/link";

function Footer() {
  return (
    <footer style={{ textAlign: "center", marginTop: "2rem" }}>
      <Typography variant="caption" color="textSecondary">
        <Link href="https://course.cat" color="inherit">
          &copy; 2023 CourseCat. All rights reserved.
        </Link>
      </Typography>
      <br />
      <Typography variant="caption" color="textSecondary">
        Powered by{" "}
        <Link href="https://www.nextjs.org" color="inherit">
          Next.js
        </Link>
      </Typography>
    </footer>
  );
}

export default Footer;
