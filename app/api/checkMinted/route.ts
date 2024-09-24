import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { walletAddress } = body;

    const result = await db.query(
      'SELECT EXISTS(SELECT 1 FROM minted WHERE "walletAddress" = $1) AS is_minted',
      [walletAddress]
    );

    const isMinted = result.rows[0]?.is_minted || false;

    return NextResponse.json({ isMinted });
  } catch (error) {
    console.error('Error checking if minted:', error);
    return NextResponse.json(
      { error: 'Failed to check if minted' },
      { status: 500 }
    );
  }
}
