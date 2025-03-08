import styled from "styled-components";
import { IMemo } from "./timeline";

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 20px;
    border: 1px solid rgba(255,255,255,0.5);
    border-radius: 15px;
`;

const Column = styled.div``;

const Photo = styled.img``;

const Username = styled.span``;

const Payload = styled.p``;


export default function MemoList({username, photo, memoes}:IMemo){
    return <Wrapper>
        <Column>
            <Username>{username}</Username>
            <Payload>{memoes}</Payload>
        </Column>
        {photo? <Column>
            <Photo src={photo}/>
        </Column> : null}
    </Wrapper>
}