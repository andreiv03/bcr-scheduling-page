"use client";

import { useEffect, useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

import axios from "@/config/axios";
import { LayoutContext } from "@/contexts/layout-context";
import { useContextHook } from "@/hooks/use-context-hook";
import type { TimeSlot } from "@/types/time-slot";

import styles from "@/styles/components/step-three.module.scss";

export default function StepThree() {
	const { state, setTimeSlot } = useContextHook(LayoutContext);

	const [isCalendarVisible, setIsCalendarVisible] = useState(false);

	const [date, setDate] = useState<Date | undefined>();
	const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!date || !state.unit) {
			return;
		}

		(async () => {
			try {
				setLoading(true);
				setError(null);

				const { data } = await axios.get<TimeSlot[]>(
					`/api/units/${encodeURIComponent(String(state.unit?.branchId))}`,
					{ params: { date: date.toISOString().slice(0, 10) } },
				);

				console.log(data);

				setTimeSlots(Array.isArray(data) ? data : []);
			} catch {
				setError("A apărut o eroare la încărcarea intervalelor.");
				setTimeSlots([]);
			} finally {
				setLoading(false);
			}
		})();
	}, [date, state.unit]);

	// Build a stable key for each slot and selection check by key (not by object reference)
	const slotKey = (s: TimeSlot) => `${s.dateTimeStart}|${s.dateTimeEnd}`;
	const selectedKey = state.timeSlot ? slotKey(state.timeSlot) : null;

	// Derived pretty date text
	const dateLabel = useMemo(() => (date ? format(date, "PP") : "Alege data"), [date]);

	return (
		<div className={styles["step_three"]}>
			<div className={styles["hero_section"]}>
				<h1>În ce zi ne vizitezi?</h1>
				<p>Alege data și intervalul orar pentru vizita la {state.unit?.brn}</p>
			</div>

			<div className={`${styles["calendar"]} ${isCalendarVisible ? styles["visible"] : ""}`}>
				<DayPicker
					disabled={[{ before: new Date() }, { dayOfWeek: [0, 6] }]}
					mode="single"
					onSelect={(date) => {
						setDate(date);
						setIsCalendarVisible(false);
						setTimeSlot(null);
					}}
					selected={date}
					showOutsideDays
				/>
			</div>

			<div
				className={`${styles["overlay"]} ${isCalendarVisible ? styles["visible"] : ""}`}
				onClick={() => setIsCalendarVisible(false)}
			/>

			<div className={styles["row"]}>
				<h3>Alege data</h3>
				<button className={styles["option"]} onClick={() => setIsCalendarVisible(true)}>
					{dateLabel}
				</button>
			</div>

			<div className={styles["row"]}>
				<h3>Alege intervalul de timp</h3>

				{loading && <span className={styles["status"]}>Se încarcă intervalele...</span>}
				{error && !loading && <span className={styles["error"]}>{error}</span>}

				{!loading && !error && timeSlots.length === 0 && (
					<span>Niciun interval de timp disponibil</span>
				)}

				{!loading && !error && timeSlots.length > 0 && (
					<div className={styles["slot_list"]}>
						{timeSlots.map((slot) => {
							const key = slotKey(slot);
							const isSelected = selectedKey === key;
							const start = format(new Date(slot.dateTimeStart), "HH:mm");
							const end = format(new Date(slot.dateTimeEnd), "HH:mm");
							return (
								<button
									className={`${styles["option"]} ${isSelected ? styles["checked"] : ""}`}
									key={key}
									onClick={() => setTimeSlot(isSelected ? null : slot)}
								>
									{start} - {end}
								</button>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
