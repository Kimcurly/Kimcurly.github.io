import React, { useState } from 'react';
import { useHeadSelectedDay, useSelectedDay } from '../../TodoContext';
import styled from 'styled-components';
import Modal from '../TodoList/Modal';

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

  const openModal = () => {
    setModalOpen(true);
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
    setHeadSelectedDay(day);
    setSelectedDay(day.format('YYYY-MM-DD'));
  };

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';
  let datekey = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
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
            {schedule
              // eslint-disable-next-line no-loop-func
              .filter((todo) => todo.date.selectedDay === datekey)
              .sort()
              .map((todo) => {
                return (
                  <>
                    <StyledSchedule
                      key={todo.id}
                      id={todo.id}
                      onClick={openModal}
                      done={todo.done}
                    >
                      {todo.text}
                    </StyledSchedule>
                    {modalopen && (
                      <Modal
                        modalopen={modalopen}
                        setModalOpen={setModalOpen}
                      />
                    )}
                  </>
                );
              })}
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
