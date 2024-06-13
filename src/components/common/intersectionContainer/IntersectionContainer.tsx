import { ScrollUpButton } from './IntersectionContainer.styled';

import ARROW_UP from '@/assets/arrow_up.svg';

interface IntersectionContainerProp {
  bottomRef: React.RefObject<HTMLDivElement>;
  hasNextPage: boolean;
}

const IntersectionContainer = ({ bottomRef, hasNextPage }: IntersectionContainerProp) => {
  const handleClickScrollTop = () => {
    scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  };

  if (hasNextPage) {
    return <div ref={bottomRef} style={{ height: 100 }}></div>;
  }

  return (
    <ScrollUpButton onClick={handleClickScrollTop}>
      <img src={ARROW_UP} alt="페이지 최상단으로 이동" />
    </ScrollUpButton>
  );
};

export default IntersectionContainer;
