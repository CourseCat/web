import { Box, Stack } from "@mui/material";
import { useEffect } from "react";
import { useCourses } from "../../hooks/useCourses";
import CourseCard from "./CourseCard";

function CourseList({ query, courses }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useCourses(
    query,
    courses
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= docHeight && hasNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasNextPage, fetchNextPage]);

  const renderItems = () => {
    return data
      ? data.pages.flatMap((page) =>
          page.map((course) => <CourseCard key={course._id} course={course} />)
        )
      : [];
  };

  return (
    <>
      <Stack spacing={2}>{renderItems()}</Stack>
      {isFetchingNextPage && (
        <Box textAlign="center" my={2}>
          Loading...
        </Box>
      )}
    </>
  );
}

export default CourseList;
