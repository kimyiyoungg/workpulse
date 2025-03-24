// import { useEffect, useState } from "react";
// import styled from "styled-components";
// import { auth, db } from "../firebase";

// import {
//   collection,
//   limit,
//   onSnapshot,
//   orderBy,
//   query,
//   where,
// } from "firebase/firestore";


// import MemoList from "./memo-list";
// import { Unsubscribe } from "firebase/auth";

// export interface IMemo {
//     id: string;
//     photo: string;
//     memoes: string;
//     userId: string;
//     username: string;
//     createAt: number;

    
// }

// const Wrapper = styled.div`

//   margin-top: 50px;
//   display: flex;
//   flex-direction: column;
//   cursor: pointer;
//   // overflow-y:scroll;
//   // scrollbar-width: none;

// `;

// interface TimelineProps {
//     setMemoToEdit: (memo: string) => void;
//   }

// export default function Timeline({ setMemoToEdit }: TimelineProps){
//     const [memoes, setMemo] = useState<IMemo[]>([]);
//     const user = auth.currentUser;

//     useEffect(()=>{
//         let unsubscribe: Unsubscribe | null = null;
//         const fetchMemoes = async() => {
//             const memoesQuery = query(
//                 collection(db, "memoes"),
//                 where("userId","==",user?.uid),
//                 orderBy("createdAt","desc"),
//                 limit(25)
//             );
//             // const spanshot = await getDocs(memoesQuery);
//             // // spanshot.docs.map((doc) => console.log(doc.data()));
//             // const memoes = spanshot.docs.map((doc) => {
//             //     const {memoes, createAt, userId, username, photo} = doc.data();
//             //     return {
//             //         memoes, createAt, userId, username, photo,
//             //         id: doc.id,
//             //     }
//             // });
//             unsubscribe = await onSnapshot(memoesQuery,(snapshot)=>{
//                 const memoes = snapshot.docs.map((doc) => {
//                     const {memoes, createAt, userId, username, photo} = doc.data();
//                     return {
//                         memoes, createAt, userId, username, photo,
//                         id: doc.id,
//                     };
//                 });
//                 setMemo(memoes);
//             });
            
//         }
//         fetchMemoes();
//         return () => {
//             unsubscribe && unsubscribe();
//         };
//     }, [user?.uid]);

     

    
//     // return <Wrapper>{JSON.stringify(memoes)}</Wrapper>;
//     // return <Wrapper>{memoes.map(memoes => <MemoList key={memoes.id}{...memoes}/>)}</Wrapper>;
//     return (
//         <Wrapper>
//             {/* {memoes.map((memo) => (
//                 <MemoList setMemoToEdit={function (memo: string): void {
//                     throw new Error("Function not implemented.");
//                 } } key={memo.id} {...memo}/> */}
//             {memoes.map((memo) => (
//                 <MemoList
//                     key={memo.id}
//                     {...memo}
//                      setMemoToEdit={setMemoToEdit} // setMemoToEdit을 전달
//                  />                       
//             ))}
//         </Wrapper>
//     );

// }

import { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import MemoList from "./memo-list";
import { Unsubscribe } from "firebase/auth";

export interface IMemo {
  id: string;
  photo: string;
  memoes: string;
  userId: string;
  username: string;
  createdAt: number;
}

const Wrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

interface TimelineProps {
  setMemoToEdit: (memo: string) => void;
}

export default function Timeline({ setMemoToEdit }: TimelineProps) {
  const [memoes, setMemo] = useState<IMemo[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchMemoes = async () => {
      const memoesQuery = query(
        collection(db, "memoes"),
        where("userId", "==", user?.uid),
        orderBy("createdAt", "desc"),
        limit(25)
      );

      unsubscribe = onSnapshot(memoesQuery, (snapshot) => {
        const memoes = snapshot.docs.map((doc) => {
          const { memoes, createdAt, userId, username, photo } = doc.data();
          return {
            memoes,
            createdAt,
            userId,
            username,
            photo,
            id: doc.id,
          };
        });
        setMemo(memoes);
      });
    };
    fetchMemoes();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [user?.uid]);

  return (
    <Wrapper>
      {memoes.map((memo) => (
        <MemoList
          key={memo.id}
          {...memo}
          setMemoToEdit={setMemoToEdit} // setMemoToEdit을 전달
        />
      ))}
    </Wrapper>
  );
}
