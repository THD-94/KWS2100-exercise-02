import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Layer } from "ol/layer";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Feature, Map, MapBrowserEvent, Overlay } from "ol";
import { Polygon } from "ol/geom";

type KommuneProperties = {
  kommunenummer: string;
  navn: {
    sprak: string;
    navn: string;
  }[];
};
type KommuneFeature = Feature<Polygon> & {
  getProperties(): KommuneProperties;
};
const kommuneSource = new VectorSource<KommuneFeature>({
  url: "/KWS2100-exercise-02/kommuner.json",
  format: new GeoJSON(),
});
const kommuneLayer = new VectorLayer({
  source: kommuneSource,
});

export function KommuneLayerCheckBox({
  map,
  setLayers,
}: {
  map: Map;
  setLayers: Dispatch<SetStateAction<Layer[]>>;
}) {
  const [checked, setChecked] = useState(false);
  const overlay = useMemo(() => new Overlay({}), []);
  const overlayRef = useRef() as MutableRefObject<HTMLDivElement>;
  useEffect(() => {
    overlay.setElement(overlayRef.current);
    map.addOverlay(overlay);
    return () => {
      map.removeOverlay(overlay);
    };
  }, []);
  const [selectedKommune, setSelectedKommune] = useState<
    KommuneFeature | undefined
  >();

  function handleClick(e: MapBrowserEvent<MouseEvent>) {
    const clickedKommune = kommuneSource.getFeaturesAtCoordinate(
      e.coordinate,
    ) as KommuneFeature[];
    if (clickedKommune.length === 1) {
      setSelectedKommune(clickedKommune[0]);
      overlay.setPosition(e.coordinate);
    } else {
      setSelectedKommune(undefined);
      overlay.setPosition(undefined);
    }
  }

  useEffect(() => {
    if (checked) {
      setLayers((old) => [...old, kommuneLayer]);
      map.on("click", handleClick);
    } else {
      setLayers((old) => old.filter((l) => l !== kommuneLayer));
      map.un("click", handleClick);
    }
  }, [checked]);
  return (
    <div>
      <label>
        <input
          type={"checkbox"}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        {checked ? "Hide" : "Show"} kommuner
      </label>
      <div ref={overlayRef} className={"kommune-overlay"}>
        {
          !(
            !setSelectedKommune ||
            !(
              <>
                {
                  (
                    selectedKommune?.getProperties() as KommuneProperties
                  ).navn.find((n) => n.sprak === "nor")!.navn
                }
              </>
            )
          )
        }
      </div>
    </div>
  );
}
