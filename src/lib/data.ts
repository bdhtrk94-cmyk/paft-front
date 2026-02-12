import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 1,
    name: "Standard Pallet 1200x800",
    price: "$45",
    description: "Heavy-duty plastic pallet suitable for warehouse storage and general logistics operations",
    specifications: {
      dimensions: "1200 x 800 x 150 mm",
      weight: "15 kg",
      capacity: "1500 kg"
    },
    category: "Standard",
    inStock: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 2,
    name: "Euro Pallet 1200x1000",
    price: "$52",
    description: "European standard plastic pallet for international shipping and export operations",
    specifications: {
      dimensions: "1200 x 1000 x 150 mm",
      weight: "18 kg",
      capacity: "2000 kg"
    },
    category: "Euro",
    inStock: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 3,
    name: "Heavy Duty Pallet 1200x1200",
    price: "$68",
    description: "Extra strong pallet designed for heavy industrial applications and extreme conditions",
    specifications: {
      dimensions: "1200 x 1200 x 160 mm",
      weight: "22 kg",
      capacity: "3000 kg"
    },
    category: "Heavy Duty",
    inStock: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 4,
    name: "Lightweight Pallet 1000x800",
    price: "$38",
    description: "Lightweight option perfect for reducing shipping costs while maintaining durability",
    specifications: {
      dimensions: "1000 x 800 x 140 mm",
      weight: "12 kg",
      capacity: "1200 kg"
    },
    category: "Lightweight",
    inStock: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 5,
    name: "Export Pallet 1100x1100",
    price: "$58",
    description: "Square pallet optimized for container shipping and international trade",
    specifications: {
      dimensions: "1100 x 1100 x 150 mm",
      weight: "19 kg",
      capacity: "2200 kg"
    },
    category: "Export",
    inStock: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 6,
    name: "Pharmaceutical Pallet 800x600",
    price: "$42",
    description: "Clean room compatible pallet for pharmaceutical and food industry applications",
    specifications: {
      dimensions: "800 x 600 x 140 mm",
      weight: "10 kg",
      capacity: "1000 kg"
    },
    category: "Specialized",
    inStock: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  }
];

export const categories = [
  "Standard",
  "Euro", 
  "Heavy Duty",
  "Lightweight",
  "Export",
  "Specialized"
];

export const companyInfo = {
  name: "PAFT Plastic Pallets",
  description: "Leading manufacturer of premium plastic pallets in Egypt",
  address: "123 Industrial Zone, Manufacturing District, Cairo, Egypt",
  phone: "+20 123 456 7890",
  email: "info@paft.com",
  salesEmail: "sales@paft.com",
  businessHours: "Sunday - Thursday: 9:00 AM - 6:00 PM",
  founded: "2010",
  employees: "50+",
  certifications: ["ISO 9001", "ISO 14001", "HACCP"]
};