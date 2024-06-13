import ReactDom from "react-dom";

const Portal = ({ children }) => {
  return ReactDom.createPortal(children, document.body);
};

export default Portal;
