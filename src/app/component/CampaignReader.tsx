"use client";
import { useReadContract } from "wagmi";
import CrowdFundABI from "@/contract/abi";
import { CROWDFUND_CONTRACT_ADDR } from "../config";

interface CampaignReaderProps {
  projectId: string;
}

interface CampaignData {
  title: string;
  description: string;
  goal: bigint;
  pledged: bigint;
  startAt: number;
  endAt: number;
  claimed: boolean;
}

function formatBigInt(value: bigint, decimals = 0): string {
  return (value / BigInt(10 ** decimals)).toString();
}

const CampaignReader: React.FC<CampaignReaderProps> = ({ projectId }) => {
  const {
    data: campaign,
    isLoading,
    error,
  } = useReadContract({
    abi: CrowdFundABI,
    address: CROWDFUND_CONTRACT_ADDR,
    functionName: "getCampaign",
    args: [Number(projectId)],
  });

  const data = campaign as any;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>no data</div>;

  const goalBigInt = data[2];
  const pledgedBigInt = data[3];

  const formattedGoal = formatBigInt(goalBigInt);
  const formattedPledged = formatBigInt(pledgedBigInt);

const progressPercentage = Math.min(
  100,
  (Number(pledgedBigInt) / Number(goalBigInt)) * 100
);

  const currentTime = Math.floor(Date.now() / 1000);
  const timeLeftInSeconds = data[5] - currentTime;

  const days = Math.floor(timeLeftInSeconds / (3600 * 24));
  const hours = Math.floor((timeLeftInSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((timeLeftInSeconds % 3600) / 60);

  const timeLeftString = `${days} days, ${hours} hours, ${minutes} minutes left`;

  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-6 py-24'>
      <div className='space-y-4 z-10 max-w-5xl w-full bg-white shadow-xl rounded-lg p-8'>
        <h1 className='text-2xl font-bold text-gray-800'>{data[0]}</h1>
        <h2 className='text-xl font-semibold text-gray-800'>Description</h2>
        <p className='text-gray-600'>{data[1]}</p>
        <div>
          <h2 className='text-lg font-semibold text-gray-800'>
            Funding Progress
          </h2>
          <div className='w-full bg-gray-200 rounded-full h-6 dark:bg-gray-700'>
            <div
              className='bg-green-600 h-6 rounded-full'
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className='flex justify-between text-sm font-medium mt-2 text-gray-600'>
            <span>{formattedPledged} pledged</span>
            <span>Goal: {formattedGoal}</span>
          </div>
        </div>
        <h2 className='text-xl font-semibold text-gray-800'>Time Left</h2>
        <p className='text-gray-600'>{timeLeftString}</p>
      </div>
    </div>
  );
};

export default CampaignReader;
