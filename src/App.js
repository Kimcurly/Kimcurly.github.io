import React, { useState } from 'react';
import './styles/App.scss';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import Calendar from './components/calendar/Calendar';
import { TodoProvider } from './TodoContext';
import Modal from './components/TodoList/Modal';
import { MdAdd } from 'react-icons/md';

const GlobalStyle = createGlobalStyle`
body {
  background: #e9ecef;
  white-space: pre-line;
}
`;
const CircleButton = styled.button`
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }

  z-index: 5;
  cursor: pointer;
  width: 50px;
  height: 50px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 77%;
  bottom: 10%;
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [modalopen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <TodoProvider>
      <GlobalStyle />
      <Calendar />
      <CircleButton onClick={openModal}>
        <MdAdd />
      </CircleButton>
      <Modal open={modalopen} close={closeModal} />
    </TodoProvider>
  );
}

export default App;
