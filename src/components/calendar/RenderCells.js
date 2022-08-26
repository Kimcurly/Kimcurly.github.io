import React from 'react';
import { useHeadSelectedDay, useSelectedDay } from '../../TodoContext';

function RenderCells({ currentMonth, selectedDate, setSelectedDate }) {
  const monthStart = currentMonth.startOf('month');
  const monthEnd = monthStart.endOf('month');
  const startDate = monthStart.startOf('week');
  const endDate = monthEnd.endOf('week');
  const { setHeadSelectedDay } = useHeadSelectedDay();
  const { setSelectedDay } = useSelectedDay();

  const onDateClick = (day) => {
    setSelectedDate(day);
    setHeadSelectedDay(day);
    setSelectedDay(day.format('YYYY-MM-DD'));
  };

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = day.format('D');
      const cloneDay = day;
      days.push(
        <div className="col cell" key={day}>
          <div
            className={`${
              !day.isSame(monthStart, 'month')
                ? 'disabled'
                : !day.isSame(selectedDate, 'day')
                ? 'valid'
                : currentMonth.format('MM') !== day.format('MM')
                ? 'not valid'
                : 'selected'
            }`}
            onClick={() => onDateClick(cloneDay)}
          >
            {/* 날짜에 줄바꿈 넣고 맵 메소드로 개행을 넣은 텍스트를 배열로 렌더링한다. */}
            {formattedDate}
            <br />
          </div>
        </div>,
      );
      day = day.add(1, 'day');
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>,
    );
    days = [];
  }
  return (
    <>
      <div className="body">{rows}</div>
    </>
  );
}

export default RenderCells;
