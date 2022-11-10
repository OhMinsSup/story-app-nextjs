import { useState, useEffect } from 'react';

const calculateTimeLeft = (endDate?: Date) => {
  const now = new Date();
  const difference = endDate ? new Date(endDate).getTime() - now.getTime() : 0;

  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

interface UseCountDownTimeParams {
  beginDate?: Date;
  endDate?: Date;
}

export const useCountDownTime = ({ endDate }: UseCountDownTimeParams) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endDate));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(endDate));
    }, 10000);
    return () => clearTimeout(timer);
  });

  return timeLeft;
};
