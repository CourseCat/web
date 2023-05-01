import { SERVER_URL } from "./constants";

export async function getColleges() {
  const response = await fetch(`${SERVER_URL}/schools`);
  const data = await response.json();
  if (data && data.schools && data.schools.length > 0) return data.schools;
  else return null;
}
