import { Box } from "@mui/material";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState } from "react";

export default function Map({ coordinates }) {
  // Map Code
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey:
      process.env.GOOGLE_MAPS_API_KEY ||
      "AIzaSyBhXJr5eCkwhUUWGi7t1Hpi8Uo8PRHkH64",
  });

  const [map, setMap] = useState(null);
  const onLoad = useCallback(
    function callback(map) {
      map.setZoom(13);
      setMap(map);
    },
    [coordinates]
  );
  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <Box textAlign="center" alignItems="center" justifyContent="center">
      {
        /* Map */
        isLoaded && (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={coordinates}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <></>
          </GoogleMap>
        )
      }
    </Box>
  );
}
