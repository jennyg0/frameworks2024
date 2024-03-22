import Link from "next/link";

export default function Header() {
  return (
    <header className='px-4 lg:px-6 h-14 flex items-center justify-between'>
      <Link className='flex items-center' href='#'>
        <MountainIcon className='h-6 w-6' />
        <span className='sr-only'>Home</span>
      </Link>
      <div className='flex items-center'>
        <button className='mr-4'>Create Project</button>
        <div className='relative'>
          <button className='h-8 w-8 rounded-full overflow-hidden border-2 border-gray-900 flex items-center justify-center dark:border-gray-50'>
            <img
              className='w-6 h-6 rounded-full'
              alt='Avatar'
              src='/avatar.jpg'
            />
          </button>
          <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg'>
            <Link
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              href='#'
            >
              Login/Logout
            </Link>
          </div>
        </div>
      </div>
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
