import { PDFDownloadLink } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import getColleges from "../api/colleges";
import getCourses from "../api/courses";
import exportPDF from "../api/exportPDF";
import getSubjects from "../api/subjects";
import CollegeCard from "../components/CollegeCard";
import CourseCard from "../components/CourseCard";
import List from "../components/List";
import SubjectCard from "../components/SubjectCard";
import styles from "../styles/Home.module.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const [colleges, setColleges] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [mode, setMode] = useState("schools");
  const [isPdfRendered, setIsPdfRendered] = useState(false);
  const [pdf, setPdf] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const [responseColleges, responseSubjects, responseCourses] =
        await Promise.all([getColleges(), getSubjects(), getCourses()]);
      if (responseColleges) {
        setColleges(responseColleges);
      }
      if (responseSubjects) {
        setSubjects(responseSubjects);
      }
      if (responseCourses) {
        setCourses(responseCourses);
      }
    };
    getData();
  }, []);

  const toggle = (state) => {
    setMode(state);
    setQuery("");
    setPdf(null);
    setIsPdfRendered(false);
  };

  const search = (value) => {
    setQuery(value);
  };

  const exportHandler = async () => {
    let pdfDoc;
    if (query === "") {
      alert("Search something..");
      return;
    }

    if (mode === "schools") {
      if (colleges.length === 0) {
        alert("No colleges found..");
        return;
      }
      pdfDoc = exportPDF(colleges, query, "schools");
    } else if (mode === "courses") {
      if (courses.length === 0) {
        alert("No courses found..");
        return;
      }
      pdfDoc = exportPDF(courses, query, "courses");
    }
    setPdf(pdfDoc);
  };

  useEffect(() => {
    if (pdf) {
      setIsPdfRendered(true);
    }
  }, [pdf]);

  useEffect(() => {
    if (query) {
      setIsPdfRendered(false);
      setPdf(null);
    }
  }, [query]);

  return (
    <section className={styles.home}>
      <img src="/logo.png" alt="coursecat logo" />
      <h1>CourseCat</h1>
      <div className={styles.searchWrap}>
        <input
          type="text"
          placeholder={`Search for ${mode}..`}
          value={query}
          onChange={(e) => search(e.target.value)}
        />
        <img src="/search.svg" alt="search icon" />
      </div>
      <div className={styles.toggleWrap}>
        <div
          className={`${styles.toggle} ${
            mode === "schools" ? styles.active : ""
          }`}
          onClick={() => toggle("schools")}
        >
          Schools
        </div>
        <div
          className={`${styles.toggle} ${
            mode === "courses" ? styles.active : ""
          }`}
          onClick={() => toggle("courses")}
        >
          Courses
        </div>
        <div
          className={`${styles.toggle} ${
            mode === "subjects" ? styles.active : ""
          }`}
          onClick={() => toggle("subjects")}
        >
          Subjects
        </div>
        {isPdfRendered ? (
          <PDFDownloadLink
            document={pdf}
            fileName="coursecat_results.pdf"
            className={styles.export}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download Now"
            }
          </PDFDownloadLink>
        ) : mode === "subjects" ? (
          <></>
        ) : (
          <div
            className={styles.export}
            onClick={() => {
              exportHandler();
            }}
          >
            Export Data (PDF)
          </div>
        )}
      </div>
      {
        <List
          query={query}
          array={
            mode === "schools"
              ? colleges
              : mode === "courses"
              ? courses
              : subjects
          }
          box={
            mode === "schools"
              ? CollegeCard
              : mode === "courses"
              ? CourseCard
              : SubjectCard
          }
        />
      }
    </section>
  );
};

export default Home;
