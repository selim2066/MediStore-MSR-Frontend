import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cookieStore = await cookies();

    const sessionToken =
      cookieStore.get('__Secure-medistore.session_token')?.value ||
      cookieStore.get('medistore.session_token')?.value;

    if (!sessionToken) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const res = await fetch(`${process.env.BACKEND_URL}/api/payment/init`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-session-token': sessionToken,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ success: false, message: 'Internal error' }, { status: 500 });
  }
}
