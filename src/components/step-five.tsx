import { IoIosArrowForward } from "react-icons/io";
import { format } from "date-fns";

import { LayoutContext } from "@/contexts/layout-context";
import { useContextHook } from "@/hooks/use-context-hook";

import styles from "@/styles/components/step-five.module.scss";

export default function StepFive() {
	const { state, setStep } = useContextHook(LayoutContext);

	return (
		<div className={styles["step_five"]}>
			<div className={styles["hero_section"]}>
				<h1>Sumarul programării</h1>
				<p>Confirmă dacă datele sunt corecte sau apasă pentru a modifica</p>
			</div>

			<div className={styles["summary"]}>
				<div className={styles["item"]} onClick={() => setStep(1)}>
					<div className={styles["column"]}>
						<h3>Scopul întâlnirii</h3>
						<h4>{state.operation?.type}</h4>
					</div>
					<IoIosArrowForward />
				</div>

				<div className={styles["item"]} onClick={() => setStep(2)}>
					<div className={styles["column"]}>
						<h3>Unitate</h3>
						<h2>{state.unit?.brn}</h2>
						<h4>{state.unit?.br_street}</h4>
					</div>
					<IoIosArrowForward />
				</div>

				<div className={styles["item"]} onClick={() => setStep(3)}>
					<div className={styles["column"]}>
						<h3>Data și ora</h3>
						<h4>{format(new Date(), "PP")}</h4>
						<h4>
							{format(new Date(state.timeSlot?.dateTimeStart || ""), "HH:mm")} -{" "}
							{format(new Date(state.timeSlot?.dateTimeEnd || ""), "HH:mm")}
						</h4>
					</div>
					<IoIosArrowForward />
				</div>

				<div className={styles["item"]} onClick={() => setStep(4)}>
					<div className={styles["column"]}>
						<h3>Nume complet</h3>
						<h4>{`${state.formData.lastName} ${state.formData.firstName}`}</h4>
					</div>
					<IoIosArrowForward />
				</div>

				<div className={styles["item"]} onClick={() => setStep(4)}>
					<div className={styles["column"]}>
						<h3>Date de contact</h3>
						<h4>{state.formData.email}</h4>
					</div>
					<IoIosArrowForward />
				</div>
			</div>
		</div>
	);
}
