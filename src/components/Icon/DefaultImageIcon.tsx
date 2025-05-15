function DefaultImageIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 184 112">
      <rect width="184" height="112" fill="#F5F5F5" rx="4" ry="4" />

      <g fill="#D0D0D0">
        <rect
          x="46"
          y="22"
          width="92"
          height="58"
          rx="4"
          ry="4"
          stroke="#B0B0B0"
          strokeWidth="2"
          fill="none"
        />

        <path d="M46 62 L70 38 L89 57 L113 33 L138 62 L138 76 L46 76 Z" />

        <circle cx="116" cy="28" r="8" />
      </g>

      <text
        x="92"
        y="96"
        fontFamily="Arial, sans-serif"
        fontSize="10"
        textAnchor="middle"
        fill="#888888"
      >
        이미지가 없습니다
      </text>
    </svg>
  );
}

export default DefaultImageIcon;
