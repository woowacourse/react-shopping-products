import styled from "@emotion/styled";

const S = {
  Container: styled.div`
    box-sizing: border-box;
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  `,

  Total: styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-weight: 700;
  `,

  TotalLabel: styled.div`
    font-size: 16px;
  `,
  TotalPrice: styled.div`
    font-size: 24px;
  `,
};

export default S;
