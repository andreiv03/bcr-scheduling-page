import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { LayoutContext } from "@/contexts/layout-context";
import { useContextHook } from "@/hooks/use-context-hook";

import styles from "@/styles/components/header.module.scss";

const MIN = 1;
const MAX = 6;

export default function Header() {
	const { state, setStep } = useContextHook(LayoutContext);

	const canProceed = () => {
		switch (state.step) {
			case 1:
				return !!state.operation;
			case 2:
				return !!state.unit;
			case 3:
				return !!state.timeSlot;
			case 4:
				return !!(state.formData?.firstName && state.formData?.lastName && state.formData?.email);
			case 5:
				return true;
			default:
				return false;
		}
	};

	const canGoBack = state.step > MIN && state.step < MAX;
	const canGoNext = canProceed() && state.step < MAX;

	const goBack = () => setStep(Math.max(MIN, state.step - 1));
	const goNext = () => canProceed() && setStep(Math.min(MAX, state.step + 1));

	return (
		<header className={styles["header"]}>
			{canGoBack ? (
				<button className={styles["arrow"]} onClick={goBack}>
					<IoIosArrowBack />
					<span className={styles["text"]}>Înapoi</span>
				</button>
			) : null}

			<h2>Programare vizită la BCR</h2>

			{canGoNext ? (
				<button className={styles["arrow"]} onClick={goNext}>
					<span className={styles["text"]}>Înainte</span>
					<IoIosArrowForward />
				</button>
			) : null}
		</header>
	);
}
