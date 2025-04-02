import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { styled } from "styled-components";
import { db, auth, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Input = styled.input`
  border: 1px solid black;
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;
  width: 100%;
  background-color: white;
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;
const TextArea = styled.textarea`
  border: 1px solid black;
  padding: 20px;
  border-radius: 15px;
  font-size: 16px;
  width: 100%;
  height: 400px;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;
const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: black;
  text-align: center;
  border-radius: 20px;
  border: 1px solid black;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;
const AttachFileInput = styled.input`
  display: none;
`;
const SubmitBtn = styled.input`
  border: 1px solid black;
  background-color: black;
  color: white;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;

  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

export default function PostBoardForm() {
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState(""); // 제목 상태 추가
  const [board, setBoard] = useState(""); // 내용 상태 유지
  const [file, setFile] = useState<File | null>(null);

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBoard(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (
      !user ||
      isLoading ||
      title === "" ||
      board === "" ||
      board.length > 180
    )
      return;
    try {
      setLoading(true);
      // Firestore에 제목(title)과 내용(board) 저장
      const docRef = await addDoc(collection(db, "board"), {
        title, // 제목 추가
        board, // 내용 추가

        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });

      if (file) {
        const locationRef = ref(storage, `boards/${user.uid}/${docRef.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc(docRef), {
          photo: url,
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setTitle(""); // 제목 초기화
      setBoard(""); // 내용 초기화
      setFile(null); // 파일 초기화
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Input
        type="text"
        required
        maxLength={50}
        onChange={onTitleChange}
        value={title}
        placeholder="제목을 입력하세요"
      />

      <TextArea
        required
        rows={5}
        maxLength={180}
        onChange={onContentChange}
        value={board}
        placeholder="내용을 입력하세요"
      ></TextArea>

      <AttachFileButton htmlFor="file">
        {file ? "Photo added ✅" : "Add photo"}
      </AttachFileButton>
      <AttachFileInput
        onChange={onFileChange}
        type="file"
        id="file"
        accept="image/*"
      />
      <SubmitBtn
        type="submit"
        value={isLoading ? "Posting..." : "Post Board"}
      />
    </Form>
  );
}
