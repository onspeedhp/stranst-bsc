import { ArrowRight, Coins, Globe, PieChart } from 'lucide-react';
import React from 'react';

const benefitList = [
  {
    content: 'Priority Access to $STRANT Private Tokens',
    icon: (
      <Coins
        color="#FBBF24"
        size={32}
      />
    ),
  },
  {
    content: 'Receive Airdrops from Partner Projects',
    icon: (
      <PieChart
        color="#38BDF8"
        size={32}
      />
    ),
  },
  {
    content: 'Become a part of STRANT and our wonderful Community',
    icon: (
      <Globe
        color="#10B981"
        size={32}
      />
    ),
  },
];

const BenefitItem = ({
  item,
}: {
  item: { content: string; icon: React.ReactNode };
}) => {
  return (
    <div className="flex items-center p-5 gap-4 bg-gradient-to-l from-[#2A426A4D] to-[#1110104D] rounded-lg">
      {item.icon}
      <p className="text-sm text-white">{item.content}</p>
    </div>
  );
};

export default function Benefit() {
  return (
    <div>
      <p className="text-slate-50 font-semibold">Your Benefits</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {benefitList.map((item, idx) => (
          <BenefitItem
            item={item}
            key={idx}
          />
        ))}
      </div>
      <div className="flex items-center py-2 gap-2.5 cursor-pointer hover:opacity-80 mt-4">
        <p className='text-sm font-semibold text-slate-400'>See Benefit details</p>
        <ArrowRight size={16} color='#94A3B8'/>
      </div>
    </div>
  );
}
