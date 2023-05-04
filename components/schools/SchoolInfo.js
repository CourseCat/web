import { Box, Link, Typography } from "@mui/material";
import Image from "next/image";

function SchoolInfo({ school }) {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Box mb={2}>
          <Image
            src={school.logoUrl}
            alt={school.name}
            width={300}
            height={300}
          />
        </Box>

        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          {school.name}
        </Typography>

        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Address:
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {school.address}
        </Typography>

        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Website:
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          <Link
            href={school.website}
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            {school.website}
          </Link>
        </Typography>
      </Box>
    </>
  );
}

export default SchoolInfo;
