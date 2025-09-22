import { LayoutContext } from "@/contexts/layout-context";
import { useContextHook } from "@/hooks/use-context-hook";

import styles from "@/styles/components/step-four.module.scss";

export default function StepFour() {
	const { state, setFormData } = useContextHook(LayoutContext);

	return (
		<div className={styles["step_four"]}>
			<div className={styles["hero_section"]}>
				<h1>Haide să facem cunoștință!</h1>
				<p>Introdu numele de familie, prenumele și adresa de email.</p>
			</div>

			<form>
				<div className={styles["input_container"]}>
					<label htmlFor="lastName">Numele de familie</label>
					<input
						id="lastName"
						name="lastName"
						onChange={(event) => setFormData(event.target.name, event.target.value)}
						type="text"
						value={state.formData.lastName}
					/>
				</div>

				<div className={styles["input_container"]}>
					<label htmlFor="firstName">Prenumele</label>
					<input
						id="firstName"
						name="firstName"
						onChange={(event) => setFormData(event.target.name, event.target.value)}
						type="text"
						value={state.formData.firstName}
					/>
				</div>

				<div className={styles["input_container"]}>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						name="email"
						onChange={(event) => setFormData(event.target.name, event.target.value)}
						type="email"
						value={state.formData.email}
					/>
				</div>
			</form>
		</div>
	);
}
