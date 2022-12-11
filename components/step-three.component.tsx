import { format } from "date-fns";
import type { Unit } from "interfaces/units";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import styles from "styles/components/step-three.module.scss";
import axios from "utils/axios";

export interface TimeSlot {
  dateTimeStart: Date;
  dateTimeEnd: Date;
}

const StepThree: React.FC<{
  selectedUnit: Unit;
  selectedTime: [TimeSlot, React.Dispatch<React.SetStateAction<TimeSlot>>];
}> = ({ selectedUnit, selectedTime: [selectedTime, setSelectedTime] }) => {
  const [date, setDate] = useState<Date | undefined>();
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    const getTimeSlots = async () => {
      try {
        if (!date) return;
        const { data } = await axios.get(`/units/${selectedUnit.branchId}`);
        setTimeSlots(data);
      } catch (error: any) {
        return alert(error.response.data.message);
      }
    };

    getTimeSlots();
  }, [date, selectedUnit.branchId]);

  return (
    <div className={styles["step_three"]}>
      <div className={styles["hero_section"]}>
        <h1>În ce zi ne vizitezi?</h1>
        <p>Alege data și intervalul orar pentru vizita la {selectedUnit.brn}</p>
      </div>

      <div
        className={`${styles["calendar"]} ${
          isCalendarVisible ? styles["visible"] : ""
        }`}
      >
        <DayPicker
          disabled={[{ before: new Date() }, { dayOfWeek: [0, 6] }]}
          mode="single"
          onSelect={(date) => {
            setDate(date), setIsCalendarVisible(false);
          }}
          required
          selected={date}
          showOutsideDays
        />
      </div>

      <div
        className={`${styles["overlay"]} ${
          isCalendarVisible ? styles["visible"] : ""
        }`}
        onClick={() => setIsCalendarVisible(false)}
      />

      <div className={styles["row"]}>
        <h3>Alege data</h3>
        <div
          className={styles["option"]}
          onClick={() => setIsCalendarVisible(true)}
        >
          {date ? format(date, "PP") : "Alege data"}
        </div>
      </div>

      <div className={styles["row"]}>
        <h3>Alege intervalul de timp</h3>
        {timeSlots && timeSlots.length ? (
          timeSlots.map((timeSlot, index) => (
            <div
              key={index}
              className={`${styles["option"]} ${
                selectedTime === timeSlot ? styles["checked"] : ""
              }`}
              onClick={() => setSelectedTime(timeSlot)}
            >
              {format(new Date(timeSlot.dateTimeStart), "HH:mm")} -{" "}
              {format(new Date(timeSlot.dateTimeEnd), "HH:mm")}
            </div>
          ))
        ) : (
          <span>Niciun interval de timp disponibil</span>
        )}
      </div>
    </div>
  );
};

export default StepThree;
