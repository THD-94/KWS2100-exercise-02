import React, { MutableRefObject, useRef, useEffect, useState } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

import "./MapApplication.css";
import "ol/ol.css";
import "../Kommune/KommuneLayerCheckBox";
import { Layer } from "ol/layer";
import { KommuneLayerCheckBox } from "../Kommune/KommuneLayerCheckBox";

useGeographic();

const map = new Map({
  view: new View({
    center: [10, 59],
    zoom: 10,
  }),
});

export function MapApplication() {
  const [layers, setLayers] = useState<Layer[]>([
    new TileLayer({
      source: new OSM(),
    }),
  ]);
  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    map.setLayers(layers);
  }, [layers]);

  useEffect(() => {
    map.setTarget(mapRef.current);
  }, []);
  return (
    <>
      <header>
        <h1>Map Application</h1>
      </header>
      <nav>
        <KommuneLayerCheckBox />
      </nav>
      <main ref={mapRef}></main>
    </>
  );
}
