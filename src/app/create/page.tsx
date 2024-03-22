import { getFrameMetadata } from "@coinbase/onchainkit/frame";
import type { Metadata } from "next";
import { NEXT_PUBLIC_URL } from "../config";

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      action: "tx",
      label: "support this project",
      target: `${NEXT_PUBLIC_URL}/api/buttonclicker`,
    },
  ],
  input: {
    text: "support amount in eth",
  },
  image: {
    src: `${NEXT_PUBLIC_URL}/next.svg`,
    aspectRatio: "1:1",
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/aftertx`,
});

export const metadata: Metadata = {
  title: "Funding the Future",
  description: "Discover and fund the next big thing.",
  openGraph: {
    title: "Funding the Future",
    description: "Discover and fund the next big thing.",
    images: [`${NEXT_PUBLIC_URL}/next.svg`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        hello
      </div>
    </main>
  );
}
