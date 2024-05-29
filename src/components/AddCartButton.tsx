import React, { useState } from 'react';

function AddCartButton() {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  return isClicked ? (
    <button onClick={handleClick}>빼기</button>
  ) : (
    <button onClick={handleClick}>담기</button>
  );
}



export default AddCartButton;
