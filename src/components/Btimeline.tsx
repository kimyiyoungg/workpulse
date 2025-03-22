import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Board from "./board";

export interface IBoard {
  id: string;
  photo?: string;
  board: string;
  userId: string;
  username: string;
  createdAt: number;
}

const Wrapper = styled.div``;

export default function Btimeline() {
  const [boards, setboard] = useState<IBoard[]>([]);
  const fetchBoards = async () => {
    const boardsQuery = query(
      collection(db, "board"),
      orderBy("createdAt", "desc")
    );
    const spanshot = await getDocs(boardsQuery);
    const boards = spanshot.docs.map((doc) => {
      const { board, createdAt, userId, username, photo } = doc.data();
      return {
        board,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
      };
    });
    setboard(boards);
  };
  useEffect(() => {
    fetchBoards();
  }, []);
  return (
    <Wrapper>
      {boards.map((board) => (
        <Board key={board.id} {...board} />
      ))}
    </Wrapper>
  );
}
