import axios from "axios";

export async function getSchoolById(schoolId) {
  try {
    const response = await axios.get(
      `https://course-cat.herokuapp.com/schools/${schoolId}`
    );
    const data = response.data;
    if (data && data.school) {
      return data.school;
    } else {
      return { error: "School not found" };
    }
  } catch (error) {
    console.error(error);
    return { error: "Internal server error" };
  }
}
