import styled from "styled-components";
import { IBoard } from "./Btimeline";
import { Link } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";

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
  right: 100px; /* 수정 버튼과 겹치지 않게 약간 왼쪽으로 이동 */
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  background-color: #e53935; /* 빨간색 */
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #d32f2f;
  }
`;

const UpdateButton = styled.button`
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

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedBoard, setEditedBoard] = useState(board);

  const onUpdate = () => {
    setIsEditing(true);
    //console.log("수정 버튼 클릭됨");
    // 수정 모달 띄우기 등 수정 기능 추가 예정
  };

  const onSave = async () => {
    try {
      const postRef = doc(db, "board", id);
      await updateDoc(postRef, {
        title: editedTitle,
        board: editedBoard,
      });
      setIsEditing(false);
    } catch (e) {
      console.error("업데이트 실패", e);
    }
  };

  const onCancel = () => {
    setIsEditing(false);
    setEditedTitle(title);
    setEditedBoard(board);
  };

  return (
    <Wrapper>
      <Username>작성자 : {username}</Username>

      {isEditing ? (
        <>
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            style={{ fontSize: "24px", marginBottom: "10px", padding: "8px" }}
          />
          <textarea
            value={editedBoard}
            onChange={(e) => setEditedBoard(e.target.value)}
            style={{
              fontSize: "18px",
              padding: "12px",
              width: "100%",
              height: "300px",
            }}
          />
          <UpdateButton onClick={onSave}>저장</UpdateButton>
          <DeleteButton onClick={onCancel}>취소</DeleteButton>
        </>
      ) : (
        <>
          <Title>제목:{title}</Title>
          <Payload>{board}</Payload>
          {photo && <Photo src={photo} alt="uploaded" />}
          {user?.uid === userId && (
            <>
              <DeleteButton onClick={onDelete}>삭제</DeleteButton>
              <UpdateButton onClick={onUpdate}>수정</UpdateButton>
            </>
          )}
        </>
      )}
    </Wrapper>
  );
}
