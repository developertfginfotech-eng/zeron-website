# Zaron Real Estate Investment Platform - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern fintech platforms like Robinhood and real estate platforms like Airbnb, with emphasis on trust, professionalism, and data visualization clarity.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Brand Primary: 220 85% 25% (Deep professional blue)
- Brand Secondary: 220 60% 95% (Light blue for backgrounds)

**Dark Mode:**
- Background: 220 15% 8% (Dark blue-gray)
- Surface: 220 12% 12% (Elevated surfaces)
- Text Primary: 0 0% 95% (Near white)

**Light Mode:**
- Background: 0 0% 98% (Off-white)
- Surface: 0 0% 100% (Pure white)
- Text Primary: 220 15% 15% (Dark gray)

**Accent Colors:**
- Success: 142 76% 36% (Green for gains/profits)
- Warning: 38 92% 50% (Orange for pending states)
- Error: 0 84% 60% (Red for losses/errors)

### Typography
- **Primary Font**: Inter (Google Fonts) - Modern, professional
- **Secondary Font**: JetBrains Mono (for financial data/codes)
- **Hierarchy**: 
  - Headlines: 32px/28px/24px (Bold)
  - Body: 16px/14px (Regular/Medium)
  - Captions: 12px (Medium)

### Layout System
**Spacing Units**: Tailwind 2, 4, 6, 8, 12, 16
- Consistent 8px grid system
- Card padding: p-6
- Section spacing: space-y-8
- Component margins: m-4

### Component Library

**Navigation:**
- Mobile: Bottom tab bar with 5 icons (Home, Explore, Portfolio, Documents, Profile)
- Admin: Collapsible sidebar with grouped menu items
- Clean typography hierarchy with subtle icons

**Cards & Data Display:**
- Property cards: Image thumbnail, price, location, ROI percentage
- Investment summary cards: Large numbers with trend indicators
- Chart containers: Clean backgrounds with subtle borders

**Forms & Inputs:**
- Rounded corners (rounded-lg)
- Focus states with brand color outline
- File upload areas with drag-and-drop styling
- Multi-language input support

**Buttons:**
- Primary: Solid brand color with white text
- Secondary: Outline with brand color border
- Floating Action: For quick investment actions

## Platform-Specific Guidelines

### Mobile App (React Native)
- **Visual Style**: Clean, card-based interface with generous whitespace
- **Navigation**: Bottom tabs with subtle animations
- **Investment Flow**: Progressive disclosure with clear CTAs
- **Charts**: Simplified mobile-friendly visualizations

### Admin Panel (React.js)
- **Layout**: Sidebar + main content area
- **Dashboard**: Grid-based with data cards and charts
- **Tables**: Sortable columns with pagination
- **Dark/Light Toggle**: Smooth transition between themes

## Multi-Language Considerations
- **RTL Support**: Proper Arabic text alignment and layout mirroring
- **Language Toggle**: Prominent switch in navigation
- **Typography**: Adjusted line heights for Arabic text

## Images
- **Property Thumbnails**: 16:9 aspect ratio, high-quality architectural photography
- **User Avatars**: Circular, 40px default size
- **Document Previews**: PDF/image thumbnails with file type indicators
- **No Large Hero Images**: Focus on content and functionality over marketing visuals

## Animations
- **Minimal Use**: Subtle transitions for navigation and state changes
- **Loading States**: Clean skeleton screens and progress indicators
- **Success Feedback**: Brief confirmation animations for completed actions

This design system prioritizes trust, clarity, and professional presentation suitable for financial services while maintaining modern aesthetics and excellent usability across both mobile and web platforms.