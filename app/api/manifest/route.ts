import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    return NextResponse.json({
      url: `${process.env.NEXT_PUBLIC_APP_URL}`,
      name: 'TON Vote',
      iconUrl: 'https://ton.vote/logo.png',
    });
  } catch (e) {
    console.log(e);
    const error = e as Error;
    return NextResponse.json({
      message: error.message,
    });
  }
};
