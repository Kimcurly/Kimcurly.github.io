import React from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <div className="header row">
      <div className="col col-start">
        <span className="text">
          <div className="text month">{currentMonth.format('MM')}월</div>
          {currentMonth.format('YYYY')}
        </span>
      </div>
      <div className="col col-end">
        <MdArrowBackIos onClick={prevMonth} />
        <div className="space"></div>
        <MdArrowForwardIos onClick={nextMonth} />
      </div>
    </div>
  );
};

export default RenderHeader;
