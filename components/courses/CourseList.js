import { Box, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import CourseCard from "./CourseCard";
import useIntersectionObserver from "./useIntersectionObserver";

function CourseList({ courses }) {
  const [initialCourses, setInitialCourses] = useState(courses.slice(0, 10));
  const [displayedCourses, setDisplayedCourses] = useState(initialCourses);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setInitialCourses(courses.slice(0, 10));
  }, [courses]);

  useEffect(() => {
    setDisplayedCourses(initialCourses);
    setHasMore(true);
  }, [initialCourses]);

  const loadMoreCourses = useCallback(() => {
    const currentLength = displayedCourses.length;
    const newCourses = courses.slice(currentLength, currentLength + 10);

    if (newCourses.length === 0) {
      setHasMore(false);
    } else {
      setDisplayedCourses((prevCourses) => [...prevCourses, ...newCourses]);
    }
  }, [displayedCourses, courses]);

  const loaderRef = useRef(null);

  useIntersectionObserver(loaderRef, loadMoreCourses);

  if (displayedCourses.length === 0) {
    return;
  }

  return (
    <Box>
      <Stack spacing={2}>
        {displayedCourses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </Stack>
      {hasMore ? (
        <div ref={loaderRef}></div>
      ) : (
        <Typography variant="subtitle1" align="center" marginTop={2}>
          You have reached the bottom
        </Typography>
      )}
    </Box>
  );
}

export default CourseList;
