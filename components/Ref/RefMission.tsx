import clsx from 'clsx';
import { CheckCheck } from 'lucide-react';
import React from 'react';

interface MissionInterface {
  status: 'success' | 'pending';
  title: number;
  reward: number;
}

const missionList: MissionInterface[] = [
  { status: 'success', title: 100, reward: 600 },
  { status: 'pending', title: 200, reward: 1600 },
  { status: 'pending', title: 500, reward: 5000 },
  { status: 'pending', title: 1000, reward: 10000 },
];

export default function RefMission() {
  return (
    <div className="relative z-10">
      {missionList.map((item, idx) => (
        <MissionItem
          key={idx}
          title={item.title}
          reward={item.reward}
          isSuccess={item.status === 'success'}
        />
      ))}
    </div>
  );
}

const MissionItem = ({
  title,
  reward,
  isSuccess,
}: {
  title: number;
  reward: number;
  isSuccess: boolean;
}) => (
  <div
    className={clsx('flex items-center justify-between p-3', {
      'bg-gradient-to-l from-[#34205E66] to-[#815F9199] border-l-2 border-slate-50':
        isSuccess,
      'border-l-2 border-slate-800': !isSuccess,
    })}
  >
    <div className="flex items-center gap-3">
      <p className='text-sm leading-5 text-slate-50 font-sans'>{title} NFTs</p>
      <p className='text-sm leading-5 text-slate-50 font-semibold font-sans'>{reward.toLocaleString()} USD</p>
    </div>
    {isSuccess && (
      <CheckCheck
        color="white"
        size={20}
      />
    )}
  </div>
);
