import { getCourseById } from "@/utils/courses";
import { Box, Container, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const CourseDetails = ({ course }) => {
  const router = useRouter();
  const { courseId } = router.query;

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h5" component="span" fontWeight="bold">
          {course.courseNumber}{" "}
        </Typography>
        <Typography variant="h5" component="span">
          {course.name}
        </Typography>
        <Link
          href={`/schools/${course.school._id}`}
          color="inherit"
          underline="hover"
        >
          {course.school.name}
        </Link>
        <Box mt={2}>
          <Paper elevation={2}>
            <Box p={3}>
              <Typography variant="h5" gutterBottom>
                Course Description
              </Typography>
              <Typography variant="body1" paragraph>
                {course.description}
              </Typography>
              {course.prerequisites && (
                <>
                  <Typography variant="h5" gutterBottom>
                    Prerequisites
                  </Typography>
                  <Typography variant="body1">
                    {course.prerequisites}
                  </Typography>
                </>
              )}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default CourseDetails;

export async function getServerSideProps(context) {
  const { courseId } = context.params;
  // Replace the URL below with your actual API endpoint
  const course = getCourseById(courseId);
  
  // Pass the course data as props to the CourseDetails component
  return {
    props: {
      course,
    },
  };
}
