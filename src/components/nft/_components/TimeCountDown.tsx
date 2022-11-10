import React from 'react';
import { TimerIcon } from '@components/ui/Icon';
import { useCountDownTime } from '@hooks/useCountDownTime';

interface TimeCountDownProps {
  beginDate?: Date;
  endDate?: Date;
}

const TimeCountDown: React.FC<TimeCountDownProps> = (props) => {
  const timeLeft = useCountDownTime(props);

  return (
    <div className="space-y-5">
      <div className="text-neutral-500 dark:text-neutral-400 flex items-center space-x-2 ">
        <TimerIcon width="24" height="24" />
        <span className="leading-none mt-1">Auction ending in:</span>
      </div>
      <div className="flex space-x-5 sm:space-x-10">
        <div className="flex flex-col ">
          <span className="text-2xl sm:text-2xl font-semibold">
            {timeLeft.days ?? '0'}
          </span>
          <span className="sm:text-lg text-neutral-500 dark:text-neutral-400">
            Days
          </span>
        </div>
        <div className="flex flex-col ">
          <span className="text-2xl sm:text-2xl font-semibold">
            {timeLeft.hours ?? '0'}
          </span>
          <span className="sm:text-lg text-neutral-500 dark:text-neutral-400">
            hours
          </span>
        </div>
        <div className="flex flex-col ">
          <span className="text-2xl sm:text-2xl font-semibold">
            {timeLeft.minutes ?? '0'}
          </span>
          <span className="sm:text-lg text-neutral-500 dark:text-neutral-400">
            minutes
          </span>
        </div>
        <div className="flex flex-col ">
          <span className="text-2xl sm:text-2xl font-semibold">
            {timeLeft.seconds ?? '0'}
          </span>
          <span className="sm:text-lg text-neutral-500">seconds</span>
        </div>
      </div>
    </div>
  );
};

export default TimeCountDown;
