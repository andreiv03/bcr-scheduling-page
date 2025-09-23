"use client";

import { useEffect, useMemo, useState } from "react";
import { DayPicker, UI } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, isSameDay } from "date-fns";
import { ro } from "date-fns/locale";

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
		if (!date) {
			return;
		}

		(async () => {
			try {
				setLoading(true);
				setError(null);

				const queries = new URLSearchParams({
					operationId: state.operation?.id.toString() || "1",
					branchId: state.unit?.branchId || "",
					date: format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS"),
				});

				const { data } = await axios.get<{ timeSlots: TimeSlot[] }>(
					`/api/time-slots?${queries.toString()}`,
				);

				setTimeSlots(Array.isArray(data.timeSlots) ? data.timeSlots : []);

				if (date && data.timeSlots.length > 0) {
					const first = new Date(data.timeSlots?.[0]?.dateTimeStart ?? "");
					if (!isSameDay(first, date)) {
						setTimeSlots([]);
					}
				}
			} catch {
				setError("A apărut o eroare la încărcarea intervalelor.");
				setTimeSlots([]);
			} finally {
				setLoading(false);
			}
		})();
	}, [date, state.operation?.id, state.unit?.branchId]);

	const dateLabel = useMemo(() => (date ? format(date, "PP") : "Alege data"), [date]);

	return (
		<div className={styles["step_three"]}>
			<div className={styles["hero_section"]}>
				<h1>În ce zi ne vizitezi?</h1>
				<p>Alege data și intervalul orar pentru vizita la {state.unit?.brn}</p>
			</div>

			<div className={`${styles["calendar"]} ${isCalendarVisible ? styles["visible"] : ""}`}>
				<DayPicker
					classNames={{
						[UI.Chevron]: "rdp_chevron",
						[UI.Day]: "rdp_day",
					}}
					disabled={[{ before: new Date() }, { dayOfWeek: [0, 6] }]}
					locale={{ ...ro, options: { ...ro.options, weekStartsOn: 1 } }}
					mode="single"
					navLayout="around"
					onSelect={(date) => {
						setDate(date ?? undefined);
						setIsCalendarVisible(false);
						setTimeSlots([]);
						setTimeSlot(null);
					}}
					selected={date}
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
					<div className={styles["options"]}>
						{timeSlots.map((slot, index) => {
							const selected = state.timeSlot === slot;
							const start = format(new Date(slot.dateTimeStart), "HH:mm");
							const end = format(new Date(slot.dateTimeEnd), "HH:mm");

							return (
								<button
									className={`${styles["option"]} ${selected ? styles["checked"] : ""}`}
									key={index}
									onClick={() => setTimeSlot(selected ? null : slot)}
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
