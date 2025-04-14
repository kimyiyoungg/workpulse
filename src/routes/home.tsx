import styled from "styled-components";
import Menu from "../components/menu";
import { auth } from "../firebase";
import Btimeline from "../components/Btimeline";
import PostBoardForm from "../components/post-board-form";
import Boardlayout from "../components/boardlayout";
import Birthday from "../components/birthday";
import Congratulations from "../components/congratulations";
import React, { useState } from "react";
import Modal from "react-modal";
import PostCongraturationForm from "../components/post-congratulation-Form";
import PostCongratulationForm from "../components/post-congratulation-Form";
export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
  width: 100%;
  height: 100%;
`;
export const Sidebar = styled.aside`
  width: 250px;
  height: 100vh;
  position: sticky;
  top: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const MainContent = styled.main`
  flex: 1; /* ← 메인 콘텐츠는 남는 공간 전부 */
  background-color: #f1f1f1;
  padding: 20px;
  border-radius: 20px;
  // height: calc(100vh - 40px);
  // overflow-y: auto;
`;
export const RightSidebar = styled.aside`
  width: 350px; /* ← 고정 너비로 오른쪽 사이드바 슬림하게 */
  background-color: #f1f1f1;
  padding: 20px;
  border-radius: 20px;
  height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

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
      <RightSidebar>
        <Congratulations />
        <button onClick={openModal}>경조사 글쓰기</button>
        <Modal isOpen={isOpen} onRequestClose={closeModal} ariaHideApp={false}>
          <h2>경조사 글추가하기</h2>
          <PostCongratulationForm onPostComplete={closeModal} />
        </Modal>
        <Birthday />
      </RightSidebar>
    </Container>
  );
}
