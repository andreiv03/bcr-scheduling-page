import styles from "styles/components/step-2.module.scss";

const Step2: React.FC = () => {
  return (
    <main className={styles["title-message"]}>
      <p className={styles["step-2"]}>Pasul 2 - Alege unitatea BCR</p>
      <div className={styles["step-bar"]} />
    </main>
  );
};

export default Step2;
