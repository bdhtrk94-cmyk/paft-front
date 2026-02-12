# PAFT Frontend System 🎨

Modern web application for PAFT Plastic Pallets - A leading manufacturer of premium plastic pallets in Egypt.

## 🏢 About PAFT

PAFT specializes in durable, eco-friendly, and cost-effective logistics solutions for various industries including industrial logistics, pharmaceutical, food industry, and export operations.

**Founded**: 2010 | **Employees**: 50+ | **Certifications**: ISO 9001, ISO 14001, HACCP

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom React components with Lucide React icons
- **Maps**: Leaflet with React Leaflet for interactive maps
- **Fonts**: Geist Sans and Geist Mono
- **Development**: ESLint with Next.js config

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/bdhtrk94-cmyk/paft-front.git
cd paft-front
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment setup**
```bash
cp .env.example .env.local
# Configure your API URL in .env.local
```

4. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🌟 Features

### Customer Features
- **Product Catalog**: Browse 6 main categories (Standard, Euro, Heavy Duty, Lightweight, Export, Specialized)
- **Company Information**: Learn about PAFT's journey and certifications
- **Interactive Maps**: Explore market coverage with Leaflet maps
- **Contact Forms**: Request quotes and get in touch
- **Shopping Cart**: Add products and manage orders
- **Responsive Design**: Optimized for desktop, tablet, and mobile

### Admin Features
- **Dashboard**: Overview of system statistics
- **User Management**: Manage user accounts and roles
- **Product Management**: Add, edit, and delete products
- **Content Management**: Update site content and pages
- **Order Processing**: View and manage customer orders

## 📱 Pages & Routes

### Public Pages
- `/` - Homepage with video hero and company overview
- `/about` - Company information and certifications
- `/products` - Product catalog with categories
- `/products/[category]` - Category-specific product pages
- `/shop` - E-commerce product listing
- `/shop/[id]` - Individual product details
- `/company/markets` - Interactive market coverage maps
- `/contact` - Contact form and company details
- `/our-journey` - Company history and milestones

### Authentication
- `/login` - User login
- `/register` - User registration

### Admin Dashboard
- `/admin` - Admin dashboard overview
- `/admin/products` - Product management
- `/admin/users` - User management
- `/admin/pages` - CMS page management
- `/admin/site-content` - Site content management

## 🎨 Design System

### Colors
- **Primary**: Blue tones for trust and professionalism
- **Secondary**: Green accents for eco-friendly messaging
- **Neutral**: Gray scale for text and backgrounds
- **Status**: Success, warning, and error states

### Components
- **Header**: Navigation with authentication state
- **Footer**: Company information and links
- **ProductCard**: Reusable product display component
- **VideoHero**: Homepage video background
- **InteractiveMap**: Market coverage visualization
- **CartSidebar**: Shopping cart management
- **AdminSidebar**: Admin navigation

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   ├── admin/              # Admin dashboard pages
│   ├── products/           # Product catalog pages
│   ├── shop/               # E-commerce pages
│   ├── company/            # Company information pages
│   ├── contact/            # Contact page
│   ├── login/              # Authentication pages
│   └── register/           # User registration
├── components/             # Reusable React components
│   ├── admin/              # Admin-specific components
│   ├── auth/               # Authentication components
│   ├── maps/               # Map-related components
│   ├── shop/               # E-commerce components
│   └── [Component].tsx     # Shared components
├── context/                # React context providers
│   ├── AuthContext.tsx     # Authentication state
│   └── CartContext.tsx     # Shopping cart state
├── lib/                    # Utility functions and data
│   ├── data.ts             # Static data
│   ├── constants.ts        # Application constants
│   ├── colors.ts           # Color definitions
│   └── utils.ts            # Helper functions
├── types/                  # TypeScript type definitions
│   └── index.ts            # Shared interfaces
└── hooks/                  # Custom React hooks
```

## 🔗 API Integration

The frontend communicates with the PAFT Backend System:
- **Backend Repository**: https://github.com/Tarqumi/Paft-System-backend
- **API Base URL**: `http://localhost:3001/api` (development)

### Authentication Flow
1. User login/register through forms
2. JWT token stored in context
3. Protected routes check authentication state
4. Admin routes require admin role

### Data Management
- **Products**: Fetched from `/api/products`
- **Orders**: Managed through `/api/orders`
- **User Profile**: Updated via `/api/users`
- **Admin Data**: Accessed through `/api/admin/*`

## 🌐 Environment Variables

```env
# Disable Turbopack for Windows compatibility
NEXT_PRIVATE_TURBO=false

# Disable fast refresh to prevent constant reloading
FAST_REFRESH=false

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Mobile Features
- Touch-friendly navigation
- Optimized forms and inputs
- Responsive images and videos
- Mobile-first CSS approach

## 🚀 Deployment

The application is ready for deployment on:
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **DigitalOcean App Platform**

### Production Checklist
- [ ] Update API URL for production
- [ ] Configure environment variables
- [ ] Set up SSL/TLS
- [ ] Optimize images and assets
- [ ] Configure CDN
- [ ] Set up monitoring

## 🔐 Security Features

- JWT token management
- Protected routes with authentication
- Role-based access control
- Input validation and sanitization
- CSRF protection
- Secure headers configuration

## 🎯 Performance Optimizations

- Next.js App Router for optimal loading
- Image optimization with Next.js Image
- Code splitting and lazy loading
- Static generation where possible
- Efficient bundle size management

## 🤝 Contributing

This is a private project for PAFT. For any questions or support, please contact the development team.

## 📄 License

This project is proprietary software owned by PAFT.

---

**PAFT Frontend System** - Modern web experience for premium plastic pallet solutions 🇪🇬