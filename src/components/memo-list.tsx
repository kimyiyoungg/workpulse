import styled from "styled-components";
import { IMemo } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 20px;
    border-radius: 20px;
    // border: 1px solid black;
    margin-bottom: 10px;
    background-color:white;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    position: relative;
`;

const Column = styled.div``;

const Photo = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 15px;
    `;

const Username = styled.span`
    font-weight: 600;
    font-size:15px;
`;

const Payload = styled.p`
    margin: 10px 0px;
    font-size: 17px;
    `;

const MemoDeleteButton = styled.button`
    background-color: white;
    color: gray;
    font-weight: 600;
    border:0;
    font-size:12px;
    padding: 5px 10px;
    text-transform: uppercase;
    border-radius: 5px;
    cursor:pointer;
    position: absolute; /* 위치를 절대적으로 지정 */
    top: 10px; /* 상단에서 10px */
    right: 10px; /* 오른쪽에서 10px */
`;


export default function MemoList({id, username, photo, memoes, userId}:IMemo){
    const user = auth.currentUser;
    const onDeletes = async() => {
        const ok = confirm("정말 삭제할까요?");

        if(!ok || user?.uid !== userId) return;
        try {
            await deleteDoc(doc(db, "memoes", id));
            if(photo){
                const photoRef = ref(storage, `memoes/${user.uid}-${username}/${id}`);
                await deleteObject(photoRef);
            }
        } catch (e) {
            console.log(e);
        } finally {

        }
    }
    return <Wrapper>
        <Column>
            <MemoDeleteButton onClick={onDeletes}>삭제</MemoDeleteButton>
            {/* <Username>{username}</Username> */}
            <Payload>{memoes}</Payload>    
        </Column>
        {photo? <Column>
            <Photo src={photo}/>
        </Column> : null}
    </Wrapper>
}