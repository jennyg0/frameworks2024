import Image from "next/image";
import HomeComponent from "./component/HomeComponent";
import Header from "./component/Header";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <HomeComponent />
      </div>
    </main>
  );
}
