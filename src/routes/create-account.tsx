import { useState } from "react";
// import styled from "styled-components";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth/cordova";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
  Error,
} from "../components/auth-components";

// const Wrapper = styled.div`
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   width: 420px;
//   padding:50px 20px;

// `;

// const Title = styled.h1`
//   font-size: 20px;
//   font-weight: 900;
// `;

// const Form = styled.form`
//   margin-top: 30px;
//   margin-bottom: 10px;
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
//   width: 100%;
// `;

// const Input = styled.input`
//   padding: 10px 25px;
//   border-radius: 5px;
//   border: solid gray;
//   border-width: 2px 2px 2px 2px ;
//   width: 100%;
//   font-size:16px;
//   &[type="submit"]{
//     background-color:black;
//     color: white;
//     cursor: pointer;
//     font-size:16px;
//     &:hover{
//       opacity: 0.8
//     }
//     }
// `;

// const Error = styled.span`
//   font-weight:600;
//   color:tomato;
// `;

// const Switcher = styled.span`
//   margin-top: 20px;
//   a {
//     color: #1d9bf0;
//   }
// `;

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoding, setLoding] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "userName") {
      setUserName(value);
    } else if (name === "userEmail") {
      setUserEmail(value);
    } else if (name === "userPhone") {
      setUserPhone(value);
    } else if (name === "userId") {
      setUserId(value);
    } else if (name === "userPassword") {
      setUserPassword(value);
    } else if (name === "userBirth") {
      setUserBirth(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (
      isLoding ||
      userName === "" ||
      userEmail === "" ||
      userPhone === "" ||
      userId === "" ||
      userPassword === "" ||
      userBirth === ""
    )
      return;
    try {
      setLoding(true);
      // 계정 만들기
      const credentials = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      console.log(credentials.user);
      // 사용자 프로필의 이름 지정
      await updateProfile(credentials.user, {
        displayName: userName,
      });
      // 홈페이지로 리디렉션
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        // console.log(e.code, e.message);
        setError(e.message);
      }
    } finally {
      setLoding(false);
    }

    console.log(
      userName,
      userEmail,
      userPhone,
      userId,
      userPassword,
      userBirth
    );
  };

  return (
    <Wrapper>
      <Title> 계정을 생성하세요 </Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="userName"
          value={userName}
          placeholder="이름"
          type="text"
          required
        />
        <Input
          onChange={onChange}
          name="userEmail"
          value={userEmail}
          placeholder="이메일"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          name="userPhone"
          value={userPhone}
          placeholder="전화번호"
          type="phone"
          required
        />
        <Input
          onChange={onChange}
          name="userId"
          value={userId}
          placeholder="아이디"
          type="text"
          required
        />
        <Input
          onChange={onChange}
          name="userPassword"
          value={userPassword}
          placeholder="비밀번호"
          type="password"
          required
        />
        <Input
          onChange={onChange}
          name="userBirth"
          value={userBirth}
          placeholder="생년월일"
          type="date"
          required
        />
        <Input type="submit" value={isLoding ? "Loading..." : "가입하기"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        이미 계정이 있으신가요? <Link to="/login">로그인 &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}
