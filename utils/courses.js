export async function getCourses() {
  const response = await fetch("https://course-cat.herokuapp.com/courses");
  const data = await response.json();
  if (data && data.courses && data.courses.length > 0) return data.courses;
  else return null;
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
