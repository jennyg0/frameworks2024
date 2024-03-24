// use NODE_ENV to not have to change config based on where it's deployed
export const NEXT_PUBLIC_URL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : "https://frameworks2024.vercel.app";

export const CROWDFUND_CONTRACT_ADDR =
  "0xf045bdAfa3e9AD5dEC1573494520Db1FeA7D7f13";

export const BLOCKCHAIN_RPC_URL = "https://sepolia.base.org";

// "https://rpc.notadegen.com/base/sepolia";
