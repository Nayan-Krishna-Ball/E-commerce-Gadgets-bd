# Gadgets BD - E-commerce Web Application

A modern Next.js e-commerce application for gadgets, featuring separate interfaces for clients and shop owners. Users can browse products, place orders, and review products, while shop owners can manage inventory and shop details. Built with Next.js, React, Tailwind CSS, and MongoDB.

## Project GitHub Repository:

## Live Demo (Vercel):

# Version

- React: 18

- Next: 14.2.35

- Tailwind CSS: 3.x

# 🚀 Features

## Client Side

- 📃 Browse products and shops

- 🎬 Dynamic product detail pages with reviews and ratings

- 🔗 Clean, SEO-friendly URLs

- 🛒 Add to cart and update quantities

- 🧾 Place orders and view order history

- ⏳ Loading states for better UX

- 🎨 Fully responsive UI using Tailwind CS

## Shop Owner Side

- 🏪 Add and manage products

- 📦 Inventory management

- 🛠 Update shop details

- 🔐 Authentication and protected routes

- 📸 Image upload using ImageKit

# 🧰 Tech Stack

- Framework: Next.js (App Router)

- Language: JavaScript (ES6+)

- Styling: Tailwind CSS

- Database: MongoDB

- Authentication: NextAuth.js

- Image Management: ImageKit

# 📁 Folder Structure

```
GadgetsBD/
├─ app/                  # Pages for client and shop owner
│  ├─ (auth)/            # Login, register, forget password
│  ├─ (home)/            # Home page, modals
│  ├─ cart/              # Cart pages
│  ├─ orders/            # Orders pages
│  ├─ products/          # Product listing & details
│  ├─ profile/           # User profile pages
│  ├─ shop/              # Shop owner management pages
│  ├─ shops/             # Public shop pages
│  └─ layout.js          # Root layout & providers
├─ components/           # Reusable UI components
│  ├─ auth/              # Login, register, social login
│  ├─ cart/              # Cart components
│  ├─ home/              # Home page components
│  ├─ order/             # Orders components
│  ├─ payment/           # Payment components
│  ├─ products/          # Product list & cards
│  ├─ productsDetails/   # Product detail components
│  ├─ search/            # Filter and search components
│  ├─ shop/              # Shop management components
│  ├─ shopOwnerDetails/  # Shop owner profile components
│  ├─ shops/             # Shop list & single shop components
│  └─ FooterHome.jsx     # Global footer
├─ lib/                  # DB connection & token utils
├─ models/               # MongoDB models
├─ queries/              # Database query helpers
├─ utils/                # Utility functions
├─ .env                  # Environment variables
├─ next.config.mjs       # Next.js config
├─ tailwind.config.js    # Tailwind CSS config
└─ package.json


```

# System Design

```


┌─────────────────────────────────────────────────────────┐
│                     Client Browser                      │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                    Next.js App Router                   │
├───────────────┬──────────────────┬──────────────────────┤
│  Customer     │   Shop Owner     │   Authentication     │
│  Routes       │   Routes         │   Routes             │
├───────────────┼──────────────────┼──────────────────────┤
│ /products     │ /shop/dashboard  │ /auth/login          │
│ /cart         │ /shop/products   │ /auth/register       │
│ /orders       │ /shop/inventory  │ /auth/forgot-password│
│ /shops        │ /shop/settings   │                      │
└───────────────┴──────────────────┴──────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                    API Layer                            │
│              (Next.js Route Handlers)                   │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                   Data Layer                            │
├─────────────────┬──────────────────┬────────────────────┤
│  MongoDB        │   ImageKit       │   NextAuth         │
│  Database       │   Storage        │   Session          │
└─────────────────┴──────────────────┴────────────────────┘
```

# 🧱 Component Hierarchy

```
               ┌─────────────────────┐
               │     app/layout.js   │
               └──────────┬──────────┘
                          │
               ┌──────────▼──────────┐
               │     app/page.js     │
               │   (Home Page)       │
               └──────────┬──────────┘
                          │
               ┌──────────▼──────────┐
               │ <HomeHero />        │
               │ <FeaturedProducts />│
               └──────────┬──────────┘
            ┌─────────────┼───────────────┐
     ┌──────▼──────┐ ┌────▼─────────┐ ┌─────▼──────────┐
     │ <HomeNav /> │ │ <ShopBrands> │ │ <PopularCate/> │
     └─────────────┘ └──────────────┘ └────────────────┘


```

## Dynamic Product Page Hierarchy

```
               ┌───────────────────────┐
               │ app/products/[slug]/  │
               │        page.js        │
               └─────────────┬─────────┘
                             │
                  ┌──────────▼──────────┐
                  │ <ProductsDetails /> │
                  └──────────┬──────────┘
                             │
                  ┌──────────▼──────────┐
                  │ <RelatedProducts /> │
                  └──────────┬──────────┘
                             │
                  ┌──────────▼──────────┐
                  │ <Review />          │
                  └─────────────────────┘


```

# 📚 Utility Functions (lib & utils)

- Database queries and helper functions

- Token generation and verification

- Replace MongoDB \_id with id in responses

- Filter, sort, and search helper functions

# 🔮 Future Implementations

## Client Side

- 🔑 Forget Password functionality

## Shop Owner Side

- 📦 Order Status Management

- 🗑 Product Delete functionality

# ▶️ How to Run the Project

## Clone the repository

git clone

## Install dependencies

npm install

## Run development server

npm run dev

# 📌 Conclusion

\*\* Gadgets BD demonstrates:

- Dynamic routing in Next.js

- Clean and modular component architecture

- Responsive UI using Tailwind CSS

- Full-stack functionality with MongoDB and NextAuth
