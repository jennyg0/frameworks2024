import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";
import { NEXT_PUBLIC_URL } from "../../config";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: "NEYNAR_ONCHAIN_KIT",
  });

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        // {
        //   action: "tx",
        //   label: "Click Again!",
        //   target: `${NEXT_PUBLIC_URL}/api/pledge`,
        // },
        {
          label: `Tx: ${body?.untrustedData?.transactionId || "--"}`,
        },
        // {
        //   action: "link",
        //   label: "Leaderboard",
        //   target: `${NEXT_PUBLIC_URL}/buttonclicker`,
        // },
      ],
      image: {
        src: `${NEXT_PUBLIC_URL}/button.webp`,
        aspectRatio: "1:1",
      },
      // input: {
      //   text: "Noooo, why did you click!?",
      // },
      postUrl: `${NEXT_PUBLIC_URL}/api/aftertx`,
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
