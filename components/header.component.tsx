import { IoIosArrowBack } from "react-icons/io";
import styles from "styles/components/header.module.scss";

const Header: React.FC<{ decrementStep: () => void }> = ({ decrementStep }) => {
  return (
    <header className={styles["header"]}>
      <IoIosArrowBack onClick={decrementStep} />
      <h2>Programare vizită la BCR</h2>
    </header>
  );
};

export default Header;
