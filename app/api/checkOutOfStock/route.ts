import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await db.query('SELECT * FROM minted');

    const totalBuy = data.rows.reduce((total, item) => total + item.amount, 0);

    const isOutOfStock = totalBuy >= 2000;
    
    return NextResponse.json({ isOutOfStock });
  } catch (error) {
    console.error('Error fetching minted data:', error);
    return NextResponse.json({ error: 'Failed to fetch minted data' }, { status: 500 });
  }
}
