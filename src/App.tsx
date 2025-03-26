import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LodingScreen from "./components/loding-screen";
import { auth } from "./firebase";
import styled from "styled-components";
import ProtectedRoute from "./components/protected-route";
import StartHome from "./routes/startHome";
import Memo from "./routes/memo";
// import PostBoardForm from "./components/post-board-form";
import BoardWrite from "./routes/board-write";
import Profile from "./routes/profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      // {
      //   path: "profile",
      //   element: <Profile />,
      // },
    ],
  },
  {
    path: "/profile",
    element: <Profile/>
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/startHome",
    element: <StartHome />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
  {
    path: "/memo",
    element: <Memo />,
  },
  {
    path: "/board-write",
    element: <BoardWrite />,
  },
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  *{
    box-sizing:border-box;
  }
  body{
    background-color: white;
    color: black;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  weight: 100vw;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoding, setLoding] = useState(true);
  const init = async () => {
    //firebase 로딩 : 로그인 여부와 유저가 누구인지 체크하는 동안
    await auth.authStateReady(); //Firebase가 쿠키와 토큰을 읽고 백엔드와 소통해서 로그인 여부를 확인하는 동안 기다림
    //setTimeout(() => setLoding(false), 2000)
    setLoding(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <Wrapper>
      <GlobalStyles />
      {isLoding ? <LodingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App;
