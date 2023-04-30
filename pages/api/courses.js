function getCourses() {
  return fetch("https://course-cat.herokuapp.com/courses")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data && data.courses && data.courses.length > 0) return data.courses;
      else return null;
    });
}

export default getCourses;
