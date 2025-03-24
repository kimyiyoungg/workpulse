import styled from "styled-components";
import Menu from "../components/menu";
import { auth } from "../firebase";
import Btimeline from "../components/Btimeline";
import PostBoardForm from "../components/post-board-form";
const Wrapper = styled.div``;
export default function Home() {
  const logOut = () => {
    auth.signOut();
  };

  return (
    <Wrapper>
      {/* <Menu /> */}
      <PostBoardForm />
      <Btimeline />
      {/* <Menu/> */}
      {/* /<button onClick={logOut}>Log Out</button> */}
    </Wrapper>
  );
}
