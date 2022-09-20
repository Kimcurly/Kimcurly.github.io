import React from 'react';
import styled from 'styled-components';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useHeadSelectedDay, useSelectedDay } from '../../TodoContext';
import 'dayjs/locale/ko';
import TodoItem from './TodoItem';

const ModalBg = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalContainer = styled.div`
  width: 25vw;
  height: 80vh;
  z-index: 100;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f9f9f9;
  border-radius: 25px;
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.08);
`;

const ModalHead = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  span {
    font-size: 2rem;
  }
`;

const ModalDateContainer = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.redOrBlueDay};
`;

const ModalListContainer = styled.div`
  margin-top: 5%;
  padding-left: 5%;
  padding-right: 5%;
  height: 52vh;
  overflow-y: auto;
`;

const ExitButton = styled(NavigateBeforeIcon)`
  color: gray;
  opacity: 80%;
  margin: 1% 0 0 1%;
  cursor: pointer;
`;

const Modal = ({ setModalOpen, setSelectedDate, selectedDate }) => {
  const headSelectedDay = useHeadSelectedDay();
  const selectedDay = useSelectedDay();
  const schedule = localStorage.getItem('newSchedules')
    ? JSON.parse(localStorage.getItem('newSchedules'))
    : [];

  const closeModal = () => {
    setSelectedDate(date);
    localStorage.setItem('selectedDate', selectedDate);
    setModalOpen(false);
  };

  const closeModalBg = () => {
    setModalOpen(false);
    console.log(selectedDate);
    localStorage.setItem('selectedDate', selectedDate);
    console.log(localStorage.getItem('selectedDate'));
  };

  const date = headSelectedDay.headSelectedDay.locale('ko');
  const year = date.format('YYYY');
  const month = date.format('MM');
  const day = date.format('DD');
  const week = date.format('dd');
  return (
    <ModalBg onClick={closeModalBg}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ExitButton onClick={closeModal} />
        <ModalHead>
          <span>일정 보기</span>
        </ModalHead>
        <ModalDateContainer
          redOrBlueDay={
            week === '일' ? '#FA425A' : week === '토' ? '#5972F0' : 'black'
          }
        >
          <h2>
            {year}. {month}. {day} {week}
          </h2>
        </ModalDateContainer>
        <ModalListContainer>
          {schedule
            .filter((todo) => todo.date.selectedDay === selectedDay.selectedDay)
            .sort()
            .map((todo) => {
              return (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  text={todo.text}
                  done={todo.done}
                />
              );
            })}
        </ModalListContainer>
      </ModalContainer>
    </ModalBg>
  );
};

export default Modal;
