import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "styles/components/header.module.scss";

const Header: React.FC<{
  decrementStep: () => void;
  incrementStep: () => void;
}> = ({ decrementStep, incrementStep }) => {
  return (
    <header className={styles["header"]}>
      <IoIosArrowBack onClick={decrementStep} />
      <h2>Programare vizită la BCR</h2>
      <IoIosArrowForward onClick={incrementStep} />
    </header>
  );
};

export default Header;
