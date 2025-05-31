import { css } from '@emotion/css';

const ModalHeader = ({ title }: { title: string }) => (
  <section className={headerStyles}>
    {title && <h3 id="modal-title">{title}</h3>}
  </section>
);

export default ModalHeader;

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 24px;
  border-bottom: 1px solid #e0e0e0;
`;
