import React, { useState } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import RenderHeader from './RenderHeader';
import RenderDays from './RenderDays';
import RenderCells from './RenderCells';
import { Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

const StyledFab = styled(Fab)`
  z-index: 10;
  position: absolute;
  background-color: #b3ecfe;
  left: 95vw;
  bottom: 3vh;
`;

const StyledEdit = styled(EditIcon)`
  color: white;
`;

const date = dayjs();
const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(date);
  const [selectedDate, setSelectedDate] = useState(date);
  const navigate = useNavigate();

  const prevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  return (
    <>
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
      <StyledFab aria-label="edit" onClick={() => navigate('/addschedules')}>
        <StyledEdit />
      </StyledFab>
    </>
  );
};

export default Calendar;
