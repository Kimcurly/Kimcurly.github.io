import React, { useState, useEffect } from 'react';
import { useHeadSelectedDay, useSelectedDay } from '../../TodoContext';
import styled from 'styled-components';
import Modal from '../TodoList/Modal';
import dayjs from 'dayjs';

const StyledSchedule = styled.div`
  width: 100%;
  margin-top: 1%;
  text-align: center;
  background: ${(props) => (props.done ? '#DCE2E8' : '#f6c2fe')};
  color: #fff;
  border-radius: 7px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`;

function RenderCells({ currentMonth, selectedDate, setSelectedDate }) {
  const monthStart = currentMonth.startOf('month');
  const monthEnd = monthStart.endOf('month');
  const startDate = monthStart.startOf('week');
  const endDate = monthEnd.endOf('week');

  const { setHeadSelectedDay } = useHeadSelectedDay();
  const { setSelectedDay } = useSelectedDay();
  const [modalopen, setModalOpen] = useState(false);
  const schedule = localStorage.getItem('newSchedules')
    ? JSON.parse(localStorage.getItem('newSchedules'))
    : [];
  const storageSelectedDate = localStorage.getItem('selectedDate')
    ? localStorage.getItem('selectedDate')
    : dayjs();
  const renderSchedules = schedule.sort().map((todo, index) => {
    const openModal = () => {
      setModalOpen(true);
    };
    return (
      <StyledSchedule
        key={index}
        id={todo.id}
        date={todo.date.selectedDay}
        onClick={openModal}
        done={todo.done}
      >
        {todo.text}
      </StyledSchedule>
    );
  });
  let datekey = '';

  useEffect(() => {
    mountedSelectedDate();
  }, []);

  const filterSchedules = (renderSchedules) => {
    if (renderSchedules.props.date === datekey) {
      return true;
    }
  };

  const mountedSelectedDate = () => {
    setSelectedDate(storageSelectedDate);
  };

  const updateSelectedDate = (day) => {
    setSelectedDate(day);
    localStorage.setItem('selectedDate', day);
  };

  const onDateClick = (day) => {
    updateSelectedDate(day);
    setHeadSelectedDay(day);
    setSelectedDay(day.format('YYYY-MM-DD'));
  };

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  console.log(renderSchedules);

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      formattedDate = day.format('D');
      datekey = day.format('YYYY-MM-DD');
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
            <div
              className={`${
                !day.isSame(monthStart, 'month')
                  ? 'disabledDay'
                  : !day.isSame(selectedDate, 'day')
                  ? 'valid'
                  : currentMonth.format('MM') !== day.format('MM')
                  ? 'not valid'
                  : 'selectedDay'
              }`}
            >
              {formattedDate}
            </div>
            {renderSchedules.filter(filterSchedules)}
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
      {modalopen && (
        <Modal
          modalopen={modalopen}
          setModalOpen={setModalOpen}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      )}
    </>
  );
}

export default RenderCells;
