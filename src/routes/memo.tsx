// 개인메모 화면

import { styled } from "styled-components";
import PostMemoForm from "../components/post-memo-form";
import Menu from "../components/menu";
import Timeline from "../components/timeline";
import { useState } from "react";

const Wrapper = styled.div`
  // margin-bottom: 30px;
  display: flex;
  justify-content: space-between; /* 왼쪽(메모 리스트)과 오른쪽(메모 작성) 구분 */
  gap: 20px; /* 두 영역 간의 간격 */
  padding: 20px;
  width: 100%;
  overflow: hidden;
`;

const LeftPanel = styled.div`
  // flex: 1;
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

const RightPanel = styled.div`
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

const MemoAddButton = styled.button`
  position: absolute; /* 위치를 절대적으로 지정 */
  top: 40px; /* 상단에서 10px */
  right: 20px; /* 오른쪽에서 10px */
`;

export default function Memo() {

    // 상태 관리: PostMemoForm을 보일지 말지를 결정하는 변수
    const [isPanelVisible, setIsPanelVisible] = useState(false);

    // 버튼 클릭 시 상태를 토글하는 함수
    const handleAddButtonClick = () => {
      setIsPanelVisible(prev => !prev); // 상태값을 반전시킴 (true ↔ false)
    };

  return (
    <Wrapper>
      <Menu /> {/* 사이드바 */}
      <LeftPanel>
        메모 리스트
        <MemoAddButton onClick={handleAddButtonClick}>추가</MemoAddButton> {/* 버튼 클릭 시 상태 변경 */}
        <Timeline />
      </LeftPanel>
      {isPanelVisible && (
        <RightPanel>
          메모 작성
          <PostMemoForm />
        </RightPanel>
      )}
    </Wrapper>
  );
}

// const Wrapper = styled.div`
//   display: flex;
//   gap: 100px;
// //   overflow-y:scroll;
//   gird-template-rows: 1fr 5fr;
//   padding: 20px;
// `;

// export default function Memo(){
//     return (
//         <Wrapper>
//             <Menu/>
//             <Timeline/>
//             <PostMemoForm/>
//         </Wrapper>

//     );
// }
