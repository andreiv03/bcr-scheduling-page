import type { FormData } from "pages/index";
import styles from "styles/components/step-four.module.scss";

const StepFour: React.FC<{
  formData: [FormData, React.Dispatch<React.SetStateAction<FormData>>];
}> = ({ formData: [formData, setFormData] }) => {
  return (
    <div className={styles["step_four"]}>
      <div className={styles["hero_section"]}>
        <h1>Haide să facem cunoștință!</h1>
        <p>Introdu numele de familie, prenumele și adresa de email.</p>
      </div>

      <form>
        <div className={styles["input_container"]}>
          <label htmlFor="lastName">Numele de familie</label>
          <input
            id="lastName"
            onChange={(event) =>
              setFormData((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value,
              }))
            }
            name="lastName"
            type="text"
            value={formData.lastName}
          />
        </div>

        <div className={styles["input_container"]}>
          <label htmlFor="firstName">Prenumele</label>
          <input
            id="firstName"
            onChange={(event) =>
              setFormData((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value,
              }))
            }
            name="firstName"
            type="text"
            value={formData.firstName}
          />
        </div>

        <div className={styles["input_container"]}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            onChange={(event) =>
              setFormData((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value,
              }))
            }
            name="email"
            type="text"
            value={formData.email}
          />
        </div>
      </form>
    </div>
  );
};

export default StepFour;
