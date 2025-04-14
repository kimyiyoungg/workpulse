import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db, auth } from "../firebase";
import { IBoard } from "./Btimeline";
import { styled } from "styled-components";
import Modal from "react-modal";

const Wrapper = styled.div`
  width: 100%;
  padding: 16px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-top: 20px;
`;
const Contents = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: #333;
`;
const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const CongratulatuonCard = styled.div`
  padding: 12px 16px;
  border-radius: 10px;
  background: #f9f9f9;
  margin-bottom: 12px;
  font-size: 15px;
  line-height: 1.4;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #eee;
  }
`;

export default function Congratulations() {
  const [boards, setBoards] = useState<IBoard[]>([]);
  useEffect(() => {
    const fetchBoards = async () => {
      const q = query(
        collection(db, "congratulations"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        ...(doc.data() as IBoard),
        id: doc.id,
      }));
      setBoards(data);
    };

    fetchBoards();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<IBoard | null>(null);

  const openModal = (board: IBoard) => {
    setSelectedBoard(board);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBoard(null);
    setIsModalOpen(false);
  };
  return (
    <Wrapper>
      <Title>경조사 알림</Title>
      {boards.map((item) => (
        <CongratulatuonCard key={item.id}>
          <Contents
            onClick={() => openModal(item)}
            style={{ cursor: "pointer" }}
          >
            {item.title}
          </Contents>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1000,
              },
              content: {
                maxWidth: "500px",
                width: "90%",
                margin: "auto",
                padding: "24px",
                borderRadius: "16px",
                backgroundColor: "#fff",
                border: "none",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                position: "relative", // 작성자 위치 고정을 위해 필요!
              },
            }}
            ariaHideApp={false}
          >
            {selectedBoard && (
              <div>
                <p
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "24px",
                    fontSize: "13px",
                    color: "#999",
                  }}
                >
                  작성자: {selectedBoard.username}
                </p>

                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    marginBottom: "12px",
                    paddingRight: "100px",
                  }}
                >
                  {selectedBoard.title}
                </h2>
                <p
                  style={{
                    fontSize: "15px",
                    marginBottom: "10px",
                    lineHeight: "1.6",
                  }}
                >
                  {selectedBoard.board}
                </p>
                {selectedBoard.photo && (
                  <img
                    src={selectedBoard.photo}
                    alt="첨부 이미지"
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      marginTop: "10px",
                      objectFit: "cover",
                    }}
                  />
                )}
                <div style={{ textAlign: "right", marginTop: "20px" }}>
                  <button
                    onClick={closeModal}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#555",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    닫기
                  </button>
                </div>
              </div>
            )}
          </Modal>
        </CongratulatuonCard>
      ))}
    </Wrapper>
  );
}
