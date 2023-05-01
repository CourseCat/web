import { Box, Typography } from "@mui/material";
import Image from "next/image";

function Logo() {
  return (
    <Box justifyContent="center">
      <Image
        src="/images/logo.png"
        alt="Course Cat Logo"
        width={250}
        height={250}
        priority
      />
      <Typography variant="h3" mb={3} fontWeight="bold" textAlign="center">
        Course Cat
      </Typography>
    </Box>
  );
}

export default Logo;
