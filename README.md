# KaziKE

## Project structure
``` 
kaziKE/
├── app/                      # App entry and route structure (Next.js-style via Expo Router)
│   ├── _layout.tsx          # Root layout (e.g., tabs, theming)
│   ├── index.tsx            # Landing page (e.g., Welcome or Login)
│   ├── auth/                # Auth-related screens
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   ├── seeker/              # Job Seeker dashboard and flows
│   │   ├── index.tsx        # Seeker home/dashboard
│   │   ├── jobs.tsx         # Job listings
│   │   └── profile.tsx
│   ├── employer/            # Employer dashboard and flows
│   │   ├── index.tsx        # Employer home/dashboard
│   │   ├── post-job.tsx     # Job posting form
│   │   └── applicants.tsx   # View applicants
│   └── settings.tsx         # Common settings page
│
├── components/              # Shared reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── JobCard.tsx
│   └── SeekerProfileCard.tsx
│
├── constants/               # Constants like colors, roles, endpoints
│   └── index.ts
│
├── hooks/                   # Custom React hooks
│   └── useAuth.ts
│   └── useJobs.ts
│
├── lib/                     # Appwrite SDK and other libraries
│   └── appwrite.ts          # Appwrite client config
│   └── api.ts               # API helpers (CRUD ops)
│
├── store/                   # Global state (e.g., Zustand, Jotai, or Context API)
│   └── authStore.ts
│
├── styles/                  # NativeWind + Tailwind config and styles
│   ├── index.css            # Tailwind import for web
│   └── tailwind.config.js   # Tailwind config
│
├── assets/                  # Images, fonts, icons
│   └── logo.png
│
├── .env                     # Environment variables (Appwrite endpoints, project ID)
├── app.config.ts            # Expo app configuration
├── package.json
└── tsconfig.json
```