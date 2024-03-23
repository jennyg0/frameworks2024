import { getFrameMetadata } from "@coinbase/onchainkit/frame";
import type { Metadata } from "next";
import { NEXT_PUBLIC_URL } from "../../config";

interface Props {
  params: {
    projectId: string;
  };
}

// TODO update these values depending on project
const title = "fund";
const description = "funding for project";

export const generateMetadata = async ({ params: { projectId } }: Props) => {
  const imageURL = new URL(`${NEXT_PUBLIC_URL}/api/jobs`);
  imageURL.searchParams.append("projectId", projectId);

  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        action: "tx",
        label: "support this project",
        target: `${NEXT_PUBLIC_URL}/api/pledge`,
      },
    ],
    input: {
      text: "support amount in eth",
    },
    image: {
      src: `${NEXT_PUBLIC_URL}/api/image/${projectId}`,
      aspectRatio: "1.91:1",
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/aftertx`,
  });

  return {
    metadataBase: new URL(`${NEXT_PUBLIC_URL}/${projectId}`),
    title,
    description,
    openGraph: {
      title,
      description,
      images: [imageURL],
    },
    other: {
      ...frameMetadata,
    },
  };
};

export default function Home({ params: { projectId } }: Props) {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        project id : {projectId}
      </div>
    </main>
  );
}
