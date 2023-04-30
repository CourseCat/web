import { getCourses } from "@/utils/courses";
import { getSchoolById } from "@/utils/schools";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";

const SubjectDetails = ({ courses, subjectName, schoolName }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const getGridCols = () => {
    if (isDesktop) return 4;
    if (isTablet) return 6;
    return 12;
  };

  const truncateDescription = (description) => {
    const sentences = description.match(/[^\.!\?]+[\.!\?]+/g);
    const truncated = sentences.slice(0, 5).join(" ");
    return sentences.length > 5 ? truncated + "..." : truncated;
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom component="div">
          {subjectName}
          <Typography variant="caption" display="block" gutterBottom>
            {schoolName}
          </Typography>
        </Typography>
        <Grid container spacing={4}>
          {courses.map((course) => (
            <Grid item xs={getGridCols()} key={course._id}>
              <Link
                href={`/courses/${course._id}`}
                underline="none"
                sx={{ textDecoration: "none" }}
              >
                <Card>
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      color="primary"
                      gutterBottom
                    >
                      {course.courseNumber}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      {course.name}
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      {course.school.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxHeight: "4.5em",
                      }}
                    >
                      {course.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default SubjectDetails;

export async function getServerSideProps({ params }) {
  const { schoolId, subjectId } = params;
  const courses = await getCourses(schoolId, subjectId);
  const school = await getSchoolById(schoolId);
  const subject = school.subjects.find((subject) => subject._id === subjectId);

  return {
    props: {
      subjectName: subject.name,
      schoolName: school.name,
      courses,
    },
  };
}
