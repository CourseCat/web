import axios from "axios";

export async function getCourses(schoolId = "", subjectId = "") {
  if (schoolId && subjectId) {
    try {
      const response = await axios.post(
        "https://course-cat.herokuapp.com/courses",
        {
          schoolId: schoolId,
          subjectId: subjectId,
        }
      );

      console.log(response.data);

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

  const response = await fetch("https://course-cat.herokuapp.com/courses");
  const data = await response.json();
  if (data && data.courses && data.courses.length > 0) return data.courses;
  else return [];
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
