import clsx from 'clsx';
import { Minus, Plus } from 'lucide-react';

export default function MintCounter({
  amount,
  setAmount,
  max,
  isApproved,
}: {
  amount: number;
  setAmount: (value: number) => void;
  max: number;
  isApproved: boolean;
}) {
  const increment = () => {
    setAmount(amount + 1);
  };

  const decrement = () => {
    setAmount(amount > 1 ? amount - 1 : 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value)) && Number(value) > 0) {
      setAmount(Number(value));
    } else {
      setAmount(0);
    }
  };

  const handleBlur = () => {
    if (isNaN(amount) || amount <= 0) {
      setAmount(0);
    }
  };

  return (
    <div className="flex items-center justify-center bg-slate-800 border border-slate-700 rounded-lg shadow-lg">
      <button
        onClick={decrement}
        className={clsx('hover:bg-gray-700 transition ease-in-out h-10 p-1', {
          'opacity-50 pointer-events-none': isApproved,
        })}
      >
        <Minus color="#94A3B8" />
      </button>
      <input
        type="number"
        value={amount}
        min={0}
        max={max || Number(process.env.NEXT_PUBLIC_TOTAL_NFTS) || 2000}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isApproved}
        className="border-l border-r border-slate-700 bg-slate-800 text-center w-16 text-2xl font-bold text-white py-2 outline-none lg:focus:ring-2 lg:focus:ring-blue-500"
      />
      <button
        onClick={increment}
        className={clsx(
          'lg:hover:bg-gray-700 transition ease-in-out h-10 p-1',
          {
            'opacity-50 pointer-events-none': isApproved,
          }
        )}
      >
        <Plus color="#94A3B8" />
      </button>
    </div>
  );
}
