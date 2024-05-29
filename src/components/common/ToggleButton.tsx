import React from 'react';

function ToggleButton() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <button
      onClick={() => {
        setIsClicked(!isClicked);
      }}
    >

    </button>
  );
}

export default ToggleButton;
