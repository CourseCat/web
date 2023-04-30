import { Box, Typography } from "@mui/material";
import Image from "next/image";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Box>
      <Image
        src="/images/logo.png"
        alt="Course Cat Logo"
        width={250}
        height={250}
        priority
      />
      <Typography
        variant="h1"
        className={styles.title}
        sx={{ marginBottom: 2, textAlign: "center" }}
      >
        CourseCat
      </Typography>
    </Box>
  );
}

export default Logo;
