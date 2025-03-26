// 개인메모 화면

import { styled } from "styled-components";
import Menu from "../components/menu";

const Wrapper = styled.div`
  // margin-bottom: 30px;
  display: flex;
  justify-content: space-between; /* 왼쪽(메모 리스트)과 오른쪽(메모 작성) 구분 */
  gap: 20px; /* 두 영역 간의 간격 */
  padding: 20px;
  width: 100%;
  overflow: hidden;
`;


export default function Profile() {


  return (
    <Wrapper>
      <Menu /> {/* 사이드바 */}
    </Wrapper>
  );
}
