# PriceL - Price Comparison Web App

A modern React.js price comparison website built with Vite, React Router, and Tailwind CSS.

## Features

- 🔐 **Authentication System** - Login and Signup pages with demo authentication
- 🏠 **Landing Page** - Hero section, featured products, and categories
- 🔍 **Search Page** - Filter and sort products by category and price
- 📦 **Product Detail Page** - Compare prices across multiple retailers
- 🏪 **Shop/Brand Detail Pages** - View products available at specific retailers
- 🛒 **Shopping List** - Add items to your shopping list with best prices
- 👤 **Profile Page** - User dashboard with stats and preferences
- 🎨 **Responsive Design** - Fully responsive with Tailwind CSS

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - State management for auth and shopping list

## Getting Started

### Prerequisites

- Node.js 14+ and npm

### Installation

1. The project is already set up in your current directory

2. Install dependencies (if not already done):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Demo Credentials

For login, you can use any email and password:
- Email: demo@example.com
- Password: any password

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   └── ProtectedRoute.jsx
├── context/            # React Context for state management
│   ├── AuthContext.jsx
│   └── ShoppingListContext.jsx
├── data/               # Dummy data
│   └── dummyData.js
├── pages/              # Page components
│   ├── LandingPage.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── SearchPage.jsx
│   ├── ProductDetail.jsx
│   ├── ShopDetail.jsx
│   ├── ShoppingList.jsx
│   └── Profile.jsx
├── App.jsx            # Main app component with routing
├── main.jsx           # Entry point
└── index.css          # Global styles with Tailwind
```

## Features Explained

### Authentication
- Protected routes for Shopping List and Profile pages
- Session persistence using localStorage
- Demo mode - accepts any credentials

### Product Comparison
- Compare prices from multiple retailers
- Visual indicators for best prices
- Stock availability status
- Direct links to retailer websites

### Shopping List
- Add products with selected retailer
- View total cost
- Remove items or clear entire list
- Persistent storage using localStorage

### Search & Filter
- Search by product name or description
- Filter by category
- Sort by name or price
- Real-time results

## Dummy Data

The app includes dummy data for:
- 8 products across different categories
- 6 online retailers/shops
- 4 brands
- Multiple price points per product

## Customization

### Adding Real Data
Replace the dummy data in `src/data/dummyData.js` with real data from your API or database.

### Styling
Tailwind CSS is configured and ready to use. Modify `tailwind.config.js` to customize colors, fonts, etc.

### API Integration
Update the authentication and data fetching functions in the context files to connect to your backend API.

## License

MIT

## Author

Built with ❤️ using React, Vite, and Tailwind CSS
