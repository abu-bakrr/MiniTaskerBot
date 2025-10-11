# Flowery Bloom - Mobile Flower Shop

## Overview

Flowery Bloom is a mobile-first Telegram Mini App for an online flower shop. The application features a clean, pastel-themed interface designed exclusively for mobile devices (max 420px width). Built with React and Express, it provides an e-commerce experience for browsing and purchasing flowers and greeting cards with a focus on simplicity and aesthetic appeal.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for component-based UI
- Vite as the build tool and dev server
- TanStack Query (React Query) for data fetching and state management
- Shadcn/ui component library with Radix UI primitives
- Tailwind CSS for styling with custom design tokens

**Design Philosophy:**
- Mobile-only interface (max-width: 420px)
- Flat, minimal design with pastel color palette
- No hover effects or 3D elements - optimized for touch interactions
- Wildberries-inspired card layouts adapted to gentle aesthetic
- Light mode only with predefined color scheme (#FEFEFE background, #EADCF0 primary accent)

**Key Components:**
- `Header`: Sticky navigation with brand, favorites, and cart icons
- `FilterBar`: Horizontal scrollable category and sorting filters
- `ProductCard`: Two-column grid layout for product display
- `ProductGrid`: Container for product listings
- `ProductDetail`: Full product view with image gallery
- `CartItem`: Individual cart item management
- `Pagination`: Page navigation for product listings

**Routing Strategy:**
- Client-side page state management without traditional routing
- Page switching via state: 'home' | 'cart' | 'favorites' | 'product'
- Currently uses mock data for product information

### Backend Architecture

**Technology Stack:**
- Express.js server with TypeScript
- Drizzle ORM for database operations
- Neon serverless PostgreSQL database
- WebSocket support for database connections

**API Structure:**
- RESTful API endpoints prefixed with `/api`
- Request/response logging middleware
- Error handling middleware with status codes
- Session management placeholder (connect-pg-simple available)

**Storage Layer:**
- In-memory storage implementation (`MemStorage`) for development
- Database schema defined in `shared/schema.ts`
- Prepared for database integration with user management structure

**Server Configuration:**
- Development mode with Vite middleware integration
- Production build with esbuild bundling
- Hot module replacement (HMR) in development
- Static file serving for production builds

### Data Models

**Current Schema:**
- `users` table: id (UUID), username (unique text), password (text)
- Zod validation schemas for type safety
- Drizzle Zod integration for runtime validation

**Expected Expansion:**
- Products table (flowers, greeting cards)
- Orders and order items
- Shopping cart persistence
- Favorites/wishlist
- Categories and filtering metadata

### State Management

**Client-Side:**
- React hooks (useState, useEffect) for local component state
- localStorage for cart and favorites persistence
- Context-free prop drilling for data flow
- Mock data structures in component files

**Server-Side:**
- Memory-based storage interface (`IStorage`)
- CRUD operations abstraction
- Prepared for database-backed persistence

### Styling System

**Tailwind Configuration:**
- Custom color palette using CSS variables
- HSL color format with alpha channel support
- Responsive spacing units (2, 4, 8, 12, 16, 20, 24px)
- Custom border radius values (sm: 8px, md: 12px, lg: 16px)

**Design Tokens:**
- Flat button styles with outline variants
- Card-based layouts with subtle borders
- Elevation system using opacity-based overlays
- Touch-friendly sizing (minimum 44px touch targets)

## External Dependencies

### Third-Party Services

**Database:**
- Neon Serverless PostgreSQL via `@neondatabase/serverless`
- Connection pooling with WebSocket support
- Drizzle ORM for type-safe database queries

**UI Components:**
- Radix UI primitives for accessible components (dialogs, dropdowns, tooltips, etc.)
- Shadcn/ui component system built on Radix
- Lucide React for iconography

**Development Tools:**
- Replit-specific plugins (vite-plugin-runtime-error-modal, cartographer, dev-banner)
- ESBuild for production bundling
- TypeScript for type safety across stack

**Fonts:**
- Google Fonts: Inter and Poppins families
- Preconnect optimization for font loading

### Image Hosting

**Current Implementation:**
- Unsplash URLs for mock product images
- Design guidelines mention Cloudinary for production
- Image URLs stored in database (not binary data)

### Future Integrations

**Telegram Mini App:**
- Application designed as Telegram Mini App
- Mobile-optimized viewport settings
- Touch-friendly interactions throughout

**Payment Processing:**
- Not yet implemented
- Order flow currently ends with manager contact (@flowerybloom)

**Content Delivery:**
- Static assets served via Vite in development
- Production build outputs to `dist/public`
- Asset path aliases configured for images