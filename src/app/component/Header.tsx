"use client";
import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const { login, logout, authenticated } = usePrivy();
  const router = useRouter();

  async function handleUserAction() {
    if (authenticated) {
      await logout(); // Log out the user
      router.push("/");
    } else {
      login();
      if (authenticated) {
        router.push("/campaigns");
      }
    }
  }

  return (
    <header className='px-4 lg:px-6 h-14 flex items-center justify-between'>
      <Link href='/' className='flex items-center'>
        {" "}
        {/* Assuming the home link should be '/' */}
        <MountainIcon className='h-6 w-6' />
        <span className='sr-only'>Home</span>
      </Link>
      <button
        className='bg-purple-600 text-white font-bold py-2 px-4 rounded-full mb-4'
        onClick={handleUserAction}
      >
        {authenticated ? "Log out" : "Log in"}
      </button>
    </header>
  );
}

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='m8 3 4 8 5-5 5 15H2L8 3z' />
    </svg>
  );
}
