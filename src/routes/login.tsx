import { useState } from "react";
// import styled from "styled-components";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  Form,
  Input,
  Switcher,
  OurLogo,
  Wrapper,
  Error,
} from "../components/auth-components";
import GoogleButton from "../components/google-btn";

export default function Login() {
  const user = auth.currentUser;
  if (user) {
    return <Navigate to="/" />;
  }
  const navigate = useNavigate();
  const [isLoding, setLoding] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "userEmail") {
      setUserEmail(value);
    } else if (name === "userPassword") {
      setUserPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (isLoding || userEmail === "" || userPassword === "") return;
    try {
      setLoding(true);
      await signInWithEmailAndPassword(auth, userEmail, userPassword);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        // console.log(e.code, e.message);
        setError(e.message);
      }
    } finally {
      setLoding(false);
    }
  };
  //테스트
  return (
    <Wrapper>
      {/* 주임님 중앙정렬 어케해 */}
      <Form>
        <OurLogo src="/workpulse-logo.svg" />
      </Form>

      <Form onSubmit={onSubmit}>
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
          name="userPassword"
          value={userPassword}
          placeholder="비밀번호"
          type="password"
          required
        />
        <Input type="submit" value={isLoding ? "Loading..." : "로그인"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}

      <GoogleButton></GoogleButton>

      <Switcher>
        계정이 존재하지 않으신가요?{" "}
        <Link to="/create-account">가입하기 &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}
