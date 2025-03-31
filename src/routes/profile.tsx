import { styled } from "styled-components";
import Menu from "../components/menu";
import { auth, storage } from "../firebase";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
// import { CgProfile } from "react-icons/cg";

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  flex-direction: column;
  // justify-content: center;
  // height: 100vh;
  margin-left: 250px;
  width: calc(100% - 250px);
`;

const Logo = styled.img`
  width: 110px; /* 로고 크기 조절 */
  margin-bottom: 30px; /* 버튼과 간격 조절 */
`;

const AvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
  border-radius: 10%;
  background-color: #f1f1f1;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg{
    width: 50px;
  }
`;
const AvatarImg = styled.img`
  width: 100%;
`;
const AvatarInput = styled.input`
  display: none;
`;

const Name = styled.span`
  font-size: 22px;
`;

export default function Profile() {

  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const onAvatarChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target;
    if(!user) return;
    if(files && files.length === 1){
      const file = files[0];
      const locationRef = ref(storage, `profiles/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvatar(avatarUrl);
      await updateProfile(user, {
        photoURL: avatarUrl,
      })
    }
  }
  return (
    <Wrapper>
      <Menu />
      <Logo src="/mini-logo.svg" alt="사이트 로고" />
      <Name>
        반갑습니다. {user?.displayName ?? "Anonymous"} 님 프로필을 설정하세요.
      </Name>
      <AvatarUpload htmlFor="avatar">
        {avatar ? (
          <AvatarImg src={avatar}/>
        ):(
          <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          // <CgProfile size={40} className="cursor-pointer" />
        )}
      </AvatarUpload>
      <AvatarInput onChange = {onAvatarChange} id="avatar" type="file" accept="image/*"  />
      
    </Wrapper>
  );
}
