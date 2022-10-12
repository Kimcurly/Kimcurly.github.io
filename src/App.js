import React from 'react';
import './styles/App.scss';
import { createGlobalStyle } from 'styled-components';
import Calendar from './components/calendar/Calendar';
import { TodoProvider } from './TodoContext';
import { StyledEngineProvider } from '@mui/styled-engine';
import TodoTemplate from './components/TodoList/TodoTemplate';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from '../src/NotFound';

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
            <Route
              path="/Kimcurly.github.io/index.html"
              element={<Calendar />}
            ></Route>
            <Route path="/addschedules" element={<TodoTemplate />}></Route>
            <Route path="/*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </TodoProvider>
    </StyledEngineProvider>
  );
}

export default App;
