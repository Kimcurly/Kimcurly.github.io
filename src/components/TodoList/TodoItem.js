import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
import { useTodoDispatch, useTodoState } from '../../TodoContext';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

const UpdateComple = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #c4c9ce;
  font-size: 25px;
  cursor: pointer;
  margin-left: 4%;
  background-color: #fadefe;
  border: none;
  &:hover {
    color: #38d9a9;
  }
`;

const Edit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c4c9ce;
  font-size: 25px;
  cursor: pointer;
  margin-right: 4%;
  &:hover {
    color: #585859;
  }
  display: none;
`;

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c4c9ce;
  font-size: 25px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
    ${Edit} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
      text-decoration-line: line-through;
    `}
`;

const UpdateInput = styled.input`
  flex: 1;
  margin-right: 10%;
  border: none;
  font-size: 1rem;
  padding: 5px;
  box-sizing: border-box;
  background-color: #fadefe;
  &:focus {
    outline: none;
  }
`;

const TodoItem = ({ id, done, text }) => {
  const dispatch = useTodoDispatch();
  const todoData = useTodoState();

  const onToggle = () => dispatch({ type: 'TOGGLE', id });
  const onRemove = () => dispatch({ type: 'REMOVE', id });

  const [edited, setEdited] = useState(false);
  const [newText, setNewText] = useState(text);

  const editInputRef = useRef(null);

  useEffect(() => {
    if (edited) {
      editInputRef.current.focus();
    }
  }, [edited]);

  const onClickEditButton = () => {
    setEdited(true);
  };

  const onChangeEditInput = (e) => {
    setNewText(e.target.value);
  };

  const onClickSubmitButton = (e) => {
    e.preventDefault();

    let newScheduleData = todoData.map((todo) => {
      if (todo.id === id) {
        todo.text = newText;
      }
      return todo;
    });

    dispatch({ type: 'UPDATE', newScheduleData });
    localStorage.setItem('newSchedules', JSON.stringify([...newScheduleData]));
    setEdited(false);
  };

  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onToggle}>
        {done && <MdDone />}
      </CheckCircle>
      {edited ? (
        <>
          <form onSubmit={onClickSubmitButton}>
            <UpdateInput
              type="text"
              value={newText}
              onChange={onChangeEditInput}
              ref={editInputRef}
            />
          </form>
          <UpdateComple type="submit" onClick={onClickSubmitButton}>
            <CheckIcon />
          </UpdateComple>
        </>
      ) : (
        <Text done={done}>{text}</Text>
      )}
      {edited ? null : (
        <>
          <Edit onClick={onClickEditButton}>
            <EditIcon />
          </Edit>
          <Remove onClick={onRemove}>
            <MdDelete />
          </Remove>
        </>
      )}
    </TodoItemBlock>
  );
};

export default React.memo(TodoItem);
