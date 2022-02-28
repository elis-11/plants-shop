import React, { useState } from "react";
/* eslint import/no-webpack-loader-syntax: off */
import Map, { Marker } from "react-map-gl";

// added the following 6 lines.
import mapboxgl from "mapbox-gl";

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const MapBox = () => {
  const [viewport, setViewport] = useState({
    zoom: 5.5,
  });

  return (
    <Map
      mapboxAccessToken={process.env.REACT_APP_ACCESS_TOKEN}
      initialViewState={{
        longitude: 14.5252505403024489,
        latitude: 53.436670414866406,
        zoom: 14,
      }}
      style={{ width: "100vw", height: "50vh" }}
      mapStyle="mapbox://styles/denizy2/ckzqqti7j000x15pgxy4hdqch"
    >
      <Marker
        latitude={53.436670414866406}
        longitude={14.5271515413024489}
        offsetTop={(-viewport.zoom * 7) / 2}
      >
        <img
          src={"images/symbols/390px-Map_marker.png"}
          alt="fef"
          width={viewport.zoom * 7}
          height={viewport.zoom * 9}
        />
      </Marker>
    </Map>
  );
};

export default MapBox;
