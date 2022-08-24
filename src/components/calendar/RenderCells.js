import React from "react";

function RenderCells({ currentMonth, selectedDate, setSelectedDate }) {
  const monthStart = currentMonth.startOf("month");
  const monthEnd = monthStart.endOf("month");
  const startDate = monthStart.startOf("week");
  const endDate = monthEnd.endOf("week");

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = day.format("DD");
      const cloneDay = day;
      days.push(
        <div
          className={`col cell ${
            !day.isSame(monthStart, "month")
              ? "disabled"
              : !day.isSame(selectedDate, "day")
              ? "valid"
              : currentMonth.format("MM") !== day.format("MM")
              ? "not valid"
              : "selected"
          }`}
          key={day}
          onClick={() => onDateClick(cloneDay)}
        >
          <span
            className={
              currentMonth.format("MM") !== day.format("MM")
                ? "text not valid"
                : ""
            }
          >
            {formattedDate}
          </span>
        </div>
      );
      day = day.add(1, "day");
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
