import { Box, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useCallback, useEffect } from "react";
import { useCourses } from "../../hooks/useCourses";
import CourseCard from "./CourseCard";

function CourseList({ query, courses, isLoading }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useCourses(
    query,
    courses
  );

  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= docHeight && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const renderItems = () => {
    if (query.length <= 2) {
      return [];
    }

    return data
      ? data.pages.flatMap((page) =>
          page.map((course) => <CourseCard key={course._id} course={course} />)
        )
      : [];
  };

  return (
    <>
      <Stack spacing={2}>{renderItems()}</Stack>
      {isLoading ? (
        <CircularProgress />
      ) : (
        isFetchingNextPage && (
          <Box textAlign="center" my={2}>
            Loading more...
          </Box>
        )
      )}
    </>
  );
}

export default CourseList;
