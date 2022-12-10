import styles from "styles/components/search-bar.module.scss";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
const SearchBar: React.FC = () => {
  const [value, setValue] = useState("");
  const [position,setPosition] = useState(false);
  function show(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(value);
    setValue(e!.target!.value);
    setPosition(true);
    console.log(position)
  }
  return (
    <main className={styles["title-message"]}>
     <p className={styles["search-bar"]}>Caută unitatea:</p> 
     { position ?<div className={styles["input-bar"]}>
        <input
          className={styles["input-type"]}
          placeholder="Nume unitate / Adresa / Zona"
          type="text"
          value={value}
          onChange={show}
        />
      </div> :<div className={styles["input-bar"]}>
        <input
          className={styles["input-type"]}
          placeholder="Nume unitate / Adresa / Zona"
          type="text"
          value={value}
          onChange={show}
        />
      </div>}
<AiOutlineSearch className={styles["search-loop"]}/>
    </main>
  );
};

export default SearchBar;
