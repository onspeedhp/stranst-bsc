'use client';

import { useAppKitAccount } from '@reown/appkit/react';
import { useEffect, useState } from 'react';

export default function Wallet() {
  const { isConnected } = useAppKitAccount();
  const [classn,setClassn] = useState('connect-btn') 

  useEffect(()=>{
    if(isConnected) {
      setClassn('connect-btn connected')
    } else{
      setClassn('connect-btn')
    }
  },[isConnected])
  return (
    <div className={classn}>
      <w3m-button />
    </div>
  );
}
