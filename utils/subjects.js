export async function getSubjects() {
  const response = await fetch("https://course-cat.herokuapp.com/subjects");
  const data = await response.json();
  if (data && data.subjects && data.subjects.length > 0) return data.subjects;
  else return null;
}

