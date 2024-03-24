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

  const formattedGoal = formatBigInt(data[2]);
  const formattedPledged = formatBigInt(data[3]);

  const currentTime = Math.floor(Date.now() / 1000);
  const timeLeftInSeconds = data[5] - currentTime;

  const days = Math.floor(timeLeftInSeconds / (3600 * 24));
  const hours = Math.floor((timeLeftInSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((timeLeftInSeconds % 3600) / 60);

  const timeLeftString = `${days} days, ${hours} hours, ${minutes} minutes left`;

  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        project title : {data[0]} <br />
        description: {data[1]} <br />
        funding goal: {formattedGoal}
        <br />
        amount pledged: {formattedPledged} <br />
        time left: {timeLeftString}
      </div>
    </div>
  );
};

export default CampaignReader;
