// const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// const initiatePayment = async (orderId: string) => {
//   try {
//     const res = await fetch(`${API_URL}/api/payment/init`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       credentials: 'include',
//       body: JSON.stringify({ orderId }),
//     });
//     const data = await res.json();
//     return { data, error: null };
//   } catch {
//     return { data: null, error: { message: 'Unknown error' } };
//   }
// };

// export const paymentService = { initiatePayment };

// !cross origin solve
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const initiatePayment = async (orderId: string) => {
  try {
    const sessionToken =
      Cookies.get('__Secure-medistore.session_token') ||
      Cookies.get('medistore.session_token');

    const res = await fetch(`${API_URL}/api/payment/init`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(sessionToken && { Cookie: `medistore.session_token=${sessionToken}` }),
      },
      credentials: 'include',
      body: JSON.stringify({ orderId }),
    });
    const data = await res.json();
    return { data, error: null };
  } catch {
    return { data: null, error: { message: 'Unknown error' } };
  }
};

export const paymentService = { initiatePayment };