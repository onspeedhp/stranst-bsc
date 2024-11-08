export const showCountdown = () => {
  const countdownEnabled = process.env.NEXT_PUBLIC_IS_COUNTDOWN === 'true';
  const currentTime = Date.now();
  const startTime = new Date(process.env.NEXT_PUBLIC_START_TIME!).getTime();

  return countdownEnabled && currentTime < startTime;
};
