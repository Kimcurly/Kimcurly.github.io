import React from 'react';
import styled from 'styled-components';
import TodoHead from './TodoHead';
import TodoList from './TodoList';
import TodoCreate from './TodoCreate';

const TodoTemplateBlock = styled.div`
  width: 450px;
  height: 545px;

  position: relative;
  background: white;

  margin: 0 auto;

  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
`;

const TodoTemplate = () => {
  return (
    <TodoTemplateBlock>
      <TodoHead />
      <TodoList />
      <TodoCreate />
    </TodoTemplateBlock>
  );
};

export default TodoTemplate;
