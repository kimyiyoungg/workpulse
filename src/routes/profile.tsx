import { styled } from "styled-components";
import Menu from "../components/menu";
import { auth, db, storage } from "../firebase";
import { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import Select from "react-select";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-left: 250px;
  width: calc(100% - 300px);
  margin-bottom: 15%;
`;

const Logo = styled.img`
  width: 90px;
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 30px;
`;

const AvatarUpload = styled.label`
  width:  100px;
  height: 130px;
  border-radius: 50%;
  background-color: #f1f1f1;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 50px;
  }
`;

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5%;
`;

const AvatarInput = styled.input`
  display: none;
  border-radius: 5%;
`;

const Name = styled.span`
  font-size: 15px;
  font-weight: bold;
`;

const Description = styled.span`
  font-size: 12px;
  
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px; /* 너비를 넓혀서 중앙 배치 */
  gap: 10px;
  
`;

const IntroInput = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SubmitBtn = styled.input`
  background-color: black;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 5px;
  font-size: 13px;
  width: 300px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

export default function Profile() {
  const user = auth.currentUser;
  const [isLoading, setLoading] = useState(false);
  const [myIntro, setMyIntro] = useState(""); // 한줄 소개
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [depertmentSelect, setDepartmentSelect] = useState(""); // 부서

  // 부서 select box
  const departments = [
    { value: '경영기획부', label: '경영기획부' },
    { value: '사업개발부', label: '사업개발부' },
    { value: '사업운영부', label: '사업운영부' },
  ];

  // 컴포넌트가 마운트될 때 Firestore에서 기존 데이터를 가져옵니다.
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;

      const q = query(collection(db, "profile"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // 데이터가 존재하면 상태에 값 설정
        querySnapshot.forEach((docSnap) => {
          const docData = docSnap.data();
          setDepartmentSelect(docData.department || "");
          setMyIntro(docData.introduce || "");
          setAvatar(docData.photo || user?.photoURL); // 사진도 업데이트
        });
      }
    };

    fetchProfileData();
  }, [user]);

  const onIntroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMyIntro(e.target.value);
  };

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `profiles/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvatar(avatarUrl);
      await updateProfile(user, {
        photoURL: avatarUrl,
      });
    }
  };

  const onChangeDepartment = (e: any) => {
    if (e) setDepartmentSelect(e.value);
    else setDepartmentSelect('');
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || depertmentSelect === "") return;

    try {
      setLoading(true);

      // Firestore에서 userId로 프로필 문서 찾기
      const q = query(collection(db, "profile"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // 문서가 이미 존재하면 updateDoc 사용
        querySnapshot.forEach(async (docSnap) => {
          const docRef = doc(db, "profile", docSnap.id);
          await updateDoc(docRef, {
            department: depertmentSelect,
            introduce: myIntro,
            photo: avatar,
          });
        });
        console.log("프로필이 업데이트되었습니다.");
      } else {
        // 문서가 없으면 새로 추가
        const doc = await addDoc(collection(db, "profile"), {
          username: user.displayName || "Anonymous",
          userId: user.uid,
          department: depertmentSelect,
          introduce: myIntro,
          photo: avatar,
          profileCreatedAt: Date.now(),
        });
        console.log("프로필이 저장되었습니다.", doc.id);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Menu />
      <Logo src="/mini-logo.svg" alt="사이트 로고" />
      <Name>
        반갑습니다. {user?.displayName ?? 'Anonymous'}님 프로필을 설정하세요.
      </Name>

      <AvatarWrapper>
        <AvatarUpload htmlFor="avatar">
          {avatar ? (
            <AvatarImg src={avatar} />
          ) : (
            <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          )}
        </AvatarUpload>
        <AvatarInput onChange={onAvatarChange} id="avatar" type="file" accept="image/*" />

        <InputWrapper>
          <Description>부서 선택</Description>
          <Select
            value={departments.find(dep => dep.value === depertmentSelect)} // 부서 초기값 설정
            onChange={onChangeDepartment}
            options={departments}
            placeholder="부서를 선택하세요"
          />
          <Description>한 줄 소개</Description>
          <IntroInput
            value={myIntro}
            onChange={onIntroChange}
            placeholder="한 줄 소개를 입력하세요"
          />
        </InputWrapper>
      </AvatarWrapper>

      <form onSubmit={onSubmit}>
        <SubmitBtn type="submit" value={isLoading ? '저장 중..' : '완료'} />
      </form>
    </Wrapper>
  );
}