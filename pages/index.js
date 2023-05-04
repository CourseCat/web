import { PDFDownloadLink } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

// Components
import ToggleButton from "../components//ui/ToggleButton";
import CourseList from "../components/courses/CourseList";
import CollegeList from "../components/schools/CollegeList";
import Logo from "../components/ui/Logo";
import Search from "../components/ui/Search";
import styles from "../styles/Home.module.css";

// Utils
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Stack,
} from "@mui/material";
import { getColleges } from "../utils/colleges";
import { fetchCoursesByQuery } from "../utils/courses";
import exportPDF from "../utils/exportPDF";

const Home = ({ colleges }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);
  const [mode, setMode] = useState("schools");
  const [isPdfRendered, setIsPdfRendered] = useState(false);
  const [pdf, setPdf] = useState(null);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInDescription, setSearchInDescription] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
      if (query.length >= 2) {
        setIsLoading(true);
        // console.log("Fetching courses...");
        // console.log(query);
        // console.log(searchInDescription);

        const courses = await fetchCoursesByQuery(query, searchInDescription);
        setCourses(courses);
        setIsLoading(false);
      }
    }
    fetchCourses();
  }, [query, searchInDescription, mode]);

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
          {mode === "courses" && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={searchInDescription}
                  onChange={() => setSearchInDescription(!searchInDescription)}
                />
              }
              label="Search in Description"
            />
          )}
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
        <CourseList
          query={debouncedQuery}
          courses={courses}
          isLoading={isLoading}
        />
      )}
    </Container>
  );
};

export async function getStaticProps() {
  const colleges = await getColleges();

  return {
    props: {
      colleges,
    },
    revalidate: 60, // update the data every 60 seconds
  };
}

export default Home;
