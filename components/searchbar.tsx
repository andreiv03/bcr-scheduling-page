import styles from "styles/components/search-bar.module.scss";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
const SearchBar: React.FC = () => {
  const [value, setValue] = useState("");
  const [position,setPosition] = useState(false);
  function show(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(value);
    setValue(e!.target!.value);
    console.log(position)
  }
  return (
    <main className={styles["title-message"]} >
      <p className={position ? styles["search-bar-moved"]:styles["search-bar"]}>Caută unitatea:</p> 
      <div className={position ? styles["input-bar-moved"] : styles["input-bar"]}>
         <input
          className={styles["input-type-mpve"]}
          placeholder="Nume unitate / Adresa / Zona"
          type="text"
          value={value}
          onChange={show}
          onClick={() => setPosition(true)}
        />
      </div>
      <AiOutlineSearch className={position ? styles["search-loop-moved"] : styles["search-loop"]}/></main>
  );
};

export default SearchBar;
