import axios from "axios";

const API_URL = "https://course-cat.herokuapp.com";

export async function getCoursesByQuery(query) {
  try {
    // courses/search/:query
    const response = await axios.get(`${API_URL}/courses/search/${query}`);

    if (response.data && response.data.courses) {
      return response.data.courses;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getCourses(schoolId = null, subjectId = null) {
  if (schoolId && subjectId) {
    try {
      const response = await axios.get(
        "https://course-cat.herokuapp.com/courses",
        {
          schoolId: schoolId,
          subjectId: subjectId,
        }
      );

      if (response.data && response.data.courses) {
        return response.data.courses;
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  try {
    const response = await axios.get(`${API_URL}/courses`);

    console.log("here", response.data);

    if (response.data && response.data.courses) {
      console.log("here", response.data.courses);
      return response.data.courses;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getCoursesWithSubjects(subjectId, schoolId) {
  const url =
    "https://course-cat.herokuapp.com/courses?subjectId=" +
    subjectId +
    "&schoolId=" +
    schoolId;
  console.log(url);
  const response = await fetch(url, {
    method: "POST",
  });
  const data = await response.json();
  if (data && data.courses && data.courses.length > 0) return data.courses;
  else return null;
}

export async function getCourseById(courseId) {
  try {
    const response = await axios.get(
      `https://course-cat.herokuapp.com/courses/${courseId}`
    );
    const data = response.data;

    if (data && data.course) return data.course;
  } catch (error) {
    console.error("Error fetching course data:", error);
  }
  return null;
}
