import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import SchoolInfo from "../../../components/schools/SchoolInfo";
import SubjectList from "../../../components/subjects/SubjectList";
import Map from "../../../components/ui/Map";
import { getSchoolById } from "../../../utils/schools";

function SchoolDetails({ school }) {
  const router = useRouter();
  const { coordinates } = school;

  return (
    <Grid container spacing={4}>
      {/* First row: School Info */}
      <Grid item xs={12} md={12}>
        <SchoolInfo school={school} />
      </Grid>

      {/* 2nd row */}
      <Grid container item spacing={2}>
        <Grid item xs={12} justifyContent="center">
          <Map coordinates={coordinates} />
        </Grid>
      </Grid>

      {/* 3rd row */}
      <Grid container item spacing={2}>
        <SubjectList school={school} />
      </Grid>
    </Grid>
  );
}

export default SchoolDetails;

export async function getServerSideProps({ params }) {
  const { schoolId } = params;
  const school = await getSchoolById(schoolId);

  return {
    props: {
      school,
    },
  };
}
