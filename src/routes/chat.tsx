import { styled } from "styled-components";
import Menu from "../components/menu";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import Chattingtimeline from "../components/chatting-timeline";


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100%;
  position: relative;
`;

const ChattingContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 80px;
  height: calc(100vh - 80px);
  scrollbar-width: none;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  gap: 10px;
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-30%);
  width: 70%;
  padding: 10px 0;
  background-color: white;
  z-index: 10;
`;

const ChatInput = styled.input`
  height: 40px;
  width: 80%;
  border-radius: 5px;
`;

const SendButton = styled.input`
  background-color: black;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  height: 40px;
  width: 100px;

  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

// const Wrapper = styled.div`
//     display: flex;
//     justify-content: center;
//     width: 80%;
// `;
// const Column = styled.div`
//     display: flex;
//     flex-direction: column;
//     width: 80%;
// `;
// const Form = styled.form`
//     display: flex;
//     margin-top: 30px;
//     flex-direction: row;
//     gap: 10px;
//     text-align: right;
//     height: 100%;
//     width: 100%;
//     `;

// const ChatInput = styled.input`
//     height: 40px;
//     width: 80%;
//     border-radius: 5px;

// `;

// const SendButton = styled.input`
//     background-color: black;
//     color: white;
//     border:none;
//     padding:10px 0px;
//     border-radius: 20px;
//     font-size: 16px;
//     cursor: pointer;
//     height: 40px;
//     width: 100px;
//     &:hover,
//     &:active {
//       opacity: 0.9;
//     }    
// `;

export default function Chat() {
    
    const [isLoading, setLoading] = useState(false);
    const [chatting, setChatting] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    // 메시지 전송 후 스크롤 아래로
    useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, [chatting]);
    
    const onChatting = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setChatting(e.target.value);
    };

    const onSending = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = auth.currentUser;
        if(!user || isLoading || chatting === "" || chatting.length > 180 ) return;
        try{
            setLoading(true);
            const doc = await addDoc(collection(db, "chatting"),{
                chatting,
                createdAt: Date.now(),
                username: user.displayName || "Anonymous",
                userId: user.uid,
            });

        } catch (e) {
            console.log(e);    
        } finally{
            setLoading(false);
        }
        setChatting("");
    };

    return <Wrapper>
        <Menu />
        <Column>
            <ChattingContainer ref={scrollRef}>
                <Chattingtimeline />
            </ChattingContainer>
            <Form onSubmit={onSending}>
                <ChatInput 
                    type="text"
                    required
                    maxLength={50}
                    onChange={onChatting}
                    value={chatting}
                    placeholder="채팅을 입력하세요"
                />
                <SendButton type="submit" value={isLoading ? "전송" : "전송"}/>
            </Form>
        </Column>
        

    </Wrapper>;
}