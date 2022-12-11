import { useState } from "react";

import type { Unit } from "interfaces/units";

import styles from "styles/pages/home.module.scss";
import Header from "components/header.component";
import StepTwo from "components/step-two.component";
import { AnimatePresence, motion } from "framer-motion";

const Home = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [selectedUnit, setSelectedUnit] = useState<Unit>({} as Unit);

  const getMessage = () => {
    if (currentStep == 1) return "Alege scopul vizitei";
    if (currentStep == 2) return "Alege unitatea BCR";
    if (currentStep == 3) return "Alege data și intervalul orar";
    if (currentStep == 4) return "Să ne cunoaștem";
    if (currentStep == 5) return "Confirmă programarea";
  }

  return (
    <div className={styles["page"]}>
      <Header
        decrementStep={() =>
          setCurrentStep((prevState) => (prevState > 1 ? prevState - 1 : 1))
        }
      />
      <div className={styles["step"]}>
        <span>Pasul {currentStep} - {getMessage()}</span>
        <div className={styles["bar"]}>
          <div style={{ width: currentStep == 1 ? "20%" : currentStep == 2 ? "40%" : currentStep == 3 ? "60%" : currentStep == 4 ? "80%" : "100%" }} />
        </div>
      </div>

      <AnimatePresence>
        {currentStep == 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            
          </motion.div>
        )}

        {currentStep == 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <StepTwo onChangeUnit={(unit: Unit) => setSelectedUnit(unit)} />
          </motion.div>
        )}

        {currentStep == 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            
          </motion.div>
        )}

        {currentStep == 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            
          </motion.div>
        )}

        {currentStep == 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
