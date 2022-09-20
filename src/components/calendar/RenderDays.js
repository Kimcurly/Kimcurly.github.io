import React from 'react';
import clsx from 'clsx';

const RenderDays = () => {
  const days = [];
  const date = ['일', '월', '화', '수', '목', '금', '토'];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div
        className={clsx('col', {
          redDay: i === 0,
          blueDay: i === 6,
        })}
        key={i}
      >
        {date[i]}
      </div>,
    );
  }
  return (
    <>
      <div className="days row">{days}</div>
      <hr></hr>
    </>
  );
};

export default RenderDays;
