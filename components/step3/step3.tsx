import styles from "styles/components/step-2.module.scss";

const Step3: React.FC = () => {
  return (
    <main className={styles["title-message"]}>
      <p className={styles["step-2"]}>Pasul 3 - Alege data și intervalul orar</p>
      <div className={styles["step-bar-3"]} />
    </main>
  );
};

export default Step3;
