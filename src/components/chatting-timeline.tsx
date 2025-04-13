import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { db } from "../firebase";
import ChattingList from "./chatting-list";

export interface IChatting {
  id: string;
  chatting: string;
  userId: string;
  username: string;
  createdAt: number;
}

const Wrapper = styled.div``;

export default function Chattingtimeline() {
  const [chattings, setchattings] = useState<IChatting[]>([]);
  const fetchChattings = async () => {
    const chattingsQuery = query(
      collection(db, "chatting"),
      orderBy("createdAt", "asc")
    );
    const spanshot = await getDocs(chattingsQuery);
    const chattings = spanshot.docs.map((doc) => {
    const {chatting, createdAt, userId, username} = doc.data();
      return {
        chatting,
        createdAt,
        userId,
        username,
        id: doc.id,
      };
    });
    setchattings(chattings);
  };
  useEffect(() => {
    fetchChattings();
  }, []);
  return (
    <Wrapper>
      {chattings.map((chattings) => (
        <ChattingList key={chattings.id} {...chattings} />
      ))}
    </Wrapper>
  );
}