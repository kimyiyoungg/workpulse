import { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { collection, getDocs, orderBy, query,where } from "firebase/firestore";
import MemoList from "./memo-list";

export interface IMemo {
    id: string;
    photo: string;
    memoes: string;
    userId: string;
    username: string;
    createAt: number;

    
}

const Wrapper = styled.div`
    overflow-y:scroll;
    scrollbar-width: none;
`;


export default function Timeline(){
    const [memoes, setMemo] = useState<IMemo[]>([]);
    const user = auth.currentUser;
    const fetchMemoes = async() => {
        const memoesQuery = query(
            collection(db, "memoes"),
            where("userId","==",user?.uid),
            orderBy("createdAt","desc")
        );
        const spanshot = await getDocs(memoesQuery);
        // spanshot.docs.map((doc) => console.log(doc.data()));
        const memoes = spanshot.docs.map((doc) => {
            const {memoes, createAt, userId, username, photo} = doc.data();
            return {
                memoes, createAt, userId, username, photo,
                id: doc.id,
            }
        });
        setMemo(memoes);
    }
    useEffect(()=>{
        fetchMemoes();
    })
    // return <Wrapper>{JSON.stringify(memoes)}</Wrapper>;
    return <Wrapper>{memoes.map(memoes => <MemoList key={memoes.id}{...memoes}/>)}</Wrapper>;
}