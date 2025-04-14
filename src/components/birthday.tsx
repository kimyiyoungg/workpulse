import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  padding: 16px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-top: 20px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const BirthdayCard = styled.div`
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

export default function BirthdayList() {
  return (
    <Wrapper>
      <Title>🎉 생일을 축하해주세요.</Title>

      <Section>
        <SectionTitle>오늘 생일</SectionTitle>
        <BirthdayCard>
          <UserInfo>
            <Avatar />
            <div>
              <Name>박예린 주임 🎂</Name>
              <Department>경영지원팀</Department>
            </div>
          </UserInfo>
        </BirthdayCard>
      </Section>

      <Section>
        <SectionTitle>이번 주 생일</SectionTitle>
        <BirthdayCard>
          <UserInfo>
            <Avatar />
            <div>
              <Name>김이영 주임 🎂</Name>
              <Department>디지털플랫폼사업1팀</Department>
            </div>
          </UserInfo>
        </BirthdayCard>
      </Section>
    </Wrapper>
  );
}
