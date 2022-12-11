import styles from "styles/components/search-bar.module.scss";
import React, { useState } from "react";
import { AiTwotoneCalendar } from "react-icons/ai";
const SearchBarStep3: React.FC = () => {
  const [value, setValue] = useState("");
  const [position,setPosition] = useState(false);
  function show(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(value);
    setValue(e!.target!.value);
    console.log(position)
  }
  return (
    <main className={styles["title-message"]} >
      <p className={styles["search-bar-step3"]}>Alege data</p> 
      <div className={styles["input-bar-step3"]}>
         <input
          className={styles["input-type-step3"]}
          placeholder="ZZLLAA"
          type="text"
          value={value}
          onChange={show}
          onClick={() => setPosition(true)}
        />
      </div>
      <AiTwotoneCalendar className={styles["search-loop-step3"]}/></main>
  );
};

export default SearchBarStep3;
