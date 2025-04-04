import styled from "styled-components";
import Menu from "../components/menu";
import { auth } from "../firebase";
import Btimeline from "../components/Btimeline";
import PostBoardForm from "../components/post-board-form";
import Boardlayout from "../components/boardlayout";

export const Container = styled.div`
  display: flex;
  justify-content: space-between; /* 왼쪽(메모 리스트)과 오른쪽(메모 작성) 구분 */
  gap: 20px; /* 두 영역 간의 간격 */
  padding: 20px;
  width: 100%;
  overflow: hidden;
`;
export const Sidebar = styled.aside`
  flex: 1; /* 왼쪽 사이드바 (1) */
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainContent = styled.main`
  width: 40%;
  background-color: #f1f1f1; /* 회색 배경 */
  padding: 20px;
  border-radius: 20px;
  height: calc(100vh - 40px); /* 화면 전체 높이를 채우기 */
  overflow-y: auto; /* 스크롤 가능 */
  scrollbar-width: none;
  // position: relative;
  position: absolute;
  right: 44%;
`;
export const RightSidebar = styled.aside`
  width: 40%; /* 메모 작성 화면의 고정 너비 */
  background-color: #f1f1f1; /* 회색 배경 */
  padding: 20px;
  border-radius: 20px;
  height: calc(100vh - 40px); /* 화면 전체 높이를 채우기 */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: absolute;
  // top: 0;
  right: 2%;
`;
export default function Home() {
  const logOut = () => {
    auth.signOut();
  };

  return (
    <Container>
      <Sidebar>
        <Menu />
      </Sidebar>

      <MainContent>
        <Boardlayout />
      </MainContent>
      <RightSidebar />
    </Container>
  );
}
