import { ScrollUpButton } from './IntersectionContainer.styled';

import ARROW_UP from '@/assets/arrow_up.svg';

interface IntersectionContainerProp {
  bottomRef: React.RefObject<HTMLDivElement>;
  isNextPage: boolean;
}

const IntersectionContainer = ({ bottomRef, isNextPage }: IntersectionContainerProp) => {
  const handleClickScrollTop = () => {
    scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {isNextPage ? (
        <div ref={bottomRef} style={{ height: 100 }}></div>
      ) : (
        <ScrollUpButton onClick={handleClickScrollTop}>
          <img src={ARROW_UP} alt="페이지 최상단으로 이동" />
        </ScrollUpButton>
      )}
    </>
  );
};

export default IntersectionContainer;
