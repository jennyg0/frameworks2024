"use client";
import { useState } from "react";
import {
  type BaseError,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import CampaignContractABI from "../../contract/abi";
import { useWallets } from "@privy-io/react-auth";
import { baseSepolia } from "viem/chains";

export default function CampaignComponent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [monthlyGoal, setMonthlyGoal] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const ninetyDaysLater = new Date(
    new Date().setDate(new Date().getDate() + 90)
  )
    .toISOString()
    .split("T")[0];

  const { wallets } = useWallets();
  const {
    status,
    data: hash,
    error,
    isPending,
    writeContract,
  } = useWriteContract();

  // async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   console.log("wallets", wallets);

  //   const startTimestamp = Math.floor(
  //     new Date(startDate).getTime() / 1000 + 1000
  //   );
  //   const endTimestamp = Math.floor(new Date(endDate).getTime() / 1000);

  //   console.log(
  //     "Form info",
  //     title,
  //     description,
  //     goal,
  //     startTimestamp,
  //     endTimestamp,
  //     monthlyGoal
  //   );

  //   const contract = await writeContract({
  //     address: "0x392F6E583F0836Fd4ceC63D72eF4A24564810308",
  //     abi: CampaignContractABI,
  //     functionName: "launch",
  //     args: [
  //       {
  //         title,
  //         description,
  //         goal,
  //         startTimestamp,
  //         endTimestamp,
  //         monthlyGoal,
  //       },
  //     ],
  //   });

  //   console.log("contract", contract);
  //   console.log("hash", hash);
  //   console.log("status", await status);
  // }

  // const { isLoading: isConfirming, isSuccess: isConfirmed } =
  //   useWaitForTransactionReceipt({
  //     hash,
  //   });
  // console.log("isConfirming", isConfirming);
  // console.log("hash", hash);

  return (
    <div className='max-w-md mx-auto my-8 p-6 border rounded shadow-md'>
      <h1 className='text-2xl font-bold text-center mb-6'>
        Campaign Details Form
      </h1>
      {/* {isPending ? "Confirming..." : "Campaign Launched!"} */}
      {hash && <div>Transaction Hash: {hash}</div>}
      <form className='text-black space-y-4'>
        <div>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-gray-700'
          >
            Title
          </label>
          <input
            type='text'
            id='title'
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
          />
        </div>

        <div>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700'
          >
            Description
          </label>
          <textarea
            id='description'
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
          ></textarea>
        </div>

        <div>
          <label
            htmlFor='goal'
            className='block text-sm font-medium text-gray-700'
          >
            Goal
          </label>
          <input
            type='number'
            id='goal'
            name='goal'
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
          />
        </div>

        <div>
          <label
            htmlFor='monthlyGoal'
            className='block text-sm font-medium text-gray-700'
          >
            Monthly Goal
          </label>
          <input
            type='number'
            id='monthlyGoal'
            name='monthlyGoal'
            value={monthlyGoal}
            onChange={(e) => setMonthlyGoal(e.target.value)}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
          />
        </div>

        <div>
          <label
            htmlFor='start-date'
            className='block text-sm font-medium text-gray-700'
          >
            Start Date
          </label>
          <input
            type='date'
            id='start-date'
            name='start-date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={today}
            className='text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
          />
        </div>
        <div>
          <label
            htmlFor='end-date'
            className='block text-sm font-medium text-gray-700'
          >
            End Date
          </label>
          <input
            type='date'
            id='end-date'
            name='end-date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate || today}
            max={ninetyDaysLater}
            className='text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
          />
        </div>

        <button
          type='submit'
          className='w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          Submit
        </button>
      </form>
    </div>
  );
}
