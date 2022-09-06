import React from 'react';
import styled from 'styled-components';
import { useHeadSelectedDay } from '../../TodoContext';
import 'dayjs/locale/ko';

const TodoHeadBlock = styled.div`
  padding-top: 30px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    font-weight: 500;
  }
`;

const Title = styled.div`
  margin: 0;
  font-size: 36px;
  color: #343a40;
  font-weight: 500;
`;

const TodoHead = () => {
  const headSelectedDay = useHeadSelectedDay();

  const date = headSelectedDay.headSelectedDay.locale('ko');
  const year = date.format('YYYY');
  const month = date.format('MM');
  const day = date.format('DD');
  const week = date.format('dd');

  return (
    <TodoHeadBlock>
      <Title>일정 추가</Title>
      <h2>
        {year}. {month}. {day} {week}
      </h2>
    </TodoHeadBlock>
  );
};

export default TodoHead;
