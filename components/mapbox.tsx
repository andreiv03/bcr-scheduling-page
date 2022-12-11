import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

import styles from "styles/components/mapbox.module.scss";

mapboxgl.accessToken = "pk.eyJ1IjoiYW5kcmVpdjAzIiwiYSI6ImNsYmk3aWczMTB3emQzbnJybWZyMmZnNzQifQ.VyYVW-L-y_RRXxJ2-1B26A";

const Mapbox: React.FC<{
  isMapVisible: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}> = ({ isMapVisible: [isMapVisible, setIsMapVisible] }) => {
  const mapContainer = useRef({} as HTMLDivElement);
  const map = useRef({} as mapboxgl.Map);
  const [lat, setLat] = useState("44.4410307");
  const [lng, setLng] = useState("26.0516768");
  const [zoom, setZoom] = useState("15");

  useEffect(() => {
    if (Object.keys(map.current).length) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [parseInt(lng), parseInt(lat)],
      zoom: parseInt(zoom)
    });
    console.log(map.current)
  });

  useEffect(() => {
    if (!map.current) return;
    // map.current.on("move", () => {
    //   setLng(map.current.getCenter().lng.toFixed(4));
    //   setLat(map.current.getCenter().lat.toFixed(4));
    //   setZoom(map.current.getZoom().toFixed(2));
    // });
  });

  return (
    <div className={styles["wrapper"]}>
      <button onClick={() => setIsMapVisible(false)}>
        <IoIosArrowBack />
        <span>Înapoi la căutare</span>
      </button>
      <div className={styles["map_container"]} ref={mapContainer} />
    </div>
  );
};

export default Mapbox;