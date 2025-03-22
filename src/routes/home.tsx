import styled from "styled-components";
import Menu from "../components/menu";
import PostBoardForm from "../components/post-board-Form";
import { auth } from "../firebase";
import Btimeline from "../components/Btimeline";
const Wrapper = styled.div``;
export default function Home() {
  const logOut = () => {
    auth.signOut();
  };

  return (
    <Wrapper>
      <PostBoardForm />
      <Btimeline />
      {/* <Menu/> */}
      {/* /<button onClick={logOut}>Log Out</button> */}
    </Wrapper>
  );
}
