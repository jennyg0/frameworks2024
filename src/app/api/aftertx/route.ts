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
        {
          label: `Tx: ${body?.untrustedData?.transactionId || "--"}`,
        },
        {
          action: "link",
          label: "support more campaigns",
          target: `${NEXT_PUBLIC_URL}/campaigns`,
        },
      ],
      image: {
        src: `${NEXT_PUBLIC_URL}/thanks.webp`,
        aspectRatio: "1:1",
      },

      postUrl: `${NEXT_PUBLIC_URL}/api/aftertx`,
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
