// hooks/useCourses.js
import { useInfiniteQuery } from "@tanstack/react-query";

const batchSize = 10;

const fetchCourses = async ({ pageParam = 0, courses }) => {
  const start = pageParam * batchSize;
  const end = start + batchSize;

  return courses.slice(start, end);
};

export const useCourses = (query, courses) => {
  return useInfiniteQuery(
    ["courses", query],
    ({ pageParam = 0 }) => fetchCourses({ pageParam, query, courses }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPageIndex = allPages.length;
        const totalFetched = allPages.reduce(
          (total, page) => total + page.length,
          0
        );
        const hasMore = totalFetched < courses.length;
        return hasMore ? nextPageIndex : false;
      },
    }
  );
};
