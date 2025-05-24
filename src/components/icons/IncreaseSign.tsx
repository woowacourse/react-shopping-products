const IncreaseSign = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none" {...props}>
      <path
        d="M1.5 7H13.5M7.5 13V1"
        stroke="#363636"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default IncreaseSign;
