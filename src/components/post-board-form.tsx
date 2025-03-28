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
const TextArea = styled.textarea`
  border: 1px solid black;
  padding: 20px;
  border-radius: 15px;
  font-size: 16px;
  color: black;
  background-color: white;
  width: 100%;
  height: 600px; /* 원하는 높이값 설정 */

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
  const [board, setBoard] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    if (!user || isLoading || board === "" || board.length > 180) return;
    try {
      setLoading(true);
      const doc = await addDoc(collection(db, "board"), {
        board,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });
      if (file) {
        const locationRef = ref(
          storage,
          `boards/${user.uid}-${user.displayName}/${doc.id}`
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
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        required
        rows={5}
        maxLength={180}
        onChange={onChange}
        value={board}
        placeholder="What is happening?!"
      />
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
