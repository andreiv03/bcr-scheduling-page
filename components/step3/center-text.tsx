import styles from "styles/components/center-text.module.scss";

const CenterTextStep3: React.FC = () => {
  return (
    <main className={styles["title-message"]}>
      <p className={styles["header-step3"]}>In ce zi ne viziti?</p>
      <p className={styles["header-description-step3"]}>
      Alege data si intervalul orar pentru 
vizita la "{"backend"}".
      </p>
    </main>
  );
};

export default CenterTextStep3;
