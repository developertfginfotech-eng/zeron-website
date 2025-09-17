# Overview

Zaron is a real estate investment platform designed for the Saudi Arabian market, featuring both an admin web panel and mobile application. The platform facilitates property investment management, KYC verification processes, and portfolio tracking. Built as a demo version, it uses mock data flows without external payment or banking integrations, supporting both Arabic (RTL) and English languages.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React.js** with TypeScript for the admin web panel
- **Vite** as the build tool and development server
- **Wouter** for client-side routing instead of React Router
- **Tailwind CSS** with custom design system inspired by fintech platforms like Robinhood
- **shadcn/ui** component library with Radix UI primitives for accessible UI components
- **Framer Motion** for animations and micro-interactions
- **TanStack Query** for server state management and API data fetching

## Backend Architecture
- **Node.js** with Express.js server using ESM modules
- **TypeScript** throughout the entire stack for type safety
- **RESTful API** design with endpoints for investors, properties, transactions, and documents
- **Zod** schemas for runtime data validation and type inference
- **In-memory storage** implementation with interface-based design for easy database swapping

## Database Design
- **Drizzle ORM** configured for PostgreSQL with schema definitions
- **Database schema** includes tables for users, admin users, properties, investors, transactions, chat messages, AI insights, notifications, and KYC documents
- **Schema validation** using drizzle-zod for consistent data types between frontend and backend

## UI/UX Design System
- **Design approach** referencing modern fintech and real estate platforms
- **Color palette** featuring professional blues with dark/light mode support
- **Typography** using Inter as primary font and JetBrains Mono for financial data
- **Component hierarchy** with enhanced cards, tables, forms, and specialized real estate components
- **Responsive design** with mobile-first approach and consistent 8px grid spacing

## Key Features Architecture
- **KYC Management**: Document upload, review workflows, and status tracking
- **Property Management**: Listings, investment calculations, and ownership tracking
- **Transaction Processing**: Investment flows, payouts, and withdrawal handling
- **AI Integration**: Chat widget, insights panel, and smart analytics
- **Admin Dashboard**: Comprehensive analytics, user management, and system settings
- **Multi-language Support**: RTL Arabic and English language switching

## Development Patterns
- **Mock Data Strategy**: Comprehensive mock data throughout for demo functionality
- **Component-based Architecture**: Reusable UI components with consistent prop interfaces
- **Type-safe Development**: Shared TypeScript types between client and server
- **Error Handling**: Toast notifications and user-friendly error states
- **State Management**: React Query for server state, React hooks for local state

# External Dependencies

## Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity (configured but using in-memory storage for demo)
- **drizzle-orm** and **drizzle-kit**: Database ORM and migration tools
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight client-side routing

## UI Component Libraries
- **@radix-ui/react-***: Comprehensive set of accessible UI primitives (dialog, dropdown, select, etc.)
- **framer-motion**: Animation library for enhanced user interactions
- **recharts**: Chart and data visualization components
- **cmdk**: Command menu component for search functionality

## Development Tools
- **vite**: Fast development server and build tool with React plugin
- **tailwindcss**: Utility-first CSS framework with custom configuration
- **typescript**: Type checking and enhanced developer experience
- **eslint** and **prettier**: Code quality and formatting tools

## Utility Libraries
- **date-fns**: Date manipulation and formatting
- **zod**: Runtime type validation and schema definition
- **clsx** and **tailwind-merge**: CSS class name utilities
- **nanoid**: Unique ID generation

## Form and Validation
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Form validation resolvers for Zod schemas

## Session Management
- **connect-pg-simple**: PostgreSQL session store for Express sessions (configured for future use)

Note: The application is configured to work with PostgreSQL through Neon Database but currently uses in-memory storage for the demo version. Database migrations and full persistence can be enabled by setting up the DATABASE_URL environment variable.