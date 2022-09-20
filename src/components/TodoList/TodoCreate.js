import React, { useState } from 'react';
import styled from 'styled-components';
import {
  addSchedule,
  useSelectedDay,
  useTodoDispatch,
  useTodoNextId,
} from '../../TodoContext';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import swal from 'sweetalert';

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh;
`;

const ButtonPositioner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 15vh;
`;

const CenterButton = styled(Button)`
  width: 9vw;

  margin-right: 2vh;
  margin-left: 2vh;
`;

const InputTextField = styled(TextField)`
  width: 20vw;
  margin-bottom: 15vh;
`;

const TodoCreate = () => {
  const [value, setValue] = useState('');

  const navigate = useNavigate();
  const onChange = (e) => setValue(e.target.value);

  const selectedDay = useSelectedDay();
  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();

  const onAddSchedules = () => {
    if (value !== '') {
      dispatch(addSchedule(selectedDay, value, nextId.current));
      setValue('');
      nextId.current += 1;

      navigate('/Kimcurly.github.io/index.html');
    } else {
      swal({
        title: '잠시만요!',
        text: '일정을 입력한 뒤 추가 버튼을 눌러주세요!',
        icon: 'warning',
        button: '확인',
      });
    }
  };

  return (
    <>
      <InsertFormPositioner>
        <InputTextField
          id="standard-basic"
          label="일정을 입력하세요"
          variant="standard"
          onChange={onChange}
        />
      </InsertFormPositioner>
      <ButtonPositioner>
        <CenterButton variant="outlined" onClick={() => navigate(-1)}>
          취소
        </CenterButton>
        <CenterButton variant="contained" onClick={onAddSchedules}>
          + 추가
        </CenterButton>
      </ButtonPositioner>
    </>
  );
};

export default React.memo(TodoCreate);
