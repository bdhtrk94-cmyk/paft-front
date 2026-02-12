export interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    category: string;
    image: string;
    badge?: string;
    inStock: boolean;
    description: string;
    fullDescription?: string;
}

export const categories = [
    'All',
    'Plastic Pallets',
    'IBC Containers',
    'Crates & Bins',
    'Pallet Accessories',
    'Custom Solutions',
];

export const priceRanges = [
    { label: 'All Prices', min: 0, max: Infinity },
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 – $150', min: 50, max: 150 },
    { label: '$150 – $500', min: 150, max: 500 },
    { label: '$500+', min: 500, max: Infinity },
];

export const sortOptions = [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low → High', value: 'price-asc' },
    { label: 'Price: High → Low', value: 'price-desc' },
    { label: 'Top Rated', value: 'rating' },
    { label: 'Newest', value: 'newest' },
];

export const PRODUCTS_PER_PAGE = 8;
