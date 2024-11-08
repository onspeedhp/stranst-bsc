'use client';
import { useState, useEffect } from 'react';

export const useCountdown = () => {
  const [serverTime, setServerTime] = useState<number | null>(null);

  useEffect(() => {
    const fetchExternalTime = async () => {
      try {
        const response = await fetch(
          'https://timeapi.io/api/time/current/zone?timeZone=UTC'
        );
        if (!response.ok) throw new Error('Failed to fetch server time');
        const data = await response.json();

        const utcTime = new Date(data.dateTime).getTime();
        setServerTime(utcTime);
      } catch (error) {
        console.error('Error fetching time from external server:', error);
      }
    };

    fetchExternalTime();
  }, []);

  if (serverTime === null)
    return { isFetchedTime: false, shouldShowCountDown: false };

  const countdownEnabled = process.env.NEXT_PUBLIC_IS_COUNTDOWN === 'true';

  const startTimeLocal = new Date(process.env.NEXT_PUBLIC_START_TIME!);
  const startTimeUTC = new Date(
    Date.UTC(
      startTimeLocal.getUTCFullYear(),
      startTimeLocal.getUTCMonth(),
      startTimeLocal.getUTCDate(),
      startTimeLocal.getUTCHours(),
      startTimeLocal.getUTCMinutes(),
      startTimeLocal.getUTCSeconds(),
      startTimeLocal.getUTCMilliseconds()
    )
  ).getTime();

  return {
    isFetchedTime: true,
    shouldShowCountDown: countdownEnabled && serverTime < startTimeUTC,
  };
};
