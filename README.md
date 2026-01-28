# Milestone 3 – RevoShop (Next.js)

## Overview

RevoShop is a simple e-commerce frontend application built as part of RevoU Milestone 3.
The project focuses on applying Next.js App Router concepts, data fetching strategies, and state management fundamentals without implementing a backend or payment system.

The main goal of this project is to demonstrate a clear understanding of modern frontend architecture using Next.js, including server-side rendering, dynamic routing, and clean component separation.

---

## Tech Stack

| Category               | Tools / Technologies        | Description                                                             |
| ---------------------- | --------------------------- | ----------------------------------------------------------------------- |
| **Design**             | Figma                       | UI exploration and layout planning for product listing and detail pages |
| **Development**        | Next.js 14                  | React framework using App Router and server components                  |
|                        | React 18                    | UI library for building reusable components                             |
|                        | TypeScript                  | Static typing for better code safety and maintainability                |
|                        | Tailwind CSS                | Utility-first CSS framework for responsive styling                      |
|                        | React Context API           | Global state management for shopping cart functionality                 |
| **Data Source**        | FakeStore API               | External API used to fetch product data                                 |
| **Rendering Strategy** | Server-Side Rendering (SSR) | Dynamic data fetching for product detail and deployment stability       |
| **Version Control**    | Git & GitHub                | Source code management and collaboration                                |
| **Deployment**         | Vercel                      | Hosting and continuous deployment for the Next.js application           |
| **Validation & QA**    | ESLint                      | Code quality and consistency checking                                   |
| **Learning Resources** | Official Next.js Docs       | Reference for App Router, SSR, and configuration                        |
|                        | ChatGPT                     | Architecture discussion, debugging guidance, and code explanation       |

---

## Features

- Product listing page (Home)
- Product detail page with dynamic routing
- Server-side rendering (SSR) for product detail
- Responsive UI built with Tailwind CSS
- Clean component-based architecture

---

## Application Structure

```
src/
├── app/
│ ├── page.tsx // Home page (product listing)
│ └── products/
│ └── [id]/
│ └── page.tsx // Product detail page (SSR)
├── components/
│ ├── ProductGrid.tsx
│ └── ProductCard.tsx
└── context/ // (planned) Cart context
```

---

## Architecture Decisions

### Server-Side Rendering for Product Detail

The product detail page uses server-side rendering (SSR) to fetch product data dynamically based on the requested product ID.
This approach ensures that each product page is rendered with up-to-date data at request time and supports dynamic routing using the App Router.

### Rendering Strategy for Home Page

Initially, the home page was designed using static generation. However, due to the reliance on an external API that may not always be available during build time, the rendering strategy was adjusted to dynamic rendering (SSR).

This decision improves deployment reliability and prevents build-time failures caused by external API availability.

### Component Separation

The application follows a clear separation of concerns:

- Pages handle routing and data fetching
- Components focus on UI rendering
- Reusable components such as ProductCard and ProductGrid improve maintainability

---

## Challenges & Solutions

### Build-Time Fetch Failure on Vercel

During deployment on Vercel, the application initially failed to build due to a data-fetching error when attempting to statically pre-render the home page.

The error occurred because the external product API was not reliably accessible during the build process, causing the static generation step to fail.

To resolve this issue:

- The home page rendering strategy was changed to dynamic rendering
- Data fetching was moved to request time instead of build time
- Proper fallback handling was implemented to prevent build crashes

This approach aligns better with real-world scenarios where external APIs cannot be guaranteed during deployment.

---

## Live Demo

https://milestone-3-liaro25.vercel.app

---

## Repository

https://github.com/Revou-FSSE-Oct25/milestone-3-liaro25
