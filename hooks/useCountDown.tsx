'use client';
import { useState, useEffect } from 'react';

export const useCountdown = () => {
  const [serverTime, setServerTime] = useState<number | null>(null);

  useEffect(() => {
    const fetchServerTime = async () => {
      try {
        const response = await fetch('/api/time');
        if (!response.ok) throw new Error('Failed to fetch server time');
        const data = await response.json();

        const localTime = new Date(data.serverTime);

        const utcTime = new Date(
          Date.UTC(
            localTime.getUTCFullYear(),
            localTime.getUTCMonth(),
            localTime.getUTCDate(),
            localTime.getUTCHours(),
            localTime.getUTCMinutes(),
            localTime.getUTCSeconds(),
            localTime.getUTCMilliseconds()
          )
        );

        setServerTime(utcTime.getTime());
      } catch (error) {
        console.error('Error fetching server time:', error);
      }
    };

    fetchServerTime();
  }, []);

  if (serverTime === null)
    return { isFetchedTime: false, shouldShowCountDown: false };

  const countdownEnabled = process.env.NEXT_PUBLIC_IS_COUNTDOWN === 'true';
  const startTime = new Date(process.env.NEXT_PUBLIC_START_TIME!).getTime();

  return {
    isFetchedTime: true,
    shouldShowCountDown: countdownEnabled && serverTime < startTime,
  };
};
