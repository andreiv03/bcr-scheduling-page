"use client";

import { useEffect, useState } from "react";

import axios from "@/config/axios";
import { LayoutContext } from "@/contexts/layout-context";
import { useContextHook } from "@/hooks/use-context-hook";
import type { Operation } from "@/types/operation";

import styles from "@/styles/components/step-one.module.scss";

export default function StepOne() {
	const { state, setOperation } = useContextHook(LayoutContext);

	const [operations, setOperations] = useState<Operation[]>([]);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (operations.length > 0) {
			return;
		}

		(async () => {
			try {
				setLoading(true);
				setError(null);

				const { data } = await axios.get<{ operations: Operation[] }>("/api/operations");
				setOperations(Array.isArray(data.operations) ? data.operations : []);
			} catch {
				setError("A apărut o eroare la încărcarea operațiunilor.");
				setOperations([]);
			} finally {
				setLoading(false);
			}
		})();
	}, [operations.length]);

	return (
		<div className={styles["step_one"]}>
			<div className={styles["hero_section"]}>
				<h1>Despre ce vrei să vorbim?</h1>
				<p>Alege un motiv pentru care programezi vizita în unitate.</p>
			</div>

			{loading && <div className={styles["status"]}>Se încarcă operațiunile...</div>}
			{error && !loading && <div className={styles["error"]}>{error}</div>}

			{!loading && !error && operations.length > 0 && (
				<div className={styles["operations"]}>
					{operations.map((operation) => (
						<div
							className={`${styles["operation"]} ${
								state.operation?.id === operation.id ? styles["checked"] : ""
							}`}
							key={operation.id}
							onClick={() => setOperation(operation)}
						>
							{operation.type}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
