
// Mock products data with more variety
export const mockProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop",
    category: "Electronics",
    description: "High-quality wireless headphones with noise cancellation and premium sound quality."
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=400&fit=crop",
    category: "Electronics",
    description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring."
  },
  {
    id: 3,
    name: "Designer Leather Jacket",
    price: 449.99,
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=400&fit=crop",
    category: "Fashion",
    description: "Premium leather jacket with classic design and superior craftsmanship."
  },
  {
    id: 4,
    name: "Organic Coffee Beans",
    price: 24.99,
    imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=400&fit=crop",
    category: "Food",
    description: "Ethically sourced organic coffee beans with rich flavor and aroma."
  },
  {
    id: 5,
    name: "Modern Office Chair",
    price: 349.99,
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop",
    category: "Furniture",
    description: "Ergonomic office chair with lumbar support and adjustable height."
  },
  {
    id: 6,
    name: "Wireless Gaming Mouse",
    price: 79.99,
    imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=400&fit=crop",
    category: "Electronics",
    description: "High-precision wireless gaming mouse with customizable RGB lighting."
  },
  {
    id: 7,
    name: "Vintage Denim Jeans",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=400&fit=crop",
    category: "Fashion",
    description: "Classic vintage-style denim jeans with comfortable fit and durable fabric."
  },
  {
    id: 8,
    name: "Bamboo Kitchen Set",
    price: 129.99,
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop",
    category: "Home",
    description: "Eco-friendly bamboo kitchen utensil set with cutting board and storage stand."
  },
  {
    id: 9,
    name: "Professional Camera Lens",
    price: 899.99,
    imageUrl: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=400&fit=crop",
    category: "Electronics",
    description: "Professional-grade camera lens with exceptional image quality and clarity."
  },
  {
    id: 10,
    name: "Yoga Mat Premium",
    price: 59.99,
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=400&fit=crop",
    category: "Sports",
    description: "Non-slip premium yoga mat with extra cushioning for comfort during practice."
  },
  {
    id: 11,
    name: "Artisan Ceramic Mug",
    price: 19.99,
    imageUrl: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500&h=400&fit=crop",
    category: "Home",
    description: "Handcrafted ceramic mug with unique glaze finish and comfortable grip."
  },
  {
    id: 12,
    name: "Wireless Charging Pad",
    price: 39.99,
    imageUrl: "https://images.unsplash.com/photo-1609592806787-3d7e62e9c0cb?w=500&h=400&fit=crop",
    category: "Electronics",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices."
  },
  {
    id: 13,
    name: "Organic Green Tea",
    price: 16.99,
    imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&h=400&fit=crop",
    category: "Food",
    description: "Premium organic green tea with antioxidants and natural flavor."
  },
  {
    id: 14,
    name: "Running Sneakers",
    price: 149.99,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=400&fit=crop",
    category: "Sports",
    description: "Lightweight running sneakers with advanced cushioning and breathable design."
  },
  {
    id: 15,
    name: "Minimalist Wall Clock",
    price: 69.99,
    imageUrl: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500&h=400&fit=crop",
    category: "Home",
    description: "Sleek minimalist wall clock with silent movement and modern design."
  },
  {
    id: 16,
    name: "Professional Notebook",
    price: 29.99,
    imageUrl: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&h=400&fit=crop",
    category: "Office",
    description: "Premium hardcover notebook with dotted pages and elastic closure."
  }
];

// Mock API functions
export const fetchProducts = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockProducts;
};

export const fetchProduct = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const product = mockProducts.find(p => p.id === parseInt(id));
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};
