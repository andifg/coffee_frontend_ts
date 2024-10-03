import theme from "../theme";

const DrinkIcon = () => {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      height={32}
      width={32}
    >
      <g strokeWidth={0} />
      <g strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M9 1v8a7 7 0 1 0 14 0V1zm7 15v15m-5 0h10M9 9h14"
        fill="none"
        stroke={theme.palette.primary.main}
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.8}
      />
    </svg>
  );
};

export { DrinkIcon };
