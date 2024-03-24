import { getFrameMetadata } from "@coinbase/onchainkit/frame";
import { NEXT_PUBLIC_URL } from "../../config";
import dynamic from "next/dynamic";

const CampaignReader = dynamic(() => import("@/app/component/CampaignReader"), {
  ssr: false,
});

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
      text: "amount in base sepolia",
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
      <CampaignReader projectId={projectId} />
    </main>
  );
}
