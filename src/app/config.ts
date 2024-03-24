// use NODE_ENV to not have to change config based on where it's deployed
export const NEXT_PUBLIC_URL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : "https://frameworks2024.vercel.app";

export const CROWDFUND_CONTRACT_ADDR =
  "0x08f27301b4446D4499C7Ec29875649b94C1595E6";

export const BLOCKCHAIN_RPC_URL = "https://sepolia.base.org";
