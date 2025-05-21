import { css } from "@emotion/css";
import { useEffect } from "react";

interface ObserverSectionProps {
  handleObserver: (entries: IntersectionObserverEntry[]) => void;
}

const ObserverSection = ({ handleObserver }: ObserverSectionProps) => {
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1 });
    const observerSection = document.getElementById("observerSection");

    if (observerSection) {
      observer.observe(observerSection);
    }
  }, [handleObserver]);

  return <div id="observerSection" className={observerSectionStyles}></div>;
};

export default ObserverSection;

const observerSectionStyles = css`
  height: 100px;
`;
