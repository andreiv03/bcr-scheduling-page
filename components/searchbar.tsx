import styles from "styles/components/search-bar.module.scss";
import React, { useState } from "react";
const SearchBar: React.FC = () => {
  const [value, setValue] = useState("");
  function show(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(value);
    setValue(e!.target!.value);
  }
  return (
    <main className={styles["title-message"]}>
      <p className={styles["search-bar"]}>Caută unitatea:</p>
      <div className={styles["input-bar"]}>
        {" "}
        <input
          className={styles["input-type"]}
          placeholder="Nume unitate / Adresa / Zona"
          type="text"
          value={value}
          onChange={show}
        />
      </div>
    </main>
  );
};

export default SearchBar;
