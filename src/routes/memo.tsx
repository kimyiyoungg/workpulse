import { useState } from "react";
import { styled } from "styled-components";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: right;
    `;

const TextArea = styled.textarea`
    border: 2px solid gray;
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
    color: black;
    width: 250%;
    height: 80%;
    resize: none;
    &::placeholder {
      font-size: 16px;
    }
    &::focus {
      outline: none;
      border-color: black
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

export default function Memo(){
    const [isLoding, setLoding] = useState(false);
    const [memoes, setMemoes] = useState("");
    const [file, setFile] = useState<File|null>(null);
    const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setMemoes(e.target.value);
    };
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {files} = e.target;
        if(files && files.length === 1){
            setFile(files[0])
        };
    };
    return (<Form>
        <TextArea 
          onChange={onChange}
          value={memoes}
          placeholder="메모 제목"/>
        <AttachFileButton htmlFor="file">{file?"Photo":"Add photo"}</AttachFileButton>
        <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*"/>
        <SubmitBtn 
          type="submit"
          value={isLoding ? "Posting...":"Post Tweet"}/>
    </Form>);
}