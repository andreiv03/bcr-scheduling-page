import { useState } from "react";

import type { Unit } from "interfaces/units";

import styles from "styles/pages/home.module.scss";
import Header from "components/header.component";
import StepTwo from "components/step-two.component";

const Home = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [selectedUnit, setSelectedUnit] = useState<Unit>({} as Unit);

  return (
    <div className={styles["page"]}>
      <Header
        decrementStep={() =>
          setCurrentStep((prevState) => (prevState > 1 ? prevState - 1 : 1))
        }
      />
      {currentStep == 2 && (
        <StepTwo onChangeUnit={(unit: Unit) => setSelectedUnit(unit)} />
      )}
    </div>
  );
};

export default Home;
