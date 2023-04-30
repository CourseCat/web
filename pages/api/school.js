function getSchool(schoolId) {
  return fetch(`https://course-cat.herokuapp.com/schools/${schoolId}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data && data.school) {
        return data.school;
      } else return null;
    });
}

export default getSchool;
