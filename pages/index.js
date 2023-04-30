import { PDFDownloadLink } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

// Components
import ToggleButton from "../components//ui/ToggleButton";
import CardList from "../components/CardList";
import CollegeCard from "../components/CollegeCard";
import CourseCard from "../components/CourseCard";
import SubjectCard from "../components/subjects/SubjectCard";
import Logo from "../components/ui/Logo";
import Search from "../components/ui/Search";
import styles from "../styles/Home.module.css";

// Utils
import { getColleges } from "../utils/colleges";
import { getCourses } from "../utils/courses";
import exportPDF from "../utils/exportPDF";
import { getSubjects } from "../utils/subjects";

const Home = ({ colleges, subjects, courses }) => {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("schools");
  const [isPdfRendered, setIsPdfRendered] = useState(false);
  const [pdf, setPdf] = useState(null);

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

  const handleInputChange = (e) => search(e.target.value);

  const cardContainer = {
    schools: CollegeCard,
    courses: CourseCard,
    subjects: SubjectCard,
  }[mode];

  const cardItems = {
    schools: colleges,
    courses: courses,
    subjects: subjects,
  }[mode];

  return (
    <section className={styles.container}>
      <Logo />
      <Search query={query} mode={mode} onChange={handleInputChange} />
      <div className={styles.buttonsContainer}>
        <ToggleButton
          mode={mode}
          title="Schools"
          onClick={() => toggle("schools")}
        />
        <ToggleButton
          mode={mode}
          title="Courses"
          onClick={() => toggle("courses")}
        />
        {/* <ToggleButton
          mode={mode}
          title="Subjects"
          onClick={() => toggle("subjects")}
        /> */}
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
      <CardList query={query} items={cardItems} container={cardContainer} />
    </section>
  );
};

export async function getStaticProps() {
  const [responseColleges, responseSubjects, responseCourses] =
    await Promise.all([getColleges(), getSubjects(), getCourses()]);

  return {
    props: {
      colleges: responseColleges,
      subjects: responseSubjects,
      courses: responseCourses,
    },
    revalidate: 60, // update the data every 60 seconds
  };
}

export default Home;
