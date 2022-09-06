import React from 'react';
import './styles/App.scss';
import { createGlobalStyle } from 'styled-components';
import Calendar from './components/calendar/Calendar';
import { TodoProvider } from './TodoContext';
import { StyledEngineProvider } from '@mui/styled-engine';
import TodoTemplate from './components/TodoList/TodoTemplate';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
body {
  
}
`;

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <TodoProvider>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Calendar />}></Route>
            <Route path="/addschedules" element={<TodoTemplate />}></Route>
          </Routes>
        </BrowserRouter>
      </TodoProvider>
    </StyledEngineProvider>
  );
}

export default App;
