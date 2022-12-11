import type { Unit } from "interfaces/units";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { renderToStaticMarkup } from "react-dom/server";

import styles from "styles/components/mapbox.module.scss";

mapboxgl.accessToken = "pk.eyJ1IjoiYW5kcmVpdjAzIiwiYSI6ImNsYmk3aWczMTB3emQzbnJybWZyMmZnNzQifQ.VyYVW-L-y_RRXxJ2-1B26A";

const UserMarker =
  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="25" height="25" rx="12.5" fill="#376AE2"/>
    <rect width="17" height="17" transform="translate(4 4)" fill="white" fill-opacity="0.01"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5001 14.625C10.1522 14.625 8.25006 12.7225 8.25006 10.375C8.25006 8.02747 10.1522 6.125 12.5001 6.125C14.848 6.125 16.7501 8.02747 16.7501 10.375C16.7501 12.7225 14.848 14.625 12.5001 14.625ZM12.5001 13.2083C14.0655 13.2083 15.3334 11.9402 15.3334 10.375C15.3334 8.80981 14.0655 7.54167 12.5001 7.54167C10.9346 7.54167 9.66673 8.80981 9.66673 10.375C9.66673 11.9402 10.9346 13.2083 12.5001 13.2083ZM6.42585 19.4544C6.10589 19.2293 6.02896 18.7874 6.25404 18.4675C7.62882 16.5131 9.9538 15.3333 12.5088 15.3333C15.0422 15.3333 17.3608 16.518 18.7441 18.4647C18.9707 18.7836 18.8959 19.2258 18.577 19.4524C18.2581 19.679 17.8159 19.6042 17.5893 19.2853C16.473 17.7144 14.5856 16.75 12.5088 16.75C10.4101 16.75 8.51933 17.7094 7.41274 19.2825C7.18766 19.6025 6.74582 19.6794 6.42585 19.4544Z" fill="white"/>
  </svg>;


const UnitMarker =
  <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10 0C15.5204 0 20 4.53388 20 10.1211C20 14.6105 16.536 19.9965 11.8375 25.1785C10.8482 26.2736 9.15183 26.2736 8.16403 25.1801C3.46397 19.9965 0 14.6105 0 10.1211C0 4.53388 4.47964 0 10 0Z" fill="#376AE2"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.49466 5.57015C8.49466 6.00342 8.64267 6.37369 8.93811 6.68073C9.22848 6.98927 9.58568 7.14377 10.0003 7.14377C10.4069 7.14377 10.766 6.98927 11.0626 6.68073C11.3586 6.37369 11.5066 6.00342 11.5066 5.57015C11.5066 5.14635 11.3554 4.77158 11.0588 4.46396C10.7628 4.15508 10.4069 4 10.0003 4C9.58568 4 9.22848 4.15819 8.93371 4.46846C8.64267 4.7755 8.49466 5.14635 8.49466 5.57015ZM15 9.27077V10.2256H7.41426V10.7701H15V14.3648C15 15.2672 14.2837 16 13.4001 16H6.59927C5.71564 16 5 15.2672 5 14.3648V13.4111H12.5863V12.866H5V9.27077C5 8.36858 5.71564 7.63485 6.59927 7.63485H13.4001C14.2837 7.63485 15 8.36858 15 9.27077Z" fill="white"/>
  </svg>;

const Mapbox: React.FC<{
  isMapVisible: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  unitsByGeolocation: Unit[];
}> = ({ isMapVisible: [isMapVisible, setIsMapVisible], unitsByGeolocation }) => {
  const userMarker = document.createElement("div");
  userMarker.innerHTML = renderToStaticMarkup(UserMarker);
  

  const mapContainer = useRef({} as HTMLDivElement);
  const map = useRef({} as mapboxgl.Map);
  const [lat, setLat] = useState("44.4410307");
  const [lng, setLng] = useState("26.0516768");
  const [zoom, setZoom] = useState("13");

  useEffect(() => {
    if (Object.keys(map.current).length) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [parseFloat(lng), parseFloat(lat)],
      zoom: parseInt(zoom)
    });

    new mapboxgl.Marker(userMarker)
      .setLngLat([parseFloat(lng), parseFloat(lat)])
      .addTo(map.current);
    
    unitsByGeolocation.forEach((unit) => {
      const unitMarker = document.createElement("div");
      unitMarker.innerHTML = renderToStaticMarkup(UnitMarker);

      new mapboxgl.Marker({
        element: unitMarker,
        scale: 0.25
      })
        .setLngLat([parseFloat(unit.location.longitude), parseFloat(unit.location.latitude)])
        .addTo(map.current);
    });
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