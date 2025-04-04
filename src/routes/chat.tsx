import { styled } from "styled-components";
import Menu from "../components/menu";
import { useState } from "react";

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const ChatInput = styled.input`
    height: 40px;

`;

const SendButton = styled.input`
    background-color: black;
    color: white;
    border:none;
    padding:10px 0px;
    border-radius: 20px;
    font-size:16px;
    cursor: pointer;
    height: 40px;
    width: 80px;
    &:hover,
    &:active {
      opacity: 0.9;
    }    
`;

export default function Chat() {
    
    const [isLoading, setLoading] = useState(false);
    const [chatting, setChatting] = useState("");

    
    const onChatting = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setChatting(e.target.value);
    };

    return <Wrapper>
        <Menu />
        <ChatInput 
            // required
            // onChange={onChatting}
            // value={chatting}
        />
        <SendButton type="submit" value={isLoading ? "전송" : "전송"}/>
    </Wrapper>;
}