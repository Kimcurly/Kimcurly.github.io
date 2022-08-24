import React from 'react';
import { css, keyframes } from 'styled-components';
import styled from 'styled-components';
import { MdClear } from 'react-icons/md';
import TodoTemplate from './TodoTemplate';

const modalShow = keyframes`
  from {
    opacity: 0;
    margin-top: -50px;
  }
  to {
    opacity: 1;
    margin-top: 0;
  }
`;

const modalBgShow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalBg = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  ${(props) =>
    props.open &&
    css`
      display: flex;
      align-items: center;
      animation: ${modalBgShow} 0.3s;
    `};
`;

const ModalSection = styled.div`
  width: 90%;
  height: 90%;
  max-width: 450px;
  margin: 0 auto;
  border-radius: 1rem;
  background-color: #fff;
  animation: ${modalShow} 0.3s;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  position: relative;
  padding: 16px 16px 16px 16px;
  background-color: #f1f1f1;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const ModalButton = styled.button`
  width: 30px;
  font-size: 21px;
  color: #999;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  border: 0;
`;

const Modal = (props) => {
  const { open, close } = props;
  return (
    <ModalBg open={open}>
      {open && (
        <ModalSection>
          <ModalHeader>
            <ModalButton onClick={close}>
              <MdClear />
            </ModalButton>
          </ModalHeader>
          <main>
            <TodoTemplate />
          </main>
        </ModalSection>
      )}
    </ModalBg>
  );
};

export default Modal;
