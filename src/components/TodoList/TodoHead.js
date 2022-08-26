import React from 'react';
import styled from 'styled-components';
import {
  useHeadSelectedDay,
  useSelectedDay,
  useTodoState,
} from '../../TodoContext';
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
  const headSelectedDay = useHeadSelectedDay();
  const selectedDay = useSelectedDay();
  const todos = useTodoState();
  const undoneTasks = todos
    .filter((todo) => todo.date.selectedDay === selectedDay.selectedDay)
    .filter((todo) => !todo.done);

  // 불러온 useState selectedDay 는 selectedDay와 setSelectedDay 로 이루어진 객체이기때문에 .selectedDay로 한번 더 빼주어야 한다.

  const date = headSelectedDay.headSelectedDay.locale('ko');
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
