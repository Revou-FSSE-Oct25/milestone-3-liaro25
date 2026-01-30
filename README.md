## 🧭 Development History (Short & Practical)

### Environment Setup

- Initial setup encountered issues with **Node.js 20** (Turbopack instability).
- Switched to **Node.js 18** with **Next.js 14** for better stability.
- Node.js 16 caused incompatibility with some dependencies.
- Restarted from a clean state to avoid cascading configuration errors.

### Data Modeling First

- Defined `types/product.ts` based on API response.
- Kept product and cart data models separated from the beginning.

### Product Listing

- Built reusable **ProductCard** component.
- Fetched product list and rendered on the homepage.
- Implemented App Router structure.

### Product Detail Routing

- Added dynamic route `/products/[id]`.
- Connected “View Details” navigation using `<Link>`.
- Ensured correct routing without 404 issues.

### UI Foundation

- Added global **Header** with branding.
- Implemented initial cart badge (UI-only).
- Committed a stable checkpoint before cart logic.

### Cart Architecture

- Created separate `types/cart.ts`.
- Implemented **CartContext** for global state management.
- Persisted cart data using **localStorage**.

### Wiring Interactivity

- Connected cart badge in Header to CartContext.
- Implemented “Add to Cart” via client components.
- Clearly separated UI components and business logic.

### Final Polish

- Stable product list and product detail flow.
- Cart state persists across pages and page refresh.
- Clean and maintainable folder structure.
