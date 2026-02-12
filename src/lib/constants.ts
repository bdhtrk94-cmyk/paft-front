// Constants for the PAFT system

export const COMPANY_INFO = {
  name: "PAFT",
  fullName: "PAFT Plastic Pallets",
  tagline: "Premium Plastic Pallets for Your Business",
  description: "Leading manufacturer of high-quality plastic pallets in Egypt",
  
  contact: {
    email: "info@paft.com",
    salesEmail: "sales@paft.com",
    phone: "+20 123 456 7890",
    address: "123 Industrial Zone, Manufacturing District, Cairo, Egypt",
    businessHours: "Sunday - Thursday: 9:00 AM - 6:00 PM"
  },
  
  social: {
    facebook: "https://web.facebook.com/paft.pallets/?locale=ar_AR&_rdc=1&_rdr#",
    linkedin: "https://www.linkedin.com/company/packaging-&-food-technology-paft/posts/?feedView=all"
  }
};

export const PRODUCT_CATEGORIES = [
  "All",
  "Standard",
  "Euro",
  "Heavy Duty", 
  "Lightweight",
  "Export",
  "Specialized"
];

export const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed", 
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled"
} as const;

export const QUOTE_STATUS = {
  PENDING: "pending",
  SENT: "sent",
  ACCEPTED: "accepted", 
  REJECTED: "rejected"
} as const;

export const PALLET_FEATURES = [
  {
    title: "Durable",
    description: "Built to withstand heavy loads and harsh conditions with superior strength",
    icon: "shield"
  },
  {
    title: "Lightweight", 
    description: "Reduce shipping costs and improve handling efficiency with our lightweight design",
    icon: "feather"
  },
  {
    title: "Eco-Friendly",
    description: "100% recyclable materials supporting your sustainability goals", 
    icon: "leaf"
  },
  {
    title: "Cost-Effective",
    description: "Competitive pricing without compromising on quality",
    icon: "dollar"
  },
  {
    title: "Customizable",
    description: "Custom solutions tailored to your specific requirements",
    icon: "settings"
  },
  {
    title: "Fast Delivery",
    description: "Quick turnaround times for all orders nationwide",
    icon: "truck"
  }
];

export const CERTIFICATIONS = [
  "ISO 9001:2015",
  "ISO 14001:2015", 
  "HACCP",
  "CE Marking",
  "FDA Approved"
];

export const INDUSTRIES_SERVED = [
  "Warehousing & Distribution",
  "Manufacturing",
  "Food & Beverage", 
  "Pharmaceutical",
  "Automotive",
  "Retail & E-commerce",
  "Chemical Industry",
  "Export & Import"
];

export const NAVIGATION_ITEMS = [
  { name: "Home", href: "/", key: "home" },
  { name: "Products", href: "/products", key: "products" },
  { name: "About", href: "/about", key: "about" },
  { name: "Contact", href: "/contact", key: "contact" }
];

export const ADMIN_NAVIGATION = [
  { name: "Dashboard", href: "/admin", key: "dashboard" },
  { name: "Products", href: "/admin/products", key: "products" },
  { name: "Orders", href: "/admin/orders", key: "orders" },
  { name: "Customers", href: "/admin/customers", key: "customers" },
  { name: "Reports", href: "/admin/reports", key: "reports" }
];

export const DEFAULT_PRODUCT_IMAGE = "/images/pallet-placeholder.jpg";

export const PAGINATION = {
  PRODUCTS_PER_PAGE: 12,
  ORDERS_PER_PAGE: 20,
  CUSTOMERS_PER_PAGE: 25
};

export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\+]?[1-9][\d]{0,15}$/,
  MIN_PASSWORD_LENGTH: 8,
  MAX_MESSAGE_LENGTH: 1000
};

export const TESTIMONIALS = [
  {
    name: "Ahmed Hassan",
    company: "Cairo Logistics",
    role: "Operations Manager",
    content: "PAFT pallets have transformed our warehouse operations. The durability and lightweight design have significantly reduced our shipping costs while maintaining excellent quality.",
    rating: 5
  },
  {
    name: "Sarah Mohamed",
    company: "Delta Foods",
    role: "Supply Chain Director",
    content: "We've been using PAFT plastic pallets for over 3 years. Their consistency in quality and excellent customer service make them our preferred supplier.",
    rating: 5
  },
  {
    name: "Omar Farouk",
    company: "Alexandria Export Co.",
    role: "Export Manager",
    content: "The Euro standard pallets from PAFT are perfect for our international shipments. They meet all requirements and have never let us down.",
    rating: 5
  }
];