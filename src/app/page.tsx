"use client";

import Image from "next/image";
import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { LayoutContext } from "@/contexts/layout-context";
import { useContextHook } from "@/hooks/use-context-hook";

import Confirmation from "@/components/confirmation";
import Header from "@/components/header";
import StepOne from "@/components/step-one";
import StepTwo from "@/components/step-two";
import StepThree from "@/components/step-three";
import StepFour from "@/components/step-four";
import StepFive from "@/components/step-five";
import styles from "@/styles/pages/home.module.scss";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const TOTAL_STEPS = 5;

const STEPS_LABEL: Record<Exclude<Step, 6>, string> = {
	1: "Alege scopul vizitei",
	2: "Alege unitatea BCR",
	3: "Alege data și intervalul orar",
	4: "Să ne cunoaștem",
	5: "Confirmă programarea",
};

export default function Home() {
	const { state } = useContextHook(LayoutContext);

	const stepLabel = (STEPS_LABEL as Record<number, string | undefined>)[state.step] ?? "";

	const progressPercentage = useMemo(() => {
		if (state.step > TOTAL_STEPS) {
			return 100;
		}

		return Math.round((state.step / TOTAL_STEPS) * 100);
	}, [state.step]);

	return (
		<div className={styles["page"]}>
			<Header />

			{state.step <= TOTAL_STEPS && (
				<div className={styles["step"]}>
					<span>
						Pasul {state.step} - {stepLabel}
					</span>
					<div className={styles["bar"]}>
						<div style={{ ["--progress"]: `${progressPercentage}%` } as React.CSSProperties} />
					</div>
				</div>
			)}

			<AnimatePresence mode="wait">
				<motion.div
					key={state.step}
					initial={{ opacity: 0, x: 40 }}
					animate={{ opacity: 1, x: 0, transition: { duration: 0.28 } }}
					exit={{ opacity: 0, x: -40, transition: { duration: 0.22 } }}
				>
					{state.step === 1 && <StepOne />}
					{state.step === 2 && <StepTwo />}
					{state.step === 3 && <StepThree />}
					{state.step === 4 && <StepFour />}
					{state.step === 5 && <StepFive />}
					{state.step === 6 && <Confirmation />}
				</motion.div>
			</AnimatePresence>

			<div className={styles["logo"]}>
				<Image alt="BCR Logo" src="/bcr-logo.png" width={61} height={22} priority />
			</div>
		</div>
	);
}
