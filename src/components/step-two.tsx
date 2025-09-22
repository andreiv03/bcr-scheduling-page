"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MdLocationPin } from "react-icons/md";

import axios from "@/config/axios";
import { LayoutContext } from "@/contexts/layout-context";
import { useContextHook } from "@/hooks/use-context-hook";
import { useDebounce } from "@/hooks/use-debounce";
import type { Unit } from "@/types/unit";

import Mapbox from "@/components/mapbox";
import styles from "@/styles/components/step-two.module.scss";

function UnitComponent({ unit }: { unit: Unit }) {
	const { setStep, setUnit } = useContextHook(LayoutContext);

	const select = () => {
		setStep(3);
		setUnit(unit);
	};

	return (
		<div className={styles["unit"]} onClick={select}>
			<div className={styles["content"]}>
				<div className={styles["top_section"]}>
					<h3>{unit.brn}</h3>
					<h5>{unit.distance} km</h5>
				</div>

				{unit.br_street && <p>{unit.br_street}</p>}

				<div className={styles["bottom_section"]}>
					{unit.mfm_euro_all_day && <h4>Self-service 24/7</h4>}
					{unit.appointmentsSchedule.isCashless && <h4>Fără casiere</h4>}
				</div>
			</div>
		</div>
	);
}

export default function StepTwo() {
	const { setStep, setUnit } = useContextHook(LayoutContext);

	const heroSectionRef = useRef<HTMLDivElement>(null);

	const [isHeroSectionHidden, setIsHeroSectionHidden] = useState(false);
	const [isMapVisible, setIsMapVisible] = useState(false);
	const [seeMore, setSeeMore] = useState(false);

	const [units, setUnits] = useState<Unit[]>([]);

	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce(search, 250);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (units.length) {
			return;
		}

		(async () => {
			try {
				setLoading(true);
				setError(null);

				let queries = new URLSearchParams({});

				try {
					const position = await new Promise<GeolocationPosition>((resolve, reject) =>
						navigator.geolocation.getCurrentPosition(resolve, reject, {
							enableHighAccuracy: true,
							timeout: 6000,
						}),
					);

					const { latitude, longitude } = position.coords;
					queries = new URLSearchParams({
						latitude: latitude.toString(),
						longitude: longitude.toString(),
					});
				} catch {}

				const { data } = await axios.get<{ units: Unit[] }>(`/api/units?${queries.toString()}`);
				setUnits(Array.isArray(data.units) ? data.units : []);
			} catch {
				setError("A apărut o eroare la încărcarea unităților.");
				setUnits([]);
			} finally {
				setLoading(false);
			}
		})();
	}, [units.length]);

	const searchedUnits = useMemo(() => {
		const search = debouncedSearch.trim().toLowerCase();
		if (!search) {
			return [];
		}

		return units
			.filter((unit) => {
				const street = unit.br_street?.toLowerCase() ?? "";
				const name = unit.brn?.toLowerCase() ?? "";
				return street.includes(search) || name.includes(search);
			})
			.sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));
	}, [debouncedSearch, units]);

	const nearbyUnits = useMemo(
		() => [...units].sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity)),
		[units],
	);

	const showSearchedUnits = debouncedSearch.length >= 3 && searchedUnits.length > 0;
	const list = showSearchedUnits ? searchedUnits : nearbyUnits;

	const showSeeMoreButton =
		!seeMore &&
		((showSearchedUnits && searchedUnits.length > 2) ||
			(!showSearchedUnits && nearbyUnits.length > 2));

	const seeMoreCount = showSearchedUnits
		? Math.max(0, searchedUnits.length - 2)
		: Math.max(0, nearbyUnits.length - 2);

	return (
		<div
			className={styles["step_two"]}
			style={{ marginTop: isHeroSectionHidden ? -(heroSectionRef.current?.offsetHeight ?? 0) : 0 }}
		>
			<div
				className={`${styles["hero_section"]} ${isHeroSectionHidden ? styles["hidden"] : ""}`}
				ref={heroSectionRef}
			>
				<h1>În ce locație ne vizitezi?</h1>
				<p>
					Caută unitatea BCR unde programezi vizita sau permite accesul la localizare și alege o
					unitate de lângă tine.
				</p>
			</div>

			<div className={styles["input_container"]}>
				<label htmlFor="search">Caută unitatea</label>
				<input
					id="search"
					onChange={(event) => setSearch(event.target.value)}
					onFocus={() =>
						!isHeroSectionHidden && setTimeout(() => setIsHeroSectionHidden(true), 300)
					}
					placeholder="Nume unitate / Adresă / Zonă"
					type="text"
					value={search}
				/>
			</div>

			{loading && <div className={styles["status"]}>Se încarcă unitățile...</div>}
			{error && !loading && <div className={styles["error"]}>{error}</div>}

			{!loading && !error && (
				<div className={styles["units"]}>
					<div className={styles["content"]}>
						{(seeMore ? list : list.slice(0, 2)).map((unit, index) => (
							<UnitComponent key={index} unit={unit} />
						))}
					</div>

					{list.length > 0 && (
						<button onClick={() => setIsMapVisible(true)}>
							<span>Alege de pe hartă</span>
							<MdLocationPin />
						</button>
					)}

					{showSeeMoreButton && (
						<button className={styles["see_more"]} onClick={() => setSeeMore(true)}>
							Afișează toate rezultatele (+{seeMoreCount})
						</button>
					)}
				</div>
			)}

			{isMapVisible && (
				<Mapbox
					isMapVisible={[isMapVisible, setIsMapVisible]}
					unitsByGeolocation={units}
					incrementStep={() => setStep(3)}
					onChangeUnit={setUnit}
				/>
			)}
		</div>
	);
}
