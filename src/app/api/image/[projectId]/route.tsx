import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";
import { ethers } from "ethers";
import { CROWDFUND_CONTRACT_ADDR, BLOCKCHAIN_RPC_URL } from "../../../config";
import CrowdFundABI from "@/contract/abi";

export const dynamic = "force-dynamic";
// export const revalidate = 3600;
// export const runtime = "edge";

export const runtime = "experimental-edge";

interface Props {
  params: {
    projectId?: string;
  };
}

function formatBigInt(value: any, decimals = 0) {
  return Number(value / BigInt(10 ** decimals)).toString();
}

const FRAME_IMAGE_DIMENSIONS = {
  width: 600,
  height: 330,
};

const generateFrameImage = async (content: React.ReactNode) => {
  const imageResponse = new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          width: "100%",
          height: "100%",
          background: "blue",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            lineHeight: 1.2,
            fontSize: 36,
            color: "black",
            flex: 1,
            overflow: "hidden",
          }}
        >
          {content}
        </div>
      </div>
    ),
    FRAME_IMAGE_DIMENSIONS
  );
  return imageResponse;
};

export async function GET(_request: NextRequest, { params }: Props) {
  const { projectId } = params;

  if (!projectId) {
    return new Response("Project ID is required", { status: 400 });
  }

  const provider = new ethers.JsonRpcProvider(BLOCKCHAIN_RPC_URL);
  const contract = new ethers.Contract(
    CROWDFUND_CONTRACT_ADDR,
    CrowdFundABI,
    provider
  );

  try {
    const result = await contract.getCampaign(Number(projectId));

    const data = {
      title: result[0],
      description: result[1],
      goal: formatBigInt(result[2]),
      pledged: formatBigInt(result[3]),
      startAt: Number(result[4]),
      endAt: Number(result[5]),
      claimed: result[6],
    };

    const formattedGoal = parseInt(data.goal, 10);
    const formattedPledged = parseInt(data.pledged, 10);
    const percentCompleted = Math.min(
      (formattedPledged / formattedGoal) * 100,
      100
    );

    const currentTime = Number(Math.floor(Date.now() / 1000));
    const timeLeftInSeconds = data.endAt - currentTime;
    const seconds = Number(timeLeftInSeconds);
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    const timeLeftString = `${days} days, ${hours} hours, ${minutes} minutes left`;

    const image = (
      <div tw='flex flex-col w-full h-full items-center justify-center bg-white'>
        <div tw='flex flex-col text-2xl font-bold tracking-tight text-left p-2'>
          <p>project: {data.title}</p>
        </div>
        <div tw='flex flex-col text-base font-bold tracking-tight text-left px-2'>
          funding goal progress: {percentCompleted}%
        </div>
        <div tw='flex flex-col text-base font-bold tracking-tight text-left px-2'>
          time left: {timeLeftString}
        </div>
      </div>
    );

    return generateFrameImage(image);
  } catch (error) {
    console.error("Error fetching campaign data:", error);
    return new Response("Error fetching campaign data from the blockchain.", {
      status: 500,
    });
  }
}
