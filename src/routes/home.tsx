import styled from "styled-components";
import Menu from "../components/menu";
import { auth } from "../firebase";
import Btimeline from "../components/Btimeline";
import PostBoardForm from "../components/post-board-form";
import Boardlayout from "../components/boardlayout";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
`;
export const Sidebar = styled.aside`
  width: 250px;
  background-color: white;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;
export const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
export const RightSidebar = styled.aside`
  width: 250px;
  background-color: white;
  padding: 20px;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
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
      <RightSidebar>dd</RightSidebar>
    </Container>
  );
}
