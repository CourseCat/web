import axios from "axios";

const API_URL = "https://course-cat.herokuapp.com";

export async function fetchCoursesByQuery(query, searchInDescription = false) {
  const body = {
    query,
    searchInDescription,
  };

  console.log(body);

  try {
    const response = await axios.post(`${API_URL}/courses/search`, body);

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

export async function getPrereqsById(courseId) {
  try {
    const response = await axios.get(`${API_URL}/courses/${courseId}/prereqs`);

    if (response.status !== 200) {
      return { tree: null, message: "Coming Soon..." };
    }

    if (response.data && response.data.prerequisites) {
      return response.data.prerequisites;
    }
  } catch (error) {
    console.error("Error fetching course data:", error);
    return { tree: null, message: "Coming Soon..." };
  }
  return null;
}
