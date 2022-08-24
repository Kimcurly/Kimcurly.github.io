import React from 'react';
import styled from 'styled-components';
import { useTodoState } from '../../TodoContext';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

const TodoHeadBlock = styled.div`
  padding-top: 30px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }
  .tasks {
    color: #20c997;
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
  }
`;

const TodoHead = () => {
  const todos = useTodoState();
  const undoneTasks = todos.filter((todo) => !todo.done);

  dayjs.locale('ko');
  const date = dayjs();
  const year = date.format('YYYY');
  const month = date.format('MM');
  const day = date.format('DD');
  const week = date.format('dddd');

  return (
    <TodoHeadBlock>
      <h1>
        {year}년 {month}월 {day}일
      </h1>
      <div className="day">{week}</div>
      <div className="tasks">할 일 {undoneTasks.length}개 남음</div>
    </TodoHeadBlock>
  );
};

export default TodoHead;
