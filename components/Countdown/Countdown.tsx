'use client';
import React, { useEffect, useState, useMemo } from 'react';
import Timer from './Timer';

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (endTime: number): TimeRemaining => {
  const now = Date.now();
  const difference = endTime - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
  };
};

export default function Countdown() {
  const endTime = useMemo(
    () => new Date(process.env.NEXT_PUBLIC_START_TIME!).getTime(),
    []
  );
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(
    calculateTimeLeft(endTime)
  );

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining(calculateTimeLeft(endTime));
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [endTime]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        className="px-10 py-8 bg-gradient-to-b from-[#37BFEA] to-[#0B0F3F] rounded-xl text-white"
        style={{
          boxShadow: '0px 4px 15px 0px #552D8E33, 0px 3px 14px 0px #552D8E1F, 0px 8px 10px 0px #552D8E24',
        }}
      >
        <div className="flex flex-col items-center mb-[60px]">
          <p className="text-sm leading-[18px] font-semibold">Upcoming</p>
          <p className="text-[24px] leading-[60px] font-bold bg-gradient-to-r from-[#11144B] via-[#1C3DDE] to-[#11144A] text-transparent bg-clip-text">
            EXCLUSIVE STRANT VIP Pass
          </p>
          <p className="text-base leading-[18px] text-[#E0E0E0]">
            Available in{' '}
            <span className="font-medium text-white">
              {Math.ceil(timeRemaining.days + timeRemaining.hours / 24)} days
            </span>
          </p>
        </div>
        <div className="w-1/2 mx-auto bg-gradient-to-r from-[#2B8CB800] via-[#FFFFFF] to-[#2B8CB800] h-[1px]" />
        <Timer timeRemaining={timeRemaining} />
        <div className="w-1/2 mx-auto bg-gradient-to-r from-[#2B8CB800] via-[#FFFFFF] to-[#2B8CB800] h-[1px]" />
        <p className="text-center w-[60%] mx-auto text-[#EBEBEB] mt-6 text-base leading-6">
          A new era of innovation and digital ownership powered by AI
        </p>
      </div>
    </div>
  );
}