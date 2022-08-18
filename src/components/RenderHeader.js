import React from "react";
import { Icon } from "@iconify/react";

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <div className="header row">
      <div className="col col-start">
        <span className="text">
          <span className="text month">{currentMonth.format("MM")}월</span>
          {currentMonth.format("YYYY")}
        </span>
      </div>
      <div className="col col-end">
        <Icon icon={"bi-arrow-left-circle-fill"} onClick={prevMonth} />
        <Icon icon={"bi-arrow-right-circle-fill"} onClick={nextMonth} />
      </div>
    </div>
  );
};

export default RenderHeader;
