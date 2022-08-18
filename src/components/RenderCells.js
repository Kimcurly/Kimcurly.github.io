import React from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  format,
} from "date-fns";
import { isSameMonth, isSameDay, addDays } from "date-fns";

function RenderCells({ currentMonth, selectedDate, setSelectedDate }) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const onDateClick = (day) => {
    setSelectedDate(day);
    console.log(day);
  };

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;
      days.push(
        <div
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : !isSameDay(day, selectedDate)
              ? "valid"
              : format(currentMonth, "M") !== format(day, "M")
              ? "not valid"
              : "selected"
          }`}
          key={day}
          onClick={() => onDateClick(cloneDay)}
        >
          <span
            className={
              format(currentMonth, "M") !== format(day, "M")
                ? "text not valid"
                : ""
            }
          >
            {formattedDate}
          </span>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className="body">{rows}</div>;
}

export default RenderCells;
