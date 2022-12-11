import { useEffect, useRef, useState } from "react";
import { MdLocationPin } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

import type { Unit } from "interfaces/units";
import axios from "utils/axios";

import styles from "styles/components/step-two.module.scss";
import Mapbox from "components/mapbox.component";

const UnitOption: React.FC<{
  onChangeUnit: (unit: Unit) => void;
  unit: Unit;
}> = ({ onChangeUnit, unit }) => {
  return (
    <div
      className={styles["unit"]}
      key={uuidv4()}
      onClick={() => onChangeUnit(unit)}
    >
      <div className={styles["content"]}>
        <div className={styles["top_section"]}>
          <h3>{unit.brn}</h3>
          <h5>{unit.distance} km</h5>
        </div>

        <p>{unit.br_street}</p>

        <div className={styles["bottom_section"]}>
          {unit.mfm_euro_all_day && <h4>Self-service 24/7</h4>}
          {unit.appointmentsSchedule.isCashless && <h4>Fără casiere</h4>}
        </div>
      </div>
    </div>
  );
};

const StepTwo: React.FC<{
  onChangeUnit: (unit: Unit) => void;
}> = ({ onChangeUnit }) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isHeroSectionHidden, setIsHeroSectionHidden] = useState(false);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const [seeMore, setSeeMore] = useState(false);

  const heroSectionRef = useRef({} as HTMLDivElement);

  const [search, setSearch] = useState("");
  const [units, setUnits] = useState<Unit[]>([]);
  const [unitsByGeolocation, setUnitsByGeolocation] = useState<Unit[]>([]);

  const [isMapVisible, setIsMapVisible] = useState(false);

  useEffect(() => {
    const getUnits = async () => {
      try {
        if (units.length) return;
        const { data } = await axios.get("/units");
        setUnits(data.units);
        setUnitsByGeolocation(data.unitsByGeolocation);
      } catch (error: any) {
        return alert(error.response.data.message);
      }
    };

    getUnits();
  }, [units.length]);

  const handleFirstAnimation = () => {
    setIsInputFocused(true);
    setTimeout(() => {
      setIsHeroSectionHidden(true);
      setTimeout(() => setIsAnimationFinished(true), 400);
    }, 400);
  };

  const filterBySearch = () => {
    return units.filter((unit) => {
      if (unit.br_street.toLowerCase().includes(search.toLowerCase()))
        return true;
      if (unit.brn.toLowerCase().includes(search.toLowerCase())) return true;
      return false;
    });
  };

  return (
    <div
      className={`${styles["step_two"]} `}
      style={{
        marginTop: isHeroSectionHidden
          ? -heroSectionRef.current.offsetHeight
          : 0,
      }}
    >
      <div
        className={`${styles["hero_section"]} ${
          isHeroSectionHidden ? styles["hidden"] : ""
        }`}
        ref={heroSectionRef}
      >
        <h1>În ce locație ne vizitezi?</h1>
        <p>
          Caută unitatea BCR unde programezi vizita sau permite accesul la
          localizare și alege o unitate de lângă tine.
        </p>
      </div>
      <div className={styles["input_container"]}>
        <label htmlFor="input">Caută unitatea</label>
        <input
          className={isInputFocused ? styles["shrinked"] : ""}
          id="input"
          onChange={(event) => setSearch(event.target.value)}
          onFocus={handleFirstAnimation}
          placeholder={"Nume unitate / Adresă / Zonă"}
          type="text"
          value={search}
        />
      </div>

      {isAnimationFinished && (
        <div className={`${styles["units"]}`}>
          <div className={styles["content"]}>
            {search.length >= 3 && units.length
              ? filterBySearch()
                  .slice(0, seeMore ? filterBySearch().length : 2)
                  .map((unit) => (
                    <UnitOption
                      key={uuidv4()}
                      onChangeUnit={onChangeUnit}
                      unit={unit}
                    />
                  ))
              : null}

            {search.length < 3 && unitsByGeolocation.length
              ? unitsByGeolocation
                  .slice(0, seeMore ? unitsByGeolocation.length : 2)
                  .map((unit) => (
                    <UnitOption
                      key={uuidv4()}
                      onChangeUnit={onChangeUnit}
                      unit={unit}
                    />
                  ))
              : null}
          </div>

          {(search.length >= 3 && filterBySearch().length) || unitsByGeolocation.length ? (
            <button>
              <span onClick={() => setIsMapVisible(true)}>Alege de pe hartă</span>
              <MdLocationPin />
            </button>
          ) : null}

          {!seeMore && search.length >= 3 && filterBySearch().length > 2 ? (
            <span
              className={styles["see_more"]}
              onClick={() => setSeeMore(true)}
            >
              Afișează toate rezultatele (+{filterBySearch().length - 2})
            </span>
          ) : null}

          {!seeMore && search.length < 3 && unitsByGeolocation.length > 2 ? (
            <span
              className={styles["see_more"]}
              onClick={() => setSeeMore(true)}
            >
              Afișează toate rezultatele (+{unitsByGeolocation.length - 2})
            </span>
          ) : null}
        </div>
      )}

      {isMapVisible && <Mapbox isMapVisible={[isMapVisible, setIsMapVisible]} unitsByGeolocation={unitsByGeolocation} />}
    </div>
  );
};

export default StepTwo;
