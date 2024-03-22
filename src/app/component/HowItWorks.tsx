export default function HowItWorks() {
  return (
    <section className='w-full py-12 md:py-24 lg:py-32 border-t'>
      <div className='container grid items-center gap-10 px-4 text-center md:px-6'>
        <div className='space-y-2'>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
            How it works
          </h2>
          <p className='mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
            Simple steps to get your project funded by the community.
          </p>
        </div>
        <div className='mx-auto grid max-w-sm items-start gap-8 sm:grid-cols-2 sm:max-w-none sm:items-center sm:gap-12 md:grid-cols-3 lg:gap-16'>
          <div className='flex flex-col items-center gap-2'>
            <CheckCircleIcon className='w-12 h-12 rounded-full border' />
            <div className='space-y-1'>
              <h3 className='font-bold'>Submit your project</h3>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Tell the world about your idea.
              </p>
            </div>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <CheckCircleIcon className='w-12 h-12 rounded-full border' />
            <div className='space-y-1'>
              <h3 className='font-bold'>Community support</h3>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Let the community fund your project.
              </p>
            </div>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <CheckCircleIcon className='w-12 h-12 rounded-full border' />
            <div className='space-y-1'>
              <h3 className='font-bold'>Launch your project</h3>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Bring your idea to life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
      <polyline points='22 4 12 14.01 9 11.01' />
    </svg>
  );
}
