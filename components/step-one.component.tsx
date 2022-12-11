import styles from "styles/components/step-one.module.scss";

const StepOne: React.FC<{
  reasons: [string[], React.Dispatch<React.SetStateAction<string[]>>];
}> = ({ reasons: [reasons, setReasons] }) => {
  
  const options = [
    "Depunere sau retragere de bani",
    "Operațiune fără numerar",
    "Credite și carduri de credit",
    "Economisire și investiții",
    "Pensie privată",
    "Asigurări și alte servicii"
  ];

  const handleOption = (option: string) => {
    if (reasons.includes(option)) setReasons((prevState) => prevState.filter((reason) => reason !== option));
    else setReasons((prevState) => [...prevState, option]);
  };

  return (
    <div className={styles["step_one"]}>
      <div className={styles["hero_section"]}>
        <h1>Despre ce vrei să vorbim?</h1>
        <p>Alege cel puțin un motiv pentru care programezi vizita în unitate.</p>
      </div>

      <div className={styles["options"]}>
        {options.map((option, index) => (
          <div key={index} className={`${styles["option"]} ${reasons.includes(option) ? styles["checked"] : ""}`} onClick={() => handleOption(option)}>
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepOne;
