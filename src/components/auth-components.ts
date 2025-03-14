import { styled } from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 420px;
  padding: 50px 20px;

`;

export const Title = styled.form`
  font-size: 20px;
  font-weight: 900;
`;

export const Form = styled.form`
  margin-top: 30px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const Input = styled.input`
  padding: 10px 25px;
  border-radius: 5px;
  border: solid gray;
  border-width: 2px 2px 2px 2px ;
  width: 100%;
  font-size:16px;
  &[type="submit"]{
    background-color:black;
    color: white;
    cursor: pointer;
    font-size:16px;
    &:hover{
      opacity: 0.8
    }
    }
`;

export const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

export const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: #1d9bf0;
  }
`;

export const OurLogo = styled.img`
height: 150px;
width: 200px;
margin-bottom: 20px;
position: relative;
`; 