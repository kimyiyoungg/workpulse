import Menu from "../components/menu";
import { styled } from "styled-components";
import PostBoardForm from "../components/post-board-form";

const Wrapper = styled.div`
  // margin-bottom: 30px;
  display: flex;
  justify-content: space-between; /* 왼쪽(메모 리스트)과 오른쪽(메모 작성) 구분 */
  gap: 20px; /* 두 영역 간의 간격 */
  padding: 20px;
  width: 100%;
  overflow: hidden;
`;
const Panel = styled.div`
  // flex: 1;
  width: 50%;
  background-color: #f1f1f1; /* 회색 배경 */
  padding: 20px;
  border-radius: 20px;
  height: calc(100vh - 40px); /* 화면 전체 높이를 채우기 */
  overflow-y: auto; /* 스크롤 가능 */
  scrollbar-width: none;
  // position: relative;
  position: absolute;
  right: 20%;
`;

function BoardWrite() {
  return (
    <Wrapper>
      <Menu />
      <Panel>
        <PostBoardForm />
      </Panel>
    </Wrapper>
  );
}

export default BoardWrite;
