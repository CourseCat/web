import { Box, Grid } from "@mui/material";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import SchoolInfo from "../../../components/schools/SchoolInfo";
import SubjectList from "../../../components/subjects/SubjectList";

import { getSchoolById } from "../../../utils/schools";

function SchoolDetails({ school }) {
  const router = useRouter();

  // Map Code
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey:
      process.env.GOOGLE_MAPS_API_KEY ||
      "AIzaSyBhXJr5eCkwhUUWGi7t1Hpi8Uo8PRHkH64",
  });

  const [map, setMap] = useState(null);
  const { coordinates } = school;

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(coordinates);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <Grid container spacing={4}>
      {/* First row: School Info */}
      <Grid item xs={12} md={12}>
        <SchoolInfo school={school} />
      </Grid>

      {/* 2nd row */}
      <Grid container item spacing={2}>
        <Grid item xs={12} justifyContent="center">
          <Box
            textAlign="center"
            alignItems="center"
            justifyContent="center"
            bgcolor="red"
          >
            {
              /* Map */
              isLoaded && (
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "400px" }}
                  center={coordinates}
                  zoom={14}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                >
                  {/* Child components, such as markers, info windows, etc. */}
                  <></>
                </GoogleMap>
              )
            }
          </Box>
        </Grid>
      </Grid>

      {/* 3rd row */}
      <Grid container item spacing={2}>
        <SubjectList subjects={school.subjects} />
      </Grid>
    </Grid>
  );
}

export default SchoolDetails;

export async function getServerSideProps({ params }) {
  const { schoolId } = params;
  const school = await getSchoolById(schoolId);

  console.log(school);

  // const res = await fetch(`http://localhost:3001/schools/${params.schoolId}`);
  // const school = await res.json();

  return {
    props: {
      school,
    },
  };
}
