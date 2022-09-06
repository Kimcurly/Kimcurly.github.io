import React from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

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
        <NavigateBeforeIcon onClick={prevMonth} />
        <div className="space"></div>
        <NavigateNextIcon onClick={nextMonth} />
      </div>
    </div>
  );
};

export default RenderHeader;
