import React from 'react';
import { TimeRemaining } from './Countdown';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function Timer({
  timeRemaining,
}: {
  timeRemaining: TimeRemaining;
}) {
  return (
    <div className={`py-5 px-1 grid grid-cols-4 ${montserrat.className}`}>
      <div className="flex flex-col items-center relative">
        <p className="text-[40px] leading-[40px] font-semibold">{timeRemaining.days}</p>
        <p className='text-[13px] leading-5'>Days</p>
        <div className="absolute h-1/2 w-[1px] bg-white right-0 top-1/2 -translate-y-1/2" />
      </div>
      <div className="flex flex-col items-center relative">
        <p className="text-[40px] leading-[40px] font-semibold">{timeRemaining.hours}</p>
        <p className='text-[13px] leading-5'>Hours</p>
        <div className="absolute h-1/2 w-[1px] bg-white right-0 top-1/2 -translate-y-1/2" />
      </div>
      <div className="flex flex-col items-center relative">
        <p className="text-[40px] leading-[40px] font-semibold">{timeRemaining.minutes}</p>
        <p className='text-[13px] leading-5'>Minutes</p>
        <div className="absolute h-1/2 w-[1px] bg-white right-0 top-1/2 -translate-y-1/2" />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-[40px] leading-[40px] font-semibold">{timeRemaining.seconds}</p>
        <p className='text-[13px] leading-5'>Second</p>
      </div>
    </div>
  );
}
