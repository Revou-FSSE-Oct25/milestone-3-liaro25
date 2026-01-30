# RevoShop

**Where online feels like offline — without the hustle of queueing**

RevoShop is a demo e-commerce web application built as part of **RevoU Milestone 3**.  
The project focuses on **Next.js App Router**, **TypeScript**, clean architecture, and global state management.

---

### NextJS Version Used

- **Node.js v18.x**
- **npm v9+ / v10+**

### Steps

```bash
npm install
npm run dev
```

Open

```bash
http://localhost:3000
```

## Tech Stack

| Category               | Tools / Technologies         | Description                                                             |
| ---------------------- | ---------------------------- | ----------------------------------------------------------------------- |
| **Design**             | Figma                        | UI exploration and layout planning for product listing and detail pages |
| **Development**        | Next.js 14                   | React framework using App Router and Server Components                  |
|                        | React 18                     | UI library for building reusable and interactive components             |
|                        | TypeScript                   | Static typing for improved code safety and maintainability              |
|                        | Tailwind CSS                 | Utility-first CSS framework for responsive and consistent styling       |
|                        | React Context API            | Global state management for shopping cart functionality                 |
| **State Persistence**  | localStorage                 | Client-side persistence for cart data across page refresh               |
| **Data Source**        | Platzi Fake Store API        | External API used to fetch product data                                 |
| **Rendering Strategy** | Server-Side Rendering (SSR)  | Dynamic data fetching for product list and detail pages                 |
|                        | Static Site Generation (SSG) | Static rendering for FAQ and informational pages                        |
| **Version Control**    | Git & GitHub                 | Source code management and version control                              |
| **Deployment**         | Vercel                       | Hosting and continuous deployment for the Next.js application           |
| **Learning Resources** | Official Next.js Docs        | Reference for App Router, routing, and rendering strategies             |
|                        | ChatGPT                      | Architecture discussion, debugging guidance, and code explanation       |

## Features

## ✨ Features

### 🛒 Product

- Product listing page (`/products`)
- Product detail page (`/products/[id]`)
- Dynamic routing using Next.js App Router
- Product data fetched from an external API

### 🧺 Cart

- Add to Cart from:
  - Product listing page
  - Product detail page
- Quantity control with increase (`+`) and decrease (`−`)
- Remove individual items and clear entire cart
- Cart state persisted using **localStorage**
- Real-time cart item count displayed in header

### 🧭 Navigation

- Global header navigation including:
  - **RevoShop** brand (clickable → Home)
  - FAQ page
  - Cart page

### 📄 FAQ

- Static FAQ page (`/faq`)
- Built using **Static Site Generation (SSG)**

📁 Project Structure

```
src/
├── app/
│   ├── products/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── cart/page.tsx
│   ├── faq/page.tsx
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   └── AddToCartButton.tsx
│
├── context/
│   └── CartContext.tsx
│
├── types/
│   ├── product.ts
│   └── cart.ts
│
└── styles/
```
Development History (Short & Practical)

Environment setup

Initial setup had issues with Node 20 (Turbopack / instability)

Switched to Node 18 + Next.js 14 for stability (Node 16 caused incompatibility)

Restarted from a clean state to avoid cascading errors

Data modeling first

Defined types/product.ts based on API response

Avoided mixing data concerns early

Product listing

Built Product Card component

Fetched product list and rendered on homepage

Implemented App Router structure

Product detail routing

Added dynamic route /products/[id]

Connected “View Details” using <Link>

Ensured proper back navigation (no 404)

UI foundation

Added global Header with branding

Initial cart badge was UI-only (dummy state)

Committed stable checkpoint before cart logic

Cart architecture

Created separate types/cart.ts (not reusing Product type)

Implemented CartContext for global state

Persisted cart using localStorage

Wiring interactivity

Connected cart badge in Header to context

Implemented Add to Cart via client components

Separated UI components vs logic (components vs context)

Final polish

Stable product list + detail flow

Cart works across pages and persists on refresh

Clean, maintainable folder structure