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
  background-color: #fadefe;
  border-radius: 30px;
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.08);
`;

const ModalHead = styled.div`
  padding: 10px;
  display: flex;
  span {
    margin-left: 5.6vw;
    font-size: 2rem;
  }
`;

const ModalDateContainer = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalListContainer = styled.div`
  flex: 1;
  padding-top: 5%;
  padding-left: 5%;
  padding-right: 5%;
`;

const ExitButton = styled(NavigateBeforeIcon)`
  color: gray;
  opacity: 80%;
  cursor: pointer;
`;

const Modal = ({ setModalOpen }) => {
  const headSelectedDay = useHeadSelectedDay();
  const selectedDay = useSelectedDay();
  const schedule = localStorage.getItem('newSchedules')
    ? JSON.parse(localStorage.getItem('newSchedules'))
    : [];

  const closeModal = () => {
    setModalOpen(false);
  };

  const date = headSelectedDay.headSelectedDay.locale('ko');
  const year = date.format('YYYY');
  const month = date.format('MM');
  const day = date.format('DD');
  const week = date.format('dd');
  return (
    <ModalBg onClick={closeModal}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHead>
          <ExitButton onClick={closeModal} />
          <span>일정 보기</span>
        </ModalHead>
        <ModalDateContainer>
          <h2>
            {year}. {month}. {day} {week}
          </h2>
        </ModalDateContainer>
        <ModalListContainer onClick={(e) => e.stopPropagation()}>
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
