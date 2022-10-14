import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

const Background = styled.div`
  background-color: #f1f1f1;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vw;
  min-height: 100vh;
  justify-content: center;
  align-items: flex-start;
  margin-left: 10%;
`;
const ErrorTitle = styled.div`
  font-size: 4rem;
  font-weight: 500;
  margin-bottom: 4%;
`;

const ErrorContent = styled.div`
  font-size: 1rem;
  white-space: pre-line;
  font-weight: 550;
  color: #898989;
`;

const StyledHomeButton = styled(Button)`
  margin-top: 4%;
  padding: 2% 20% 2% 20%;
  border-radius: 25px;
`;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Background>
      <ErrorContainer>
        <ErrorTitle>404 ERROR</ErrorTitle>
        <ErrorContent>
          죄송합니다. 페이지를 찾을 수 없습니다.
          <br /> 존재하지 않는 주소를 입력하셨거나
          <br /> 요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
        </ErrorContent>
        <StyledHomeButton
          variant="text"
          onClick={() => navigate('/Kimcurly.github.io/index.html')}
        >
          홈으로
        </StyledHomeButton>
      </ErrorContainer>
    </Background>
  );
};

export default NotFound;
