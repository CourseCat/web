export async function getColleges() {
  const response = await fetch("https://course-cat.herokuapp.com/schools");
  const data = await response.json();
  if (data && data.schools && data.schools.length > 0) return data.schools;
  else return null;
}

