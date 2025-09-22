"use client";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { LayoutContext } from "@/contexts/layout-context";
import { useContextHook } from "@/hooks/use-context-hook";

import styles from "@/styles/components/header.module.scss";

const MIN = 1;
const MAX = 6;

export default function Header() {
	const { state, setStep } = useContextHook(LayoutContext);

	const canGoBack = state.step > MIN && state.step < MAX;
	const canGoNext = state.step < MAX;

	const goBack = () => setStep(Math.max(MIN, state.step - 1));
	const goNext = () => setStep(Math.min(MAX, state.step + 1));

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
