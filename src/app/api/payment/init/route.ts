import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cookieStore = await cookies();

    const secureToken = cookieStore.get('__Secure-medistore.session_token')?.value;
    const normalToken = cookieStore.get('medistore.session_token')?.value;
    const sessionToken = secureToken || normalToken;

    if (!sessionToken) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    // Use the correct cookie name when forwarding
    const cookieName = secureToken
      ? '__Secure-medistore.session_token'
      : 'medistore.session_token';

    const res = await fetch(`${process.env.BACKEND_URL}/api/payment/init`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-session-token': sessionToken,
        'x-cookie-name': cookieName, // ← tell backend which name to use
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ success: false, message: 'Internal error' }, { status: 500 });
  }
}