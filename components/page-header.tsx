import styles from "styles/components/page-header.module.scss";
import { IoIosArrowBack } from "react-icons/io";

const PageHeader: React.FC = () => {
  return (
    <main className={styles["title-message"]}>
      <IoIosArrowBack className={styles["arrow-left-icon"]} />
      <h3 className={styles["test"]}>Programare vizită la BCR</h3>
    </main>
  );
};

export default PageHeader;
