import Header from "./Header";
import Featured from "./Featured";
import HowItWorks from "./HowItWorks";

export default function HomeComponent() {
  return (
    <div className='flex flex-col min-h-[100dvh]'>
      <Header />
      <main className='flex-1'>
        <section className='w-full py-12 md:py-24 lg:py-32 text-center'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='space-y-4'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl mx-auto'>
                Funding the Future
              </h1>
              <p className='mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                Discover and fund the next big thing. From open source projects
                to indie apps, support the work of builders and creators around
                the world.
              </p>
            </div>
          </div>
        </section>
        <HowItWorks />
        <Featured />
        <section className='w-full py-12 md:py-24 lg:py-32 border-t'>
          <div className='container px-4 md:px-6'>
            <div className='ax-w-5xl mx-auto items-center gap-4 text-center sm:gap-6 sm:grid-cols-[1fr_3fr] md:gap-12'>
              <div className='space-y-4'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
                  Ready to get started?
                </h2>
                <p className='text-gray-500 dark:text-gray-400'>
                  Join the community and fund your next project.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className='border-t'>
        <div className='container grid items-center justify-center gap-4 min-h-[100px] px-4 py-4 text-center md:gap-10 md:px-6'>
          <p className='text-xs text-gray-500 dark:text-gray-400'>
            © 2024. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
