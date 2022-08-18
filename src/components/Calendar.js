import React, { useState } from "react";
import { addMonths, subMonths } from "date-fns";
import RenderHeader from "./RenderHeader";
import RenderDays from "./RenderDays";
import RenderCells from "./RenderCells";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div className="calendar">
      <RenderHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <RenderDays />
      <RenderCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
};

export default Calendar;
