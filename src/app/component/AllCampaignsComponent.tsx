"use client";

import Link from "next/link";
import { useReadContract } from "wagmi";
import CrowdFundABI from "../../contract/abi";
import { CROWDFUND_CONTRACT_ADDR } from "../config";
import result from "postcss/lib/result";
import { useState, useEffect } from "react";

type CampaignData = [number[], string[], string[]];
interface Project {
  id: string;
  title: string;
  description: string;
}

export default function AllCampaignsComponent() {
  const { data, isLoading, error } = useReadContract({
    abi: CrowdFundABI,
    address: CROWDFUND_CONTRACT_ADDR,
    functionName: "getAllCampaigns",
  });

  let projects: Project[] = [];

  if (data && !isLoading && !error) {
    const [ids, titles, descriptions] = data as CampaignData;

    projects = ids.map((id: number, index: number) => ({
      id: id.toString(),
      title: titles[index],
      description: descriptions[index],
    }));
  }
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1 className='text-2xl font-bold text-center my-8'>Current Projects</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4'>
        {projects.map((project, index) => (
          <div
            key={index}
            className='border rounded-lg shadow-lg overflow-hidden'
          >
            <Link href={`/campaigns/${project.id}`}>
              <div className='p-4'>
                <h2 className='font-bold text-lg'>{project.title}</h2>
                <p className='text-gray-700 mt-2'>{project.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
