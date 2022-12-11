import styles from "styles/components/options-step1.module.scss";

const OptionStep1: React.FC = () => {
    const tabs =["Depunere sau retragere de bani","Operațiune fără numerar","Credite și carduri de credit","Economisire și investiții","Pensie privată","Asigurări și alte servicii"]
  return (
    <main className={styles["title-message"]}>
        <div className={styles["padding"]}>
       <h3 className={styles["option"]}>{tabs[0]}</h3> 
       </div>
       <div className={styles["padding"]}>
       <h3 className={styles["option1"]}>{tabs[1]}</h3> 
       </div>
       <div className={styles["padding"]}>
       <h3 className={styles["option2"]}>{tabs[2]}</h3> 
       </div>
       <div className={styles["padding"]}>
       <h3 className={styles["option3"]}>{tabs[3]}</h3> 
       </div>
       <div className={styles["padding"]}>
       <h3 className={styles["option4"]}>{tabs[4]}</h3> 
       </div>
       <div className={styles["padding"]}>
       <h3 className={styles["option5"]}>{tabs[5]}</h3> 
       </div>
       <button type="submit" className={styles["smart-button"]}>Continuă</button>
    </main>
  );
};

export default OptionStep1;
