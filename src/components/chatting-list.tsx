import { styled } from "styled-components";
import { IChatting } from "./chatting-timeline";

const Wrapper = styled.div`
  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin: 16px 0;
  max-width: 700px;
`;
const Row = styled.div``;

const Username = styled.span``;

const Chat = styled.p``;

// const Chatdate = styled.span``;


export default function ChattingList({username, chatting, createdAt}:IChatting){
    return <Wrapper>
        <Row>
            <Username>{username}</Username>
            <Chat>{chatting}</Chat>
            {/* <Chatdate>{createdAt}</Chatdate> */}
        </Row>
    </Wrapper>;
}