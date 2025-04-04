import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const CongratulatuonCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 8px;
  background: #f5f5f5;
  margin-bottom: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  background: #ddd;
  border-radius: 50%;
`;

const Name = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const Department = styled.span`
  font-size: 14px;
  color: #666;
`;

export default function Congratulations() {
  return (
    <Wrapper>
      <Title>경조사</Title>

      <Section>
        <CongratulatuonCard>
          <UserInfo>
            <Avatar />
            <div>
              <Name>박예린 본인 결혼</Name>
              <Department>경영지원팀</Department>
            </div>
          </UserInfo>
        </CongratulatuonCard>
      </Section>

      <Section>
        <CongratulatuonCard>
          <UserInfo>
            <Avatar />
            <div>
              <Name>김이영 본인 결혼</Name>
              <Department>디지털플랫폼사업1팀</Department>
            </div>
          </UserInfo>
        </CongratulatuonCard>
      </Section>
    </Wrapper>
  );
}
