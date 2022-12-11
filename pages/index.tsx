import { useState } from "react";

import type { Unit } from "interfaces/units";

import styles from "styles/pages/home.module.scss";
import Header from "components/header.component";
import StepTwo from "components/step-two.component";
import { AnimatePresence, motion } from "framer-motion";
import StepOne from "components/step-one.component";
import StepFour from "components/step-four.component";
import StepFive from "components/step-five.component";
import StepThree from "components/step-three.component";

export interface FormData {
  email: string;
  firstName: string;
  lastName: string;
}

const formDataInitialState: FormData = {
  email: "",
  firstName: "",
  lastName: ""
};

const Home = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
  const [reasons, setReasons] = useState<string[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<Unit>({} as Unit);
  const [formData, setFormData] = useState(formDataInitialState);

  const decrementStep = () => setCurrentStep((prevState) => (prevState > 1 ? prevState - 1 : 1));
  const incrementStep = () => {
    if (currentStep == 1 && !reasons.length) return;
    if (currentStep == 2 && !Object.keys(selectedUnit).length) return;
    // if (currentStep == 3) return;
    if (currentStep == 4 && (!formData.firstName || !formData.lastName || !formData.email)) return;
    // if (currentStep == 5) return;
    setCurrentStep((prevState) => (prevState < 5) ? prevState + 1 : 5);
  }

  const getMessage = () => {
    if (currentStep == 1) return "Alege scopul vizitei";
    if (currentStep == 2) return "Alege unitatea BCR";
    if (currentStep == 3) return "Alege data și intervalul orar";
    if (currentStep == 4) return "Să ne cunoaștem";
    if (currentStep == 5) return "Confirmă programarea";
    return "";
  };

  return (
    <div className={styles["page"]}>
      <Header decrementStep={decrementStep} incrementStep={incrementStep} />

      <div className={styles["step"]}>
        <span>Pasul {currentStep} - {getMessage()}</span>
        <div className={styles["bar"]}>
          <div style={{ width: currentStep == 1 ? "20%" : currentStep == 2 ? "40%" : currentStep == 3 ? "60%" : currentStep == 4 ? "80%" : "100%" }} />
        </div>
      </div>

      <AnimatePresence>
        {currentStep == 1 && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.3 } }}
            exit={{ opacity: 0, x: 100, transition: { duration: 0.3 } }}
          >
            <StepOne reasons={[reasons, setReasons]} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentStep == 2 && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.3 } }}
            exit={{ opacity: 0, x: 100, transition: { duration: 0.3 } }}
          >
            <StepTwo incrementStep={incrementStep} onChangeUnit={(unit: Unit) => setSelectedUnit(unit)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentStep == 3 && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.3 } }}
            exit={{ opacity: 0, x: 100, transition: { duration: 0.3 } }}
          >
            <StepThree />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentStep == 4 && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.3 } }}
            exit={{ opacity: 0, x: 100, transition: { duration: 0.3 } }}
          >
            <StepFour formData={[formData, setFormData]} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentStep == 5 && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.3 } }}
            exit={{ opacity: 0, x: 100, transition: { duration: 0.3 } }}
          >
            <StepFive setCurrentStep={setCurrentStep} reasons={reasons} selectedUnit={selectedUnit} formData={formData} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
