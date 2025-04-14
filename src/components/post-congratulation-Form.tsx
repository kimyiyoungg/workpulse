import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { styled } from "styled-components";
import { db, auth, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  background-color: #fafafa;
  border: 1px solid #ddd;
  border-radius: 16px;
  max-width: 800px;
  margin: 0 auto;
`;

const Input = styled.input`
  border: none;
  border-bottom: 2px solid #ccc;
  padding: 16px 8px;
  font-size: 24px;
  font-weight: bold;
  background-color: transparent;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const TextArea = styled.textarea`
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 12px;
  font-size: 18px;
  background-color: white;
  height: 500px;
  resize: vertical;
  line-height: 1.6;
  font-family: "Noto Sans KR", system-ui, sans-serif;
  transition: border-color 0.3s;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const AttachFileButton = styled.label`
  display: inline-block;
  padding: 12px 24px;
  background-color: #f0f0f0;
  color: #333;
  text-align: center;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  border: 1px dashed #ccc;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e5e5e5;
  }
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  padding: 16px 0;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  background-color: black;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover,
  &:active {
    background-color: #1683d8;
  }
`;

export default function PostCongratulationForm({
  onPostComplete,
}: {
  onPostComplete?: () => void;
}) {
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
      const doc = await addDoc(collection(db, "congratulations"), {
        title, // 제목 추가
        board, // 내용 추가
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });

      if (file) {
        const locationRef = ref(
          storage,
          `congratulations/${user.uid}/${doc.id}`
        );
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
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
      onPostComplete?.();
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
