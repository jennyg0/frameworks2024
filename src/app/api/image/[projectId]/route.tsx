import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";

export const dynamic = "force-dynamic";
export const revalidate = 3600;
export const runtime = "edge";

interface Props {
  params: {
    projectId?: string;
  };
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
  console.log(projectId, "pid");
  const image = (
    <div tw='flex flex-row w-full p-10 items-center justify-center'>
      <h2 tw='flex flex-col text-2xl font-bold tracking-tight text-left text-black'>
        <span>This is an image for project {projectId}</span>
      </h2>
    </div>
  );

  return generateFrameImage(image);
}
