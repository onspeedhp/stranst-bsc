import HomeLeft from '@/components/Home/HomeLeft';
import HomeRight from '@/components/Home/HomeRight';

export default function Home() {
  return (
    <div className="xl:mt-[2.5vw] container mx-auto">
      <div className="lg:grid-cols-1 gap-20 xl:gap-0 xl:grid-cols-2 items-center">
        <div className='hidden lg:block'>
          <HomeLeft />
        </div>
        <HomeRight />
      </div>
    </div>
  );
}
