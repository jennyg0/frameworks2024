// use NODE_ENV to not have to change config based on where it's deployed
export const NEXT_PUBLIC_URL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : "https://frameworks2024.vercel.app";

export const CROWDFUND_CONTRACT_ADDR =
  "0xc1F250dA9503Ce0be51a362cE1C0590Df0Eb42e1";

export const BLOCKCHAIN_RPC_URL = "https://sepolia.base.org";

// "https://rpc.notadegen.com/base/sepolia";
