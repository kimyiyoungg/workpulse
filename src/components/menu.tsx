import { styled } from "styled-components";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaPenToSquare } from "react-icons/fa6";
import { CiChat2 } from "react-icons/ci";
import { GoHome } from "react-icons/go";

const Wrapper = styled.div`
  position: relative;
  // width: 1440px;
  width: 250px;
  height: 1024px;
  background: #ffffff;
  // background-color:white;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  left: 0;
  top: 50px;
  width: 200px;
  height: 100vh;
  background-color: #f8f9fa;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;
const MenuItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #e9ecef;
    border-radius: 8px;
  }

  a {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
  }

  svg {
    min-width: 30px;
    font-size: 24px;
  }
`;
const Logo = styled.img`
  width: 120px; /* 로고 크기 조절 */
  margin-bottom: 20px;
`;
// const user = auth.currentUser;

const menu = () => {
  return (
    <Wrapper>
      <Sidebar>
        <Logo src="/workpulse-logo.svg" alt="로고" />

        <MenuItem>
          <Link to="/login">
            <GoHome size={40} className="cursor-pointer" />홈
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/profile">
            <CgProfile size={40} className="cursor-pointer" />
            프로필
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/board-write">
            <IoDocumentTextOutline size={40} className="cursor-pointer" />
            업무게시판
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/memo">
            <FaPenToSquare size={40} className="cursor-pointer" />
            개인메모
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/chat">
            <CiChat2 size={40} className="cursor-pointer" />
            채팅
          </Link>
        </MenuItem>
      </Sidebar>
    </Wrapper>
  );
};

export default menu;
