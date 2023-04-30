import { Container } from "@mui/material";
import { Stack } from "@mui/system";
import CourseCard from "./CourseCard";

function CourseList({ query, courses }) {
  // const classes = useStyles();
  // const [page, setPage] = React.useState(1);
  // const [coursesPerPage, setCoursesPerPage] = React.useState(10);

  // const handleChange = (event, value) => {
  //   setPage(value);
  // };

  // const startIndex = (page - 1) * coursesPerPage;
  // const endIndex = startIndex + coursesPerPage;
  // const paginatedCourses = items.slice(startIndex, endIndex);

  const filteredCourses = query
    ? courses.filter((course) => {
        return course.name.toLowerCase().includes(query.toLowerCase());
      })
    : [];

  return (
    <Container>
      <Stack gap={2}>
        {filteredCourses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </Stack>
      {/* <div className={classes.pagination}>
        <Pagination
          count={Math.ceil(items.length / coursesPerPage)}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </div> */}
    </Container>
  );
}

export default CourseList;
