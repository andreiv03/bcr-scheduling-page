import type { Unit } from "interfaces/units";
import type { FormData } from "pages/index";
import { IoIosArrowForward } from "react-icons/io";

import styles from "styles/components/step-five.module.scss";

const StepFive: React.FC<{
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  reasons: string[];
  selectedUnit: Unit;
  formData: FormData;
}> = ({ setCurrentStep, reasons, selectedUnit, formData }) => {
  return (
    <div className={styles["step_five"]}>
      <div className={styles["hero_section"]}>
        <h1>Sumarul programării</h1>
        <p>Confirmă dacă datele sunt corecte sau apasă pentru a modifica:</p>
      </div>

      <div className={styles["summary"]}>
        <div className={styles["item"]} onClick={() => setCurrentStep(1)}>
          <div className={styles["column"]}>
            <h3>Scopul întâlnirii</h3>
            <h4>{reasons.join(", ")}</h4>
          </div>
          <IoIosArrowForward />
        </div>

        <div className={styles["item"]} onClick={() => setCurrentStep(2)}>
          <div className={styles["column"]}>
            <h3>Unitate</h3>
            <h2>{selectedUnit.brn}</h2>
            <h4>{selectedUnit.br_street}</h4>
          </div>
          <IoIosArrowForward />
        </div>

        <div className={styles["item"]} onClick={() => setCurrentStep(3)}>
          <div className={styles["column"]}>
            <h3>Data și ora</h3>
            <h4>test</h4>
          </div>
          <IoIosArrowForward />
        </div>

        <div className={styles["item"]} onClick={() => setCurrentStep(4)}>
          <div className={styles["column"]}>
            <h3>Nume complet</h3>
            <h4>{`${formData.lastName} ${formData.firstName}`}</h4>
          </div>
          <IoIosArrowForward />
        </div>

        <div className={styles["item"]} onClick={() => setCurrentStep(4)}>
          <div className={styles["column"]}>
            <h3>Date de contact</h3>
            <h4>{formData.email}</h4>
          </div>
          <IoIosArrowForward />
        </div>
      </div>
    </div>
  );
};

export default StepFive;
