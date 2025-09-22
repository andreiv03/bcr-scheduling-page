import { IoCheckmarkCircle } from "react-icons/io5";

import { LayoutContext } from "@/contexts/layout-context";
import { useContextHook } from "@/hooks/use-context-hook";

import styles from "@/styles/components/confirmation.module.scss";

export default function Confirmation() {
	const { resetAllStates } = useContextHook(LayoutContext);

	return (
		<div className={styles["confirmation"]}>
			<IoCheckmarkCircle />

			<div className={styles["hero_section"]}>
				<h1>Vizita în unitatea BCR a fost programată cu succes!</h1>
				<p>Urmează să primești pe adresa de email toate informațiile despre programarea ta.</p>
			</div>

			<button onClick={resetAllStates}>Înapoi la bcr.ro</button>
		</div>
	);
}
