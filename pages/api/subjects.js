function getSubjects() {
  return fetch("https://course-cat.herokuapp.com/subjects")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data && data.subjects && data.subjects.length > 0)
        return data.subjects;
      else return null;
    });
}

export default getSubjects;
