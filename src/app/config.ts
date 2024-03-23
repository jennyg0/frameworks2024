// use NODE_ENV to not have to change config based on where it's deployed
export const NEXT_PUBLIC_URL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : "https://prod-link.vercel.app";

export const CROWDFUND_CONTRACT_ADDR =
  "0x392F6E583F0836Fd4ceC63D72eF4A24564810308";
