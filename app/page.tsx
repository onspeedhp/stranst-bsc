import HomeLeft from '@/components/Home/HomeLeft';
import HomeRight from '@/components/Home/HomeRight';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="mt-[2.5vw] container mx-auto">
      <div className="grid grid-cols-1 gap-20 xl:gap-0 xl:grid-cols-2 items-center">
        <HomeLeft />
        <HomeRight />
      </div>

    </div>
  );
}
