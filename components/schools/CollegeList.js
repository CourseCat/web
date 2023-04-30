import { Container, Stack } from "@mui/material";
import CollegeCard from "./CollegeCard";

const CollegeList = ({ query, colleges }) => {
  const filteredColleges = query
    ? colleges.filter((college) => {
        return college.name.toLowerCase().includes(query.toLowerCase());
      })
    : [];

  return (
    <Container>
      <Stack gap={2}>
        {filteredColleges.map((college, index) => {
          return <CollegeCard key={index} college={college} />;
        })}
      </Stack>
    </Container>
  );
};

export default CollegeList;
