import styled from "styled-components";
import { IBoard } from "./Btimeline";
import { Link } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div`
  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin: 16px 0;
  max-width: 700px;
`;

const Photo = styled.img`
  margin-top: 20px;
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 12px;
`;

const Username = styled.span`
  position: absolute;
  top: 16px;
  right: 24px;
  font-weight: 500;
  font-size: 14px;
  color: #555;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Payload = styled.p`
  margin: 12px 0;
  font-size: 18px;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const DeleteButton = styled.button`
  position: absolute;
  bottom: 16px;
  right: 24px;
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  background-color: black;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1683d8;
  }
`;

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
    const ok = confirm("Are you sure you want to delete?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "board", id));
      if (photo) {
        const photoRef = ref(storage, `board/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
  return (
    <Wrapper>
      <Username>작성자 : {username}</Username>
      <Title>제목:{title}</Title>
      <Payload>{board}</Payload>
      {photo && <Photo src={photo} alt="uploaded" />}
      {user?.uid === userId && (
        <DeleteButton onClick={onDelete}>삭제</DeleteButton>
      )}
    </Wrapper>
  );
}
