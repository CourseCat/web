import { PDFDownloadLink } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

// Components
import ToggleButton from "../components//ui/ToggleButton";
import CourseCard from "../components/courses/CourseCard";
import CourseList from "../components/courses/CourseList";
import CollegeCard from "../components/schools/CollegeCard";
import CollegeList from "../components/schools/CollegeList";
import Logo from "../components/ui/Logo";
import Search from "../components/ui/Search";
import styles from "../styles/Home.module.css";

// Utils
import { Box, Container, Stack } from "@mui/material";
import { getColleges } from "../utils/colleges";
import { getCourses } from "../utils/courses";
import exportPDF from "../utils/exportPDF";
import { getSubjects } from "../utils/subjects";

const Home = ({ colleges, subjects, courses }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 750);
  const [mode, setMode] = useState("schools");
  const [isPdfRendered, setIsPdfRendered] = useState(false);
  const [pdf, setPdf] = useState(null);

  const toggle = (state) => {
    setMode(state);
    setQuery("");
    setPdf(null);
    setIsPdfRendered(false);
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

  const handleInputChange = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const cardContainer = {
    schools: CollegeCard,
    courses: CourseCard,
  }[mode];

  const cardItems = {
    schools: colleges,
    courses: courses,
  }[mode];

  return (
    <Container maxWidth="md" className={styles.container}>
      <Logo />
      <Box width={750} maxWidth="90%" textAlign="center">
        <Search query={query} mode={mode} onChange={handleInputChange} />
        <Stack
          direction="row"
          spacing={1}
          mb={3}
          className={styles.buttonsContainer}
        >
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
        </Stack>
      </Box>
      {mode == "schools" && (
        <CollegeList query={debouncedQuery} colleges={colleges} />
      )}
      {mode == "courses" && (
        <CourseList query={debouncedQuery} courses={courses} />
      )}
    </Container>
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
