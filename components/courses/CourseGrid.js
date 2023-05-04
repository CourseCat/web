import { Box, Grid } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import BottomText from "../ui/BottomText";
import LoadingView from "../ui/LoadingView";
import CourseGridItem from "./CourseGridItem";
import useIntersectionObserver from "./useIntersectionObserver";

const PAGE_SIZE = 12;

export default function CourseGrid({ courses, isLoading }) {
  const [initialCourses, setInitialCourses] = useState(
    courses.slice(0, PAGE_SIZE)
  );
  const [displayedCourses, setDisplayedCourses] = useState(initialCourses);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setInitialCourses(courses.slice(0, PAGE_SIZE));
  }, [courses]);

  useEffect(() => {
    setDisplayedCourses(initialCourses);
    setHasMore(true);
  }, [initialCourses]);

  const loadMoreCourses = useCallback(() => {
    const currentLength = displayedCourses.length;
    const newCourses = courses.slice(currentLength, currentLength + PAGE_SIZE);

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

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <Box>
      <Grid container spacing={4}>
        {displayedCourses.map((course) => CourseGridItem({ course }))}
      </Grid>
      {hasMore ? <div ref={loaderRef}></div> : <BottomText />}
    </Box>
  );
}
