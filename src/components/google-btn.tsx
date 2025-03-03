import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { styled } from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
  margin-top: 30px;
  background-color: white;
  font-size:16px;
  width: 100%;
  padding: 10px 25px;
  border-radius: 5px;
  border: solid gray;
  border-width: 2px 2px 2px 2px ;
  display: flex;
  gap:5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  `;

  const Logo = styled.img`
  height: 25px
  `;

export default function GoogleButton(){

    const navigate = useNavigate();


    const onClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
              navigate("/");
        } catch (error) {
            console.error(error);
            
            
        }
    };

    return (
      <Button onClick={onClick}>
        <Logo src="/google-logo.svg"/>
        Google로 로그인
      </Button>
    );

}