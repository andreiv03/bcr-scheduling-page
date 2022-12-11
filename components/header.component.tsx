import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "styles/components/header.module.scss";

const Header: React.FC<{
  currentStep: number;
  decrementStep: () => void;
  incrementStep: () => void;
}> = ({ currentStep, decrementStep, incrementStep }) => {
  return (
    <header className={styles["header"]}>
      {currentStep > 1 && currentStep < 6 && (
        <div
          className={`${styles["arrow"]} ${
            currentStep == 1 ? styles["greyed"] : ""
          }`}
          onClick={decrementStep}
        >
          <IoIosArrowBack />
          <span className={styles["text"]}>Înapoi</span>
        </div>
      )}
      <h2>Programare vizită la BCR</h2>
      {currentStep < 6 && (
        <div
          className={`${styles["arrow"]} ${
            currentStep == 6 ? styles["greyed"] : ""
          }`}
          onClick={incrementStep}
        >
          <span className={styles["text"]}>Înainte</span>
          <IoIosArrowForward />
        </div>
      )}
    </header>
  );
};

export default Header;
