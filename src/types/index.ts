export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  specifications: {
    dimensions: string;
    weight: string;
    capacity: string;
  };
  category: string;
  inStock: boolean;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  address?: string;
  createdAt: Date;
}

export interface Order {
  id: number;
  customerId: number;
  products: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: Date;
  deliveryDate?: Date;
  notes?: string;
}

export interface OrderItem {
  productId: number;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
}

export interface ContactForm {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  productType?: string;
  message: string;
}

export interface QuoteRequest {
  id: number;
  customerInfo: ContactForm;
  products: {
    productId: number;
    quantity: number;
  }[];
  status: 'pending' | 'sent' | 'accepted' | 'rejected';
  createdAt: Date;
  validUntil: Date;
}