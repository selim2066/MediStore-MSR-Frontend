# MediStore — OTC Medicine E-Commerce Platform

A full-stack medicine e-commerce web application built with **Next.js 15 (App Router)**, featuring multi-role access, a complete order management system, and a clean, responsive UI.

---

## Tech Stack

**Frontend:** Next.js · TypeScript · Tailwind CSS · shadcn/ui · TanStack Query  
**Backend:** Node.js · Express.js · PostgreSQL · Prisma ORM  
**Auth:** better-auth (email/password + email verification)  
**Media:** Cloudinary  
**Deployment:** Vercel (frontend) · Render (backend)

---

## Features

- **Customer** — Browse and filter medicines, manage cart, place orders, track order history
- **Seller** — Manage medicine listings and incoming orders via a dedicated dashboard
- **Admin** — Full control over users, categories, and platform-wide orders
- **Auth** — Secure session-based authentication with role-based access control
- **UI** — Fully responsive interface with loading states, error handling, and form validation

---

## Getting Started

### Prerequisites

- Node.js `v18+`
- npm, yarn, pnpm, or bun

### Installation

```bash
git clone https://github.com/your-username/medistore-frontend.git
cd medistore-frontend
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
medistore-frontend/
├── public/                         # Static assets
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── (commonLayout)/         # Public routes
│   │   │   ├── page.tsx            # Homepage
│   │   │   ├── shop/               # Medicine listing & detail
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (customerLayout)/       # Protected customer routes
│   │   │   ├── cart/page.tsx
│   │   │   ├── checkout/page.tsx
│   │   │   ├── orders/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   └── profile/page.tsx
│   │   └── (dashboardLayout)/      # Seller & admin dashboards
│   │       ├── seller/
│   │       │   ├── dashboard/page.tsx
│   │       │   ├── medicines/page.tsx
│   │       │   └── orders/page.tsx
│   │       └── admin/
│   │           ├── page.tsx
│   │           ├── users/page.tsx
│   │           ├── orders/page.tsx
│   │           └── categories/page.tsx
│   ├── components/
│   │   ├── layout/                 # Navbar, Footer, Sidebar
│   │   ├── ui/                     # shadcn/ui base components
│   │   └── module/                 # Feature-specific components
│   │       ├── admin/
│   │       ├── auth/
│   │       ├── checkout/
│   │       ├── home/
│   │       ├── orders/
│   │       ├── profile/
│   │       ├── seller/
│   │       └── shop/
│   ├── services/                   # API service layer (native fetch)
│   ├── actions/                    # Next.js server actions
│   ├── context/
│   │   └── cart-context.tsx        # Global cart state
│   ├── lib/
│   │   ├── auth-client.ts          # better-auth client
│   │   ├── cloudinary.ts           # Cloudinary upload helper
│   │   └── utils.ts
│   ├── types/                      # Shared TypeScript types
│   ├── env.ts                      # Environment variable validation
│   └── proxy.ts                    # API proxy for cookie forwarding
├── .env.local
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Run production build locally |
| `npm run lint` | Run ESLint |

---

## Deployment

The frontend is deployed on **Vercel**. To deploy your own instance:

1. Push the repository to GitHub
2. Import the project at [vercel.com](https://vercel.com)
3. Set the required environment variables in the Vercel dashboard
4. Deploy

Refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Related

- [MediStore Backend Repository](https://github.com/selim2066/mediStore-msr-backend)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma ORM](https://www.prisma.io/docs)

---

## License

This project was built as a level-2 Programming-hero assignment. All rights reserved.
