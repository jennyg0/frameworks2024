import { NextRequest } from "next/server";

import { ImageResponse } from "@vercel/og";
// import { SECONDS_DURATION } from "@/utils/shared/seconds";

export const dynamic = "error";
export const revalidate = 3600;
export const runtime = "edge";

export const FRAME_IMAGE_DIMENSIONS = {
  width: 1200,
  height: 630,
};

export const generateFrameImage = async (content: React.ReactNode) => {
  const imageResponse = new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          width: "100%",
          height: "100vh",
          backgroundColor: "white",
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

export async function GET(
  _request: NextRequest,
  { params }: { params: { index: number } }
) {
  const images = [
    <div tw='flex flex-col w-full h-full items-center justify-center bg-white'>
      <div tw='flex w-full h-full text-white bg-blue'>
        <div tw='flex flex-row w-full p-15 items-center justify-center'>
          <h2 tw='flex flex-col text-8xl font-bold tracking-tight text-left px-10'>
            <span>This is an example dynamic image</span>
          </h2>
        </div>
      </div>
    </div>,
    <div tw='flex flex-col w-full h-full items-center justify-center bg-white'>
      <div tw='flex w-full h-full text-white bg-blue'>
        <div tw='flex flex-row w-full p-15 items-center justify-center'>
          <h2 tw='flex flex-col text-8xl font-bold tracking-tight text-left px-10'>
            <span>This is another example dynamic image</span>
          </h2>
        </div>
      </div>
    </div>,
    <div tw='flex flex-col w-full h-full items-center justify-center bg-white'>
      <div tw='flex w-full h-full text-white bg-blue'>
        <div tw='flex flex-row w-full p-15 items-center justify-center'>
          <h2 tw='flex flex-col text-8xl font-bold tracking-tight text-left px-10'>
            <span>This is another another example dynamic image</span>
          </h2>
        </div>
      </div>
    </div>,
  ];

  return generateFrameImage(images[params.index]);
}
