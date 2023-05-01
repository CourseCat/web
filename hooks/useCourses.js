// hooks/useCourses.js
import { useInfiniteQuery } from "@tanstack/react-query";

const batchSize = 10;

const fetchCourses = async ({ pageParam = 0, query, courses }) => {
  const filteredCourses = query
    ? courses.filter((course) =>
        course.name.toLowerCase().includes(query.toLowerCase())
      )
    : courses;

  const start = pageParam * batchSize;
  const end = start + batchSize;

  return filteredCourses.slice(start, end);
};

export const useCourses = (query, courses) => {
  return useInfiniteQuery(
    ["courses", query],
    ({ pageParam = 0 }) => fetchCourses({ pageParam, query, courses }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPageIndex = allPages.length;
        const hasMore =
          allPages.reduce((total, page) => total + page.length, 0) <
          courses.length;
        return hasMore ? nextPageIndex : false;
      },
    }
  );
};
