
# POS FRONTEND STRUCTURE

POS-FRONTEND/
├── src/
│   ├── assets/             # Images, Global Icons, Logos
│   ├── components/         # Shared UI (Button, Input, Card, Modal)
│   ├── features/           # Domain-specific modules
│   │   ├── auth/           # Login, Register, Business Onboarding
│   │   ├── kiosk/          # Customer-facing interface, Cart logic
│   │   ├── admin/          # Product management, Dashboard, Payments
│   │   └── terminal/       # Staff/Terminal specific views
│   ├── hooks/              # Global custom hooks (e.g., useAuth, useLocalStorage)
│   ├── layouts/            # Page wrappers (AdminLayout, KioskLayout)
│   ├── services/           # API clients & Repository patterns
│   ├── store/              # State management (Zustand or Redux)
│   ├── utils/              # Formatting, Validation, Constants
│   ├── App.tsx             # Main router
│   └── main.tsx            # Entry point
├── tests/                  # Integration & Setup tests
├── .env                    # Environment variables
├── vite.config.ts          # Vite & Tailwind configuration
└── vitest.config.ts        # Testing configuration
