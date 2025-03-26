import styled from "styled-components";
import Menu from "./menu"; // 사이드바
import Board from "./board"; // 게시글 목록
import PostBoardForm from "./post-board-form"; // 글쓰기 폼
import Btimeline, { IBoard } from "./Btimeline"; // 글 데이터 타입
import { Link } from "react-router-dom";

const LayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f1f3f5;
`;

const PostContainer = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Layout = () => {
  return (
    <ContentArea>
      <Btimeline />
    </ContentArea>
  );
};

export default Layout;
