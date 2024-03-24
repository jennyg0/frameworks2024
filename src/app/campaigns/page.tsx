"use client";

import { useRouter } from "next/navigation";
import AllCampaignsComponent from "../component/AllCampaignsComponent";

export default function CampaignsPage() {
  const router = useRouter(); // Instantiate the router

  // Function to handle navigation
  const navigateToCreateCampaigns = () => {
    router.push("/create-campaign"); // Navigate to the create-campaigns page
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24 space-y-10'>
      <button
        className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
        onClick={navigateToCreateCampaigns}
      >
        Create Campaign
      </button>
      <div className='z-10 max-w-5xl w-full flex flex-col items-center justify-center font-mono text-sm'>
        <AllCampaignsComponent />
      </div>
    </main>
  );
}
