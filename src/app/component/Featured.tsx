import Link from "next/link";

export default function Featured() {
  return (
    <section className='w-full py-12 md:py-24 lg:py-32 border-t'>
      <div className='container px-4 md:px-6'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold tracking-tighter sm:text-4xl xl:text-5xl text-center'>
            Featured Projects
          </h2>
          <Link
            className='inline-flex h-8 items-center rounded-md border border-gray-200 border-gray-200 bg-white px-4 text-sm font-medium shadow-sm hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300'
            href='#'
          >
            View All
          </Link>
        </div>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          <div>
            <Link className='aspect-card overflow-hidden block' href='#'>
              {/* <img
                alt='Cover image'
                className='aspect-[2/1] object-cover'
                height='250'
                src='/placeholder.svg'
                width='400'
              /> */}
              <div className='p-4'>
                <div className='space-y-2'>
                  <h3 className='font-bold leading-none'>
                    Project: Open Source
                  </h3>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Funding Goal: $10,000
                  </p>
                  <div className='h-2 rounded-lg' />
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    25% funded
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div>
            <Link className='aspect-card overflow-hidden block' href='#'>
              {/* <img
                alt='Cover image'
                className='aspect-[2/1] object-cover'
                height='250'
                src='/placeholder.svg'
                width='400'
              /> */}
              <div className='p-4'>
                <div className='space-y-2'>
                  <h3 className='font-bold leading-none'>
                    Project: Indie Game
                  </h3>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Funding Goal: $25,000
                  </p>
                  <div className='h-2 rounded-lg' />
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    50% funded
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div>
            <Link className='aspect-card overflow-hidden block' href='#'>
              {/* <img
                alt='Cover image'
                className='aspect-[2/1] object-cover'
                height='250'
                src='/placeholder.svg'
                width='400'
              /> */}
              <div className='p-4'>
                <div className='space-y-2'>
                  <h3 className='font-bold leading-none'>
                    Project: Mobile App
                  </h3>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Funding Goal: $50,000
                  </p>
                  <div className='h-2 rounded-lg' />
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    75% funded
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div>
            <Link className='aspect-card overflow-hidden block' href='#'>
              {/* <img
                alt='Cover image'
                className='aspect-[2/1] object-cover'
                height='250'
                src='/placeholder.svg'
                width='400'
              /> */}
              <div className='p-4'>
                <div className='space-y-2'>
                  <h3 className='font-bold leading-none'>
                    Project: Web Framework
                  </h3>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Funding Goal: $100,000
                  </p>
                  <div className='h-2 rounded-lg' />
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    100% funded
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
