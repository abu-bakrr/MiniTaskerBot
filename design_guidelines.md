# Flowery Bloom - Mobile Flower Shop Design Guidelines

## Design Approach
**Reference-Based:** Wildberries-inspired card design adapted to pastel, minimal aesthetic for a mobile-first Telegram Mini App.

## Core Design Principles
- Flat, minimal design with focus on product imagery
- Pastel color palette for gentle, feminine aesthetic  
- Mobile-only interface (max 420px width)
- No hover effects, 3D elements, or complex animations
- Large touch targets (minimum 44px) for mobile usability
- Breathing space with generous padding

## Color Palette

### Light Mode Only
- **Background:** #FEFEFE (milk white) or #FDF9F8 (warm off-white)
- **Primary Text:** #2E2E2E (dark gray)
- **Secondary Text:** #7A7A7A (medium gray)
- **Primary Accent:** #EADCF0 (soft pink) for buttons and CTAs
- **Secondary Accent:** #DFF3F1 (light mint) for alternative highlights
- **Borders:** #EAEAEA (very light gray)

## Typography
- **Font Families:** Inter, Poppins, or system sans-serif
- **Header:** 20-24px, semi-bold
- **Product Names:** 14-16px, medium weight
- **Price:** 16-18px, bold
- **Body Text:** 14px, regular
- **Buttons:** 14-16px, medium weight

## Layout System
**Spacing Primitives:** Use units of 2, 4, 8, 12, 16, 20, 24px for consistent rhythm

### Grid Structure
- **Product Cards:** 2-column grid layout
- **Card Spacing:** 8-12px gap between cards
- **Container Padding:** 16px horizontal, 12px vertical
- **Section Spacing:** 20-24px between major sections

## Component Library

### Header (Sticky Top)
- Compact height: 56-60px
- Left: Logo + "Flowery Bloom" text
- Right: Heart icon (favorites) + Cart icon
- Minimal shadow or subtle bottom border

### Horizontal Filter Bar (Scrollable)
- Positioned directly under header
- Single row with horizontal scroll
- **Elements:** Category chips (with icons) → Color circles → Price range (two inputs) → Sort options
- Chip design: Rounded (24px border-radius), 8px padding, subtle background when selected
- Touch-friendly: 36-40px min height

### Product Cards (Wildberries Style)
- **Aspect Ratio:** Square or 3:4 for product images
- **Border Radius:** 12-16px
- **Elements:**
  - Product image (full width, lazy loading, WebP format)
  - Heart icon (top-left overlay, fills with color on tap)
  - Product name (below image, 2-line max)
  - Price (bold, below name)
  - Cart button (bottom-right or full-width)
- **Card Shadow:** None or very subtle (0 1px 3px rgba(0,0,0,0.08))
- **Spacing:** 12px internal padding

### Product Detail Page
- **Image Gallery:** Swipeable carousel or dot-navigation
- **Layout:** Full-width images, content below
- **Action Buttons:** "Add to Cart" (primary accent color) + Heart (outline)
- **Button Height:** 48px minimum

### Shopping Cart
- **Item Cards:** Horizontal layout (image left, details right, controls far right)
- **Controls:** Quantity +/- buttons, remove icon (trash)
- **Actions:** "Clear Cart" (secondary), "Place Order" (primary)
- **Bottom Bar:** Sticky total + "Place Order" button

### Modal (Order Confirmation)
- **Style:** Light background (#FEFEFE), centered
- **Border Radius:** 16px
- **Padding:** 24px
- **Content:** Order summary list, total, confirmation message
- **Button:** Single "OK" button (primary accent)
- **No backdrop overlay** - just subtle shadow

### Favorites Page
- Same grid as main catalog (2 columns)
- "Clear All" button at top-right
- Empty state: Centered icon + message

### Icons (Flat SVG)
- **Style:** Simple, line-based or filled flat shapes
- **Size:** 20-24px for UI icons, 32px for empty states
- **Icons Needed:** Heart, cart, filter, arrow, trash, category symbols (rose, tulip, etc.)
- **No 3D effects**

## Interactive States
- **Tap/Active:** Instant color change (no transitions)
- **Selected Filters:** Filled background color (#EADCF0)
- **Favorites:** Heart fills with color
- **Cart Badge:** Number indicator on cart icon
- **Disabled:** 50% opacity

## Pagination
- Simple numbered controls: ← 1 2 3 →
- Current page: Highlighted with accent color
- Touch targets: 44px minimum

## Images
**Product Photos:** Cloudinary-hosted, WebP format, lazy loading enabled
**Image Strategy:**
- Clean white or subtle gradient backgrounds for product photos
- Consistent lighting and angles across all products
- No decorative background images - focus on products
- Optimized for mobile: 800px max width

## Performance Notes
- 12 products per page maximum
- Lazy load images below fold
- Minimal JavaScript (vanilla only)
- No framework overhead

## Prohibited Elements
- ❌ Hover effects
- ❌ 3D icons or buttons
- ❌ Complex gradients or shadows
- ❌ Animations or transitions
- ❌ Desktop-first patterns
- ❌ Alert() popups (use modals)