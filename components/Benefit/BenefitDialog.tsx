import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '../ui/dialog';
import {
  ArrowLeft,
  ArrowRight,
  Coins,
  Gem,
  Headphones,
  Percent,
  PieChart,
  Sprout,
  Users,
  Wallet,
} from 'lucide-react';
import React from 'react';
import { DialogHeader } from '../ui/dialog';
import clsx from 'clsx';

const benefitList = [
  {
    type: 'Short-term Benefits',
    items: [
      {
        title: 'Priority Access to $STRANT Private Tokens',
        content:
          'Only those who hold a STRANT VIP Pass can participate in the purchase of $STRANT Private Tokens, the most valuable tokens in this ecosystem.',
        icon: (
          <Coins
            color="white"
            size={40}
          />
        ),
      },
      {
        title: 'Dedicated Support Team',
        content:
          'With a STRANT VIP Pass, you will receive support from STRANT’s professional sales team, ensuring all your transactions are fast, efficient, and maximize your value.',
        icon: (
          <Headphones
            color="white"
            size={40}
          />
        ),
      },
      {
        title: 'Massive Returns from the Staking Pool',
        content:
          '15,000% annual returns from the Staking Pool – an opportunity you won’t find anywhere else. Let your assets grow in a sustainable way.',
        icon: (
          <Percent
            color="white"
            size={40}
          />
        ),
      },
    ],
  },
  {
    type: 'Long-term Benefits',
    items: [
      {
        title: 'Passive Income from Transaction Fees',
        content:
          'Simply holding the STRANT VIP Pass entitles you to 20% of the transaction fees from every $STRANT token swap.',
        icon: (
          <Wallet
            color="white"
            size={40}
          />
        ),
      },
      {
        title: 'Full Access to the STRANT Ecosystem',
        content:
          'Turn your NFT into Tokens and unlock all the advanced trading features that STRANT has to offer.',
        icon: (
          <Sprout
            color="white"
            size={40}
          />
        ),
      },
      {
        title: 'Receive Airdrops from Partner Projects',
        content:
          'Each STRANT VIP Pass is your ticket to receiving Airdrops from STRANT’s strategic partners – free tokens will land in your hands!',
        icon: (
          <PieChart
            color="white"
            size={40}
          />
        ),
      },
      {
        title: 'Experience Cutting-Edge AI Features for Free',
        content:
          'What’s better than being able to use STRANT’s entire advanced AI-powered training and trading system for free?',
        icon: (
          <Gem
            color="white"
            size={40}
          />
        ),
      },
      {
        title: 'Participate in Exclusive Testing Programs and Voting Rights',
        content:
          'You’ll be the first to try out all the new features and testing programs. You also get voting rights to help shape product development and push STRANT to even greater heights.',
        icon: (
          <Users
            color="white"
            size={40}
          />
        ),
      },
    ],
  },
];
export default function BenefitDialog() {
  return (
    <Dialog>
      <DialogTrigger aria-hidden={false}>
        <div className="flex justify-center lg:justify-start m-0 items-center py-2 gap-2.5 cursor-pointer hover:opacity-80 lg:mt-4">
          <p className="hidden lg:block text-sm font-semibold text-slate-400">
            See Benefit details
          </p>
          <ArrowRight
            size={16}
            color="#94A3B8"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="bg-[#171D41] border-none py-12 lg:py-6 max-w-[982px] max-h-screen overflow-y-auto rounded-none lg:rounded-xl">
        <DialogHeader className="relative">
          <DialogClose className='outline-none lg:hidden'>
            <ArrowLeft className="absolute left-0 top-1/2 -translate-y-[8px]" />
          </DialogClose>
          <DialogTitle className="text-lg tracking-[-0.5%] text-white font-bold">
            VIP Pass holder benefits
          </DialogTitle>
          <p className="text-sm text-slate-300 hidden lg:block">
            Become a STRANT VIP Pass holder and enter a world of exclusive
            privileges
          </p>
        </DialogHeader>
        {benefitList.map((item, idx) => (
          <div
            key={idx}
            className={clsx({ 'mb-6': idx + 1 !== benefitList.length })}
          >
            <p className="mb-3 font-semibold text-slate-50">{item.type}</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {item.items.map((child) => (
                <div key={child.title}>
                  {child.icon}
                  <p className="my-2 text-white text-sm font-semibold">
                    {child.title}
                  </p>
                  <p className="text-sm text-slate-300">{child.content}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
}
