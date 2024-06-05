const ShopIconWithNumberSVG = ({ num }: { num: number }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" fill="#F5F5F5" />
      <rect
        width="430"
        height="936"
        transform="translate(-373.5 -16)"
        fill="white"
      />
      <rect
        width="429"
        height="64"
        transform="translate(-373 -16)"
        fill="black"
      />
      <path
        d="M16 4C15.1902 4 14.4369 4.21154 13.7401 4.63462C13.0433 5.03846 12.4878 5.59615 12.0734 6.30769C11.678 7.01923 11.4802 7.78846 11.4802 8.61538V9.53846H7.01695L6.96045 10.4038L6 28H26L25.0395 10.4038L24.9831 9.53846H20.5198V8.61538C20.5198 7.78846 20.3126 7.01923 19.8983 6.30769C19.5028 5.59615 18.9567 5.03846 18.2599 4.63462C17.5631 4.21154 16.8098 4 16 4ZM16 5.84615C16.7533 5.84615 17.3936 6.11538 17.9209 6.65385C18.4482 7.19231 18.7119 7.84615 18.7119 8.61538V9.53846H13.2881V8.61538C13.2881 7.84615 13.5518 7.19231 14.0791 6.65385C14.6064 6.11538 15.2467 5.84615 16 5.84615ZM8.71186 11.3846H11.4802V14.1538H13.2881V11.3846H18.7119V14.1538H20.5198V11.3846H23.2881L24.0791 26.1538H7.9209L8.71186 11.3846Z"
        fill="white"
      />
      <text
        x="22.5"
        y="25.5"
        textAnchor="middle"
        fontSize="10"
        fontWeight="bold"
        fill="black"
      >
        {num}
      </text>
    </svg>
  );
};

export default ShopIconWithNumberSVG;
