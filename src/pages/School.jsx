import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getCoursesWithSubjects from "../api/courseWithSubject";
import CourseCard from "../components/CourseCard";
import styles2 from "../styles/Home.module.css";
import styles from "../styles/School.module.css";

const School = () => {
  const { schoolId, subjectId } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const response = await getCoursesWithSubjects(subjectId, schoolId);
      setLoading(false);
      if (response) {
        setData(
          response.filter((elem) => {
            return (
              elem?.subject?._id === subjectId && elem?.school === schoolId
            );
          })
        );
      }
    };
    getData();
  }, [schoolId, subjectId]);

  return (
    <section className={styles.courseWrap}>
      <h1>Courses Available</h1>
      {data.length > 0 && (
        <div className={`${styles2.colleges} ${styles2.courses}`}>
          {data.map((elem, index) => (
            <CourseCard key={index} elem={elem} />
          ))}
        </div>
      )}
      {isLoading && (
        <div className={styles.loaderText}>Fetching Courses...</div>
      )}
      {data.length === 0 && !isLoading && (
        <div className={styles.loaderText}>No Courses Found</div>
      )}
    </section>
  );
};

export default School;
