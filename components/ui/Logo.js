import { Box, Typography } from "@mui/material";
import Image from "next/image";

function Logo() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Image
        src="/images/logo.png"
        alt="Course Cat Logo"
        placeholder="blur"
        blurDataURL="/images/logo.png"
        width={250}
        height={250}
      />
      <Typography variant="h3" mb={3} fontWeight="bold" textAlign="center">
        Course Cat
      </Typography>
    </Box>
  );
}

export default Logo;
