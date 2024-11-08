'use client';
import { useCountdown } from '../hooks/useCountDown';
import HomeLeft from '@/components/Home/HomeLeft';
import HomeRight from '@/components/Home/HomeRight';
import dynamic from 'next/dynamic';

const Countdown = dynamic(() => import('../components/Countdown/Countdown'), {
  ssr: false,
});

const HomeContent = ({ showCountdown }: { showCountdown: boolean }) => {
  return showCountdown ? <Countdown /> : (
    <div className="xl:mt-10 container mx-auto">
      <div className="grid items-center grid-cols-1 gap-20 xl:gap-0 xl:grid-cols-2">
        <div className="hidden lg:block">
          <HomeLeft />
        </div>
        <HomeRight />
      </div>
    </div>
  );
};

export default function Home() {
  const { shouldShowCountDown, isFetchedTime } = useCountdown();

  if (!isFetchedTime) return <div/>;

  return <HomeContent showCountdown={shouldShowCountDown} />;
}
