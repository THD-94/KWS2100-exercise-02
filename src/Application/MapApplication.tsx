import React, { MutableRefObject, useRef, useEffect } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

import "./MapApplication.css";
import "ol/ol.css";

useGeographic();

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  view: new View({
    center: [10, 59],
    zoom: 10,
  }),
});
function MapApplication() {
  const mapRef = useRef() as MutableRefObject<HTMLAnchorElement>;

  useEffect(() => {
    map.setTarget(mapRef.current);
  }, []);
  return (
    <>
      <header>
        <h1>Map Application</h1>
      </header>
      <nav>Actions</nav>
      <main ref={mapRef}></main>
    </>
  );
}
export default MapApplication;
