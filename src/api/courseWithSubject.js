function getCoursesWithSubjects(subjectId, schoolId) {
    const url = "https://course-cat.herokuapp.com/courses?subjectId=" + subjectId + "&schoolId=" + schoolId;
    console.log(url);
    return fetch(url, {
        method: 'POST',
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (data && data.courses && data.courses.length > 0)
                return data.courses;
            else
                return null;
        });
}

export default getCoursesWithSubjects;