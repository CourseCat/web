import { Box, Grid, Typography } from "@mui/material";
import SubjectCard from "./SubjectCard";

function SubjectList({ subjects }) {
  return (
    <Box textAlign="center" mt={3}>
      <Typography variant="h4" sx={{ marginBottom: 2, textAlign: "center" }}>
        Subjects
      </Typography>
      <Grid container spacing={2}>
        {subjects.map((subject) => (
          <Grid item xs={12} sm={6} key={subject._id}>
            <SubjectCard subject={subject} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SubjectList;
