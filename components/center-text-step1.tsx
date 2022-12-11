import styles from "styles/components/center-text.module.scss";

const CenterTextStep1: React.FC = () => {
  return (
    <main className={styles["title-message"]}>
      <p className={styles["header-step1"]}>Despre ce vrei să vorbim?</p>
      <p className={styles["header-description-step1"]}>
      Alege cel puțin un motiv pentru care programezi vizita in unitate.
      </p>
    </main>
  );
};

export default CenterTextStep1;
