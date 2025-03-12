import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import Menu from "../components/menu";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1440px;
  min-height: 100vh;
  background: #ffffff;
`;
const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;
const Logo = styled.img`
  width: 150px; /* 로고 크기 조절 */
  margin-bottom: 30px; /* 버튼과 간격 조절 */
`;
const Btn = styled.button`
  width: 200px;
  padding: 10px;
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 6px;
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  font-size: 14px;
  text-transform: uppercase;
  color: #000000;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: black;
    color: white;
  }
`;
const Btn2 = styled(Btn)`
  background: #000000;
  color: #ffffff;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const startHome = () => {
  return (
    <Wrapper>
      {/* 로고 추가 */}
      <Logo src="/workpulse-logo.svg" alt="사이트 로고" />

      <BtnContainer>
        <Link to="/login">
          <Btn>로그인</Btn>
        </Link>

        <Link to="/create-account">
          <Btn2>가입하기</Btn2>
        </Link>
      </BtnContainer>
    </Wrapper>
  );
};

export default startHome;
