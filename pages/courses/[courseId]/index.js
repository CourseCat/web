import Prereqs from "@/components/courses/Prereqs";
import { getCourseById, getPrereqsById } from "@/utils/courses";
import { Box, Container, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";

const CourseDetails = ({ course }) => {
  const router = useRouter();
  const { courseId } = router.query;
  const [prereqs, setPrereqs] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    async function fetchPrereqs() {
      setIsLoading(true);
      const prereqs = await getPrereqsById(courseId);
      setPrereqs(prereqs);
      setIsLoading(false);
    }
    fetchPrereqs();
  }, [courseId]);

  if (!course) {
    return (
      <Container>
        <Typography variant="h5" component="span" fontWeight="bold">
          {courseId}{" "}
        </Typography>
        <Typography variant="h5" component="span">
          Course Not Found
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h5" component="span" fontWeight="bold">
          {course.courseNumber}{" "}
        </Typography>
        <Typography variant="h5" component="span">
          {course.name}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          <Link href={`/schools/${course.school._id}`} color="inherit">
            {course.school.name}
          </Link>
        </Typography>
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
      {/* Future Content */}
      <Box mt={3}>
        <Typography variant="h5" gutterBottom>
          Prerequisites Visualization
        </Typography>
        {isLoading && <Typography variant="body1">Loading...</Typography>}
        {prereqs && <Typography variant="body1">{prereqs.message}</Typography>}
        {prereqs && prereqs.tree && <Prereqs tree={prereqs.tree} />}
      </Box>

      <Box mt={3}>
        <Typography variant="h5" gutterBottom>
          Related Courses
        </Typography>
        <Typography variant="body1">Coming soon...</Typography>
      </Box>
    </Container>
  );
};

export default CourseDetails;

export async function getServerSideProps(context) {
  const { courseId } = context.params;
  // Replace the URL below with your actual API endpoint
  const course = await getCourseById(courseId);

  // Pass the course data as props to the CourseDetails component
  return {
    props: {
      course,
    },
  };
}
