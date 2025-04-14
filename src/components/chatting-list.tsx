import { styled } from "styled-components";
import { IChatting } from "./chatting-timeline";
import { auth } from "../firebase";


// Row 컴포넌트에서 isUserMessage prop을 명시적으로 처리하도록 타입을 추가합니다.
const Wrapper = styled.div`
  padding: 10px;
`;

interface RowProps {
  isUserMessage: boolean;
}

const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: column;  // 세로 정렬
  align-items: ${(props) => (props.isUserMessage ? "flex-end" : "flex-start")};  // 오른쪽/왼쪽 정렬
  margin-bottom: 10px;
`;

const Username = styled.span`
  margin-bottom: 5px;
  font-weight: bold;
`;

const MyChat = styled.p`
  position: relative;
  background: #e1f5fe;
  border-radius: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 0px;
  max-width: 700px;
  align-self: flex-end; /* 오른쪽 정렬 */
`;

const OtherChat = styled.p`
  position: relative;
  background: #f1f1f1;
  border-radius: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 0px;
  max-width: 700px;
  align-self: flex-start; /* 왼쪽 정렬 */
`;

export default function ChattingList({ username, chatting, createdAt, userId }: IChatting) {
  const user = auth.currentUser;

  return (
    <Wrapper>
      <Row isUserMessage={user && user.uid === userId}>
        {/* 이름이 다른 사용자의 메시지일 때만 보이게 설정 */}
        {user && user.uid !== userId && <Username>{username}</Username>}
        {/* 메시지가 사용자 본인의 것일 때 MyChat, 그렇지 않으면 OtherChat */}
        {user && user.uid === userId ? (
          <MyChat>{chatting}</MyChat>
        ) : (
          <OtherChat>{chatting}</OtherChat>
        )}
      </Row>
    </Wrapper>
  );
}



// import { styled } from "styled-components";
// import { IChatting } from "./chatting-timeline";
// import { auth } from "../firebase";

// const Wrapper = styled.div`
// //   position: relative;
// //   background: white;
// //   border-radius: 16px;
// //   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
//   padding: 10px;
// //   margin: 16px 0;
// //   max-width: 700px;
// `;
// const Row = styled.div`
// `;

// const Username = styled.span`
    
  
// `;

// const MyChat = styled.p`
//   position: relative;
//   background: white;
//   border-radius: 16px;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
//   padding: 24px;
//   margin: 0px 0;
//   max-width: 700px;
// `;

// const OtherChat = styled.p`
//   position: relative;
//   background: white;
//   border-radius: 16px;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
//   padding: 24px;
//   margin: 0px 0;
//   max-width: 700px;
// `;

// // const Chatdate = styled.span``;


// export default function ChattingList({username, chatting, createdAt, userId}:IChatting){
    
//     const user = auth.currentUser;
    
//     return <Wrapper>
//         <Row>
//             {/* <Username>{username}</Username> */}
//             {user && user.uid !== userId && <Username>{username}</Username>}
//             {user && user.uid !== userId && <MyChat>{chatting}</MyChat>}
//             {user && user.uid === userId && <OtherChat>{chatting}</OtherChat>}
//             {/* <Chatdate>{createdAt}</Chatdate> */}
//         </Row>
//     </Wrapper>;
// }