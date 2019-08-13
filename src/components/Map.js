import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import WebMercatorViewport from "viewport-mercator-project";
import * as turfHelpers from "@turf/helpers";
import "mapbox-gl/dist/mapbox-gl.css";
// import center from '@turf/center';
import bbox from "@turf/bbox";

import PolylineOverlay from "./PolylineOverlay";

const paramsToObject = entries => {
  let result = {};
  for (let entry of entries) {
    // each 'entry' is a [key, value] tupple
    const [key, value] = entry;
    result[key] = JSON.parse(value);
  }
  return result;
  // return Object.keys(entries).reduce((accum, key) => {
  //   accum[key] = JSON.parse(entries[key]);
  //   console.log(accum);
  //   return accum;
  // }, {});
};

const App = ({ location }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  // extract params from URL
  let params = new URLSearchParams(location.search);

  // convert params into object
  const paramsObj = paramsToObject(params);
  const { coordinates, mapboxToken } = paramsObj;

  // calculate bounding box
  const line = turfHelpers.lineString(coordinates);
  var bBox = bbox(line);

  // set viewport dimensions and position
  const viewport = new WebMercatorViewport({
    width: 640,
    height: 360
  }).fitBounds([[bBox[0], bBox[1]], [bBox[2], bBox[3]]], {
    padding: 5,
    offset: [0, -20]
  });

  return (
    <>
      <ReactMapGL
        mapboxApiAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/outdoors-v10"
        reuseMap={true}
        {...viewport}
        onLoad={() => {
          setMapLoaded(true);
        }}
      >
        <PolylineOverlay points={coordinates} />
      </ReactMapGL>
    </>
  );
};

export default App;
