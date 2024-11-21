import React, { useState } from 'react';
import Button from '../ui/Button';
import { ChevronRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';

export default function MintRef({ setRef }: { setRef: (e: string) => void }) {
  const searchParams = useSearchParams();
  const defaultRef = searchParams.get('ref');
  const [textInput, setTextInput] = useState(defaultRef || '');
  return (
    <div className="flex flex-col min-h-[400px] h-[90%]">
      <div className="relative mb-3">
        <p className="text-base leading-4 font-semibold">Add Refcode</p>
        <p className="mt-1.5 text-xs leading-5">
          You have to enter #refcode to buy this product
        </p>
        <div className="h-[1px] bg-slate-700 mt-3 absolute -bottom-3 -left-6 -right-6" />
      </div>
      <div
        className={clsx(
          'mt-6 p-3 border border-[#B0BFD1] rounded-lg',
          {
            'bg-gray-500': defaultRef,
            'bg-white': !defaultRef
          }
        )}
      >
        <input
          placeholder="#refcode"
          className={clsx('w-full outline-none text-black bg-transparent', {
            'text-gray-300': defaultRef,
          })}
          value={textInput}
          disabled={!!defaultRef}
          onChange={(e) => setTextInput(e.currentTarget.value)}
        />
      </div>
      <Button
        className="flex items-center bg-gradient-to-r from-[#37BFEA] to-[#0B0F3F] justify-center mt-auto py-2.5"
        onClick={() => setRef(textInput)}
      >
        <p className="font-semibold">Continue</p>
        <ChevronRight />
      </Button>
    </div>
  );
}
