import { styled } from "styled-components";

const Wrapper = styled.div`
  heightL 100vh;
  display: flex;
  justify-content:center;
  align-items:center;
`;

const Text = styled.span`
  font-size: 24px;
`;

export default function LodingScreen() {
  return (
    <Wrapper>
      <Text>Loading...</Text>
    </Wrapper>
  );
}
