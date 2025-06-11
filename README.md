# vite-re-dummy

## Features

- CRUD operations using [Dummy JSON API](https://dummyjson.com/)
- Protected routes with authentication
- Product management
- Role-based access control
- Modern UI with responsive design

## Setup

1. Clone the repository
2. Goto /client run: `npm install`
3. Goto /server run: `npm install`
4. Inside root (/dummy-sdf) run: `npm install`
5. Start development server: `npm run dev`

## Protected Routes

- `/dashboard` - Requires authentication
- `/admin` - Requires admin role
- `/profile` - User profile management

## API Integration

- GET /products - Fetch all products
- POST /products - Create new product
- PUT /products/:id - Update product
- DELETE /products/:id - Delete product

## Technologies

- React.js
- Vite
- React Router dom
- TailwindCSS
