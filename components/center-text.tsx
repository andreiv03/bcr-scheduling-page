import styles from "styles/components/center-text.module.scss";

const CenterText: React.FC = () => {
  return (
    <main className={styles["title-message"]}>
      <p className={styles["header"]}>În ce locație ne vizitezi?</p>
      <p className={styles["header-description"]}>
        Caută unitatea BCR unde programezi vizita sau permite accesul la
        localizare și alege o unitate de lângă tine.
      </p>
    </main>
  );
};

export default CenterText;
