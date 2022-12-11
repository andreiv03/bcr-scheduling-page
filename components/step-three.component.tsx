import styles from "styles/components/step-five.module.scss";

const StepThree: React.FC<{

}> = ({  }) => {
  return (
    <div className={styles["step_five"]}>
      <div className={styles["hero_section"]}>
        <h1>În ce zi ne vizitezi?</h1>
        <p>Alege data și intervalul orar pentru vizita la BCR Ștefan cel Mare.</p>
      </div>

    </div>
  );
};

export default StepThree;
