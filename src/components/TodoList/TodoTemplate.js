import React from 'react';
import styled from 'styled-components';
import TodoHead from './TodoHead';
import TodoCreate from './TodoCreate';

const TodoTemplateBlock = styled.div`
  width: 30vw;
  height: 85vh;

  position: relative;

  margin: 0 auto;

  margin-top: 50px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
  border-radius: 16px;
`;

const TodoTemplate = () => {
  return (
    <TodoTemplateBlock>
      <TodoHead />
      <TodoCreate />
    </TodoTemplateBlock>
  );
};

export default TodoTemplate;
