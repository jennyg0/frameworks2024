import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData, formatEther, parseEther, parseGwei } from "viem";
import { baseSepolia } from "viem/chains";
import type { FrameTransactionResponse } from "@coinbase/onchainkit/frame";
import CrowdFundABI from "../../../contract/abi";
import { CROWDFUND_CONTRACT_ADDR } from "../../config";

interface Props {
  params: {
    projectId?: string;
  };
}

async function getResponse(
  req: NextRequest,
  { params }: Props
): Promise<NextResponse | Response> {
  const body: FrameRequest = await req.json();
  const { projectId } = params;
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: "NEYNAR_ONCHAIN_KIT",
  });

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  const amount = message.input || "";

  const data = encodeFunctionData({
    abi: CrowdFundABI,
    functionName: "pledge",
    args: [BigInt(1), parseEther(amount) || parseEther("0.001")],
  });

  const txData: FrameTransactionResponse = {
    chainId: `eip155:${baseSepolia.id}`,
    method: "eth_sendTransaction",
    params: {
      abi: [],
      data,
      to: CROWDFUND_CONTRACT_ADDR,
      value: parseEther(amount).toString(),
    },
  };

  return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
  const url = new URL(req.url);
  const projectId = url.searchParams.get("projectId") || undefined;

  const props: Props = { params: { projectId } };

  return getResponse(req, props);
}

export const dynamic = "force-dynamic";
