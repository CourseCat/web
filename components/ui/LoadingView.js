import { Box, CircularProgress, Typography } from "@mui/material";

function LoadingView() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Typography variant="h5" component="span" fontWeight="bold">
        Loading..
      </Typography>
      <CircularProgress />
    </Box>
  );
}

export default LoadingView;
