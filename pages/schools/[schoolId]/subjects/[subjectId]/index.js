import CourseGrid from "@/components/courses/CourseGrid";
import Search from "@/components/ui/Search";
import { getCourses } from "@/utils/courses";
import { getSchoolById } from "@/utils/schools";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useDebounce } from "usehooks-ts";

const SubjectDetails = ({ courses, subjectName, schoolName }) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const filteredCourses = courses.filter((course) => {
    const courseName = course.name.toLowerCase();
    const query = debouncedQuery.toLowerCase();

    return courseName.includes(query);
  });

  const onSearch = (e) => {
    setQuery(e.target.value);
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
        <Stack gap={3}>
          <Search
            query={query}
            onChange={onSearch}
            placeholder="Search for courses"
          />
          <CourseGrid courses={filteredCourses} />
        </Stack>
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
