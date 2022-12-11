import styles from "styles/components/confirmation.module.scss";

const Checkmark = () => {
  return (
    <svg
      width="251"
      height="251"
      viewBox="0 0 251 251"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M125.5 251C56.1883 251 0 194.812 0 125.5C0 56.1883 56.1883 0 125.5 0C194.812 0 251 56.1883 251 125.5C251 194.812 194.812 251 125.5 251Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M180.224 77.3816C182.564 74.5881 186.756 74.1954 189.587 76.5045C192.417 78.8136 192.815 82.9501 190.475 85.7437L113.52 177.618C111.031 180.591 106.493 180.814 103.716 178.101L60.9715 136.342C58.3615 133.792 58.3402 129.637 60.9241 127.062C63.5079 124.486 67.7184 124.465 70.3285 127.015L107.904 163.723L180.224 77.3816Z"
        fill="#376AE2"
      />
    </svg>
  );
};

const Confirmation: React.FC<{
  resetAllStates: () => void;
}> = ({ resetAllStates }) => {
  return (
    <div className={styles["confirmation"]}>
      <Checkmark />

      <div className={styles["hero_section"]}>
        <h1>Vizita în unitatea BCR a fost programată cu succes!</h1>
        <p>
          Urmează să primești pe adresa de email toate informațiile despre
          programarea ta.
        </p>
      </div>

      <button onClick={resetAllStates}>Înapoi la bcr.ro</button>
    </div>
  );
};

export default Confirmation;
