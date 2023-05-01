import axios from "axios";

const API_URL = "https://course-cat.herokuapp.com";

export async function getCoursesByQuery(query) {
  try {
    const response = await axios.get(`${API_URL}/courses/search/${query}`);

    if (response.data && response.data.courses) {
      return response.data.courses;
    }
  } catch (error) {
    console.error(error);
  }
  return [];
}

export async function getCourses(schoolId = null, subjectId = null) {
  try {
    const response = await axios.get(`${API_URL}/courses`, {
      params: {
        ...(schoolId ? { schoolId } : {}),
        ...(subjectId ? { subjectId } : {}),
      },
    });

    if (response.data && response.data.courses) {
      return response.data.courses;
    }
  } catch (error) {
    console.error(error);
  }
  return [];
}

export async function getCoursesWithSubjects(subjectId, schoolId) {
  try {
    const response = await axios.get(`${API_URL}/courses`, {
      params: {
        subjectId,
        schoolId,
      },
    });

    if (
      response.data &&
      response.data.courses &&
      response.data.courses.length > 0
    ) {
      return response.data.courses;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}

export async function getCourseById(courseId) {
  try {
    const response = await axios.get(`${API_URL}/courses/${courseId}`);

    if (response.data && response.data.course) {
      return response.data.course;
    }
  } catch (error) {
    console.error("Error fetching course data:", error);
  }
  return null;
}

export async function getPrerequisitesById(courseId) {
  try {
    const response = await axios.get(`${API_URL}/courses/${courseId}/prereqs`);

    if (response.data && response.data.prerequisites) {
      return response.data.prerequisites;
    }
  } catch (error) {
    console.error("Error fetching course data:", error);
  }
  return null;
}
