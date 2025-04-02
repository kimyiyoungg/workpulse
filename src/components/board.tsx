import styled from "styled-components";
import { IBoard } from "./Btimeline";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div``;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const DeleteButton = styled.button``;

export default function Board({
  title,
  username,
  photo,
  board,
  userId,
  id,
}: IBoard) {
  const user = auth.currentUser;
  const onDelete = async () => {
    if (user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "board", id));
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload>{title}</Payload>
        <Payload>{board}</Payload>
        {user?.uid === userId ? <DeleteButton>삭제</DeleteButton> : null}
      </Column>
      {photo ? (
        <Column>
          <Photo src={photo}></Photo>
        </Column>
      ) : null}
    </Wrapper>
  );
}
