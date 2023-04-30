function getSchool(id) {
  return fetch(`https://course-cat.herokuapp.com/schools/${id}`)
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
