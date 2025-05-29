import styled from '@emotion/styled';

interface PriceSummaryProps {
  label: string;
  amount: number;
}

const PriceSummary = ({ label, amount }: PriceSummaryProps) => {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Amount>{amount.toLocaleString()}원</Amount>
    </Wrapper>
  );
};

export default PriceSummary;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  border-top: 1px solid #ddd;
`;

const Label = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const Amount = styled.span`
  font-size: 20px;
  font-weight: bold;
`;
