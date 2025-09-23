"use client";

import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { renderToStaticMarkup } from "react-dom/server";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { ENV } from "@/config/constants";
import { LayoutContext } from "@/contexts/layout-context";
import { useContextHook } from "@/hooks/use-context-hook";
import type { Unit } from "@/types/unit";

import UnitMarker from "@/assets/unit-marker";
import UserMarker from "@/assets/user-marker";
import styles from "@/styles/components/step-two.module.scss";

interface Props {
	units: Unit[];
	setIsMapVisible: (value: boolean) => void;
}

export default function Mapbox({ units, setIsMapVisible }: Props) {
	const { setStep, setUnit } = useContextHook(LayoutContext);

	const mapRef = useRef<mapboxgl.Map | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const markersRef = useRef<mapboxgl.Marker[]>([]);

	const [currentUnit, setCurrentUnit] = useState<Unit | null>(null);

	useEffect(() => {
		(async () => {
			let center: [number, number] = [26.1025, 44.4268]; // Bucharest
			mapboxgl.accessToken = ENV.MAPBOX_API_KEY;

			try {
				const position = await new Promise<GeolocationPosition>((res, rej) =>
					navigator.geolocation.getCurrentPosition(res, rej, {
						enableHighAccuracy: true,
						timeout: 6000,
					}),
				);

				const { latitude, longitude } = position.coords;
				center = [longitude, latitude];
			} catch {}

			if (!containerRef.current || mapRef.current) {
				return;
			}

			const map = new mapboxgl.Map({
				attributionControl: false,
				center,
				container: containerRef.current,
				style: "mapbox://styles/mapbox/streets-v12",
				zoom: 13,
			});

			mapRef.current = map;

			const userMarker = document.createElement("div");
			userMarker.innerHTML = renderToStaticMarkup(UserMarker());
			new mapboxgl.Marker({ element: userMarker }).setLngLat(center).addTo(map);

			const unitMarker = renderToStaticMarkup(UnitMarker());
			markersRef.current = units.map((unit) => {
				const element = document.createElement("div");
				element.innerHTML = unitMarker;
				const marker = new mapboxgl.Marker({ element: element, scale: 0.25 })
					.setLngLat([+unit.location.longitude, +unit.location.latitude])
					.addTo(map);
				element.addEventListener("click", () => setCurrentUnit(unit));
				return marker;
			});
		})();

		return () => {
			markersRef.current.forEach((marker) => marker.remove());
			markersRef.current = [];
			mapRef.current?.remove();
			mapRef.current = null;
		};
	}, [units]);

	return (
		<>
			<div className={styles["wrapper"]}>
				<button onClick={() => setIsMapVisible(false)}>
					<IoIosArrowBack />
					<span>Înapoi la căutare</span>
				</button>
				<div className={styles["map_container"]} ref={containerRef} />
			</div>

			<div className={`${styles["current_unit"]} ${currentUnit ? styles["visible"] : ""}`}>
				<button
					disabled={!currentUnit}
					onClick={() => {
						if (!currentUnit) {
							return;
						}

						window.scrollTo({ top: 0, behavior: "smooth" });
						setUnit(currentUnit);
						setIsMapVisible(false);

						setTimeout(() => {
							setStep(3);
						}, 300);
					}}
				>
					Alege unitatea
				</button>

				<div className={styles["content"]}>
					<div className={styles["top_section"]}>
						<h3>{currentUnit?.brn}</h3>
						<h5>{currentUnit?.distance} km</h5>
					</div>

					<p>{currentUnit?.br_street}</p>

					<div className={styles["bottom_section"]}>
						{currentUnit?.mfm_euro_all_day && <h4>Self-service 24/7</h4>}
						{currentUnit?.appointmentsSchedule?.isCashless && <h4>Fără casiere</h4>}
					</div>
				</div>
			</div>
		</>
	);
}
