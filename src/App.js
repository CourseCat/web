import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import School from "./pages/School";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/schools/:schoolId" element={<School />} /> */}
        <Route
          path="/schools/:schoolId/subjects/:subjectId"
          element={<School />}
        />
      </Routes>
    </Router>
  );
}

export default App;
