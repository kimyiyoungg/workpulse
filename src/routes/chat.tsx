import { styled } from "styled-components";
import Menu from "../components/menu";
import { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import Chattingtimeline from "../components/chatting-timeline";



const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;
const Column = styled.div`
    display: flex;
    flex-direction: column;
`;
const Form = styled.form`
    display: flex;
    margin-top: 30px;
    flex-direction: row;
    gap: 10px;
    text-align: right;
    height: 100%;
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
    };

    return <Wrapper>
        <Menu />
        <Column>
            <Chattingtimeline/>
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