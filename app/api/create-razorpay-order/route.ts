import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { amount, currency, receipt } = await req.json();
  const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY;
  const razorpaySecret = process.env.NEXT_PUBLIC_RAZORPAY_SECRET;

  try {
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(
          `${razorpayKey}:${razorpaySecret}`
        ).toString('base64')}`,
      },
      body: JSON.stringify({ amount, currency, receipt, payment_capture: 1 }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
