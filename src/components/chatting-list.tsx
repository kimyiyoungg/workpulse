import { styled } from "styled-components";
import { IChatting } from "./chatting-timeline";
import { auth } from "../firebase";

const Wrapper = styled.div`
//   position: relative;
//   background: white;
//   border-radius: 16px;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
//   margin: 16px 0;
//   max-width: 700px;
`;
const Row = styled.div`
`;

const Username = styled.span`
    
  
`;

const MyChat = styled.p`
  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin: 0px 0;
  max-width: 700px;
`;

const OtherChat = styled.p`
  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin: 0px 0;
  max-width: 700px;
`;

// const Chatdate = styled.span``;


export default function ChattingList({username, chatting, createdAt, userId}:IChatting){
    
    const user = auth.currentUser;
    
    return <Wrapper>
        <Row>
            {/* <Username>{username}</Username> */}
            {user && user.uid !== userId && <Username>{username}</Username>}
            {user && user.uid !== userId && <MyChat>{chatting}</MyChat>}
            {user && user.uid === userId && <OtherChat>{chatting}</OtherChat>}
            {/* <Chatdate>{createdAt}</Chatdate> */}
        </Row>
    </Wrapper>;
}