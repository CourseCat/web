function getColleges() {
  return fetch("https://course-cat.herokuapp.com/schools")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data && data.schools && data.schools.length > 0) return data.schools;
      else return null;
    });
}

export default getColleges;
