import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form = styled.form`
    display: flex;
    margin-top: 30px;
    flex-direction: column;
    gap: 10px;
    text-align: right;
    height: 100%;
    `;

const TextArea = styled.textarea`
    // border: 2px solid gray;
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
    color: black;
    // width: 250%;
    // height: 100%;
    flex-grow: 1;
    resize: none;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);    
    &::placeholder {
      font-size: 16px;
    }
    &::focus {
      outline: none;
      border-color: black;
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
    background-color: black;
    color: white;
    border:none;
    padding:10px 0px;
    border-radius: 20px;
    font-size:16px;
    cursor: pointer;
    &:hover,
    &:active {
      opacity: 0.9;
    }    
`;

interface PostMemoFormProps {
    memoToEdit: string;
    setMemoToEdit: (memo: string) => void;
  }

export default function postMemoForm({ memoToEdit, setMemoToEdit }: PostMemoFormProps){
    const [isLoading, setLoading] = useState(false);
    const [memoes, setMemoes] = useState("");
    const [file, setFile] = useState<File|null>(null);
    
    useEffect(() => {
      setMemoes(memoToEdit);
      }, [memoToEdit]);
    
    const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setMemoes(e.target.value);
    };
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {files} = e.target;
        if(files && files.length === 1){
            setFile(files[0])
        };
    };

    const onSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = auth.currentUser;
        if(!user || isLoading || memoes === "" || memoes.length > 180 ) return;
        try {
            // setLoading(true);
            // const doc = await addDoc(collection(db, "memoes"),{
            //     memoes,
            //     createdAt: Date.now(),
            //     username: user.displayName || "Anonymous",
            //     userId: user.uid,

            // });
            // if(file){
            //     const locationRef = ref(storage, `memoes/${user.uid}-${user.displayName}/${doc.id}`);
            //     const result = await uploadBytes(locationRef, file);
            //     const url = await getDownloadURL(result.ref);
            //     await updateDoc(doc, {
            //         photo: url,
            //     });
            
            // }
            // setMemoes("");
            // setFile(null);

            setLoading(true);
            
            if (memoToEdit) {
              console.log(memoToEdit)
              // const memoRef = doc(db, "memoes", memoToEdit);
              // await updateDoc(memoRef, { memoes }); // 내용만 업데이트
            } else {
              // 새 메모 추가할 때
              const docRef = await addDoc(collection(db, "memoes"), {
                memoes,
                createdAt: Date.now(),
                username: user.displayName || "Anonymous",
                userId: user.uid,
              });
              if (file) {
                const locationRef = ref(storage, `memoes/${user.uid}-${user.displayName}/${docRef.id}`);
                const result = await uploadBytes(locationRef, file);
                const url = await getDownloadURL(result.ref);
                await updateDoc(docRef, { photo: url });
              }
            }
      
            setMemoes("");
            setFile(null);

        } catch (e) {
            console.log(e);
            
        } finally{
            setLoading(false);
        }

    }


    return (
      <Form onSubmit={onSubmit}>
        <TextArea
        required
        rows={5}
        maxLength={180}
          onChange={onChange}
          value={memoes}
          placeholder="메모 작성"/>
        <AttachFileButton htmlFor="file">{file?"(사진 포함)":"사진 업로드"}</AttachFileButton>
        <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*"/>
        <SubmitBtn 
          type="submit"
          value={isLoading ? "저장 중..":memoToEdit ? "수정 저장" : "메모 저장"}/>
    </Form>);
}
// export default function PostMemoForm({
//     memoToEdit,
//     setMemoToEdit,
//   }: PostMemoFormProps) {
//     const [memoes, setMemoes] = useState(memoToEdit);
  
//     useEffect(() => {
//       setMemoes(memoToEdit); // `memoToEdit` 상태 변경 시
//     }, [memoToEdit]);
  
//     const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//       setMemoes(e.target.value);
//     };
  
//     const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       const user = auth.currentUser;
//       if (!user || memoes === "") return;
//       try {
//         const docRef = await addDoc(collection(db, "memoes"), {
//           memoes,
//           createdAt: Date.now(),
//           username: user.displayName || "Anonymous",
//           userId: user.uid,
//         });
//         setMemoes("");
//       } catch (e) {
//         console.log(e);
//       }
//     };
  
//     return (
//       <Form onSubmit={onSubmit}>
//         <TextArea
//           required
//           rows={5}
//           maxLength={180}
//           onChange={onChange}
//           value={memoes}
//           placeholder="메모 작성"
//         />
//         <SubmitBtn type="submit" value="메모 저장" />
//       </Form>
//     );
//   }