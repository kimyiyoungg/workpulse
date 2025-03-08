import { styled } from "styled-components";
import PostMemoForm from "../components/post-memo-form";
import Timeline from "../components/timeline";

const Wrapper = styled.div`
  display: grid;
  gap: 50px;
  overflow-y:scroll;
  gird-template-rows: 1fr 5fr;
`;

export default function Memo(){
    return (
        <Wrapper>
            <PostMemoForm/>
            <Timeline/>
        </Wrapper>
    );
}