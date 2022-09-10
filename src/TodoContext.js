import React, {
  createContext,
  useContext,
  useReducer,
  useRef,
  useState,
} from 'react';
import dayjs from 'dayjs';

const CREATE = 'CREATE';
const TOGGLE = 'TOGGLE';
const REMOVE = 'REMOVE';
const UPDATE = 'UPDATE';
const MOUNT = 'MOUNT';

const initialSchedules = [];
function todoReducer(state, action) {
  switch (action.type) {
    case CREATE:
      let newSchedules = {
        date: action.date,
        text: action.text,
        id: action.id,
        done: false,
      };
      localStorage.setItem(
        'newSchedules',
        JSON.stringify([...state, newSchedules]),
      );
      return state.concat(newSchedules);
    case TOGGLE:
      return state.map(
        (todo) =>
          todo.id === action.id ? { ...todo, done: !todo.done } : todo,
        localStorage.setItem('newSchedules', JSON.stringify([...state])),
      );
    case REMOVE:
      return state.filter(
        (todo) => todo.id !== action.id,
        localStorage.setItem('newSchedules', JSON.stringify([...state])),
      );
    case UPDATE:
      return (state = action.newScheduleData);
    case MOUNT:
      return (state = action.mountSchedules);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();
const SelectedDay = createContext();
const HeadSelectedDayContext = createContext();

export const addSchedule = (date, text, id) => {
  return { type: CREATE, date, text, id };
};

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialSchedules);
  const nextId = useRef(0);
  const [selectedDay, setSelectedDay] = useState(dayjs().format('YYYY-MM-DD'));
  const [headSelectedDay, setHeadSelectedDay] = useState(dayjs());
  const value = {
    headSelectedDay,
    setHeadSelectedDay,
  };
  const selectValue = {
    selectedDay,
    setSelectedDay,
  };

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          <HeadSelectedDayContext.Provider value={value}>
            <SelectedDay.Provider value={selectValue}>
              {children}
            </SelectedDay.Provider>
          </HeadSelectedDayContext.Provider>
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useHeadSelectedDay() {
  const context = useContext(HeadSelectedDayContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useSelectedDay() {
  const context = useContext(SelectedDay);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}
