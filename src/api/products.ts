
// Mock database - in a real app, this would be replaced with a proper database
let products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 99.99,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop",
    category: "electronics",
    description: "Premium wireless headphones with noise cancellation and superior sound quality. Perfect for music lovers and professionals."
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=400&fit=crop",
    category: "clothing",
    description: "Comfortable and sustainable organic cotton t-shirt. Available in multiple colors and sizes."
  },
  {
    id: 3,
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=400&fit=crop",
    category: "accessories",
    description: "Eco-friendly stainless steel water bottle that keeps drinks cold for 24 hours and hot for 12 hours."
  },
  {
    id: 4,
    name: "Smart Fitness Watch",
    price: 199.99,
    imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=400&fit=crop",
    category: "electronics",
    description: "Advanced fitness tracking with heart rate monitor, GPS, and smartphone connectivity."
  },
  {
    id: 5,
    name: "Leather Messenger Bag",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=400&fit=crop",
    category: "accessories",
    description: "Handcrafted leather messenger bag perfect for work or travel. Multiple compartments for organization."
  },
  {
    id: 6,
    name: "Yoga Mat Premium",
    price: 39.99,
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=400&fit=crop",
    category: "fitness",
    description: "Non-slip premium yoga mat with excellent cushioning and durability. Ideal for all yoga practices."
  },
  {
    id: 7,
    name: "Ceramic Coffee Mug Set",
    price: 34.99,
    imageUrl: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500&h=400&fit=crop",
    category: "home",
    description: "Beautiful set of 4 ceramic coffee mugs with elegant design. Perfect for your morning coffee routine."
  },
  {
    id: 8,
    name: "Portable Phone Charger",
    price: 49.99,
    imageUrl: "https://images.unsplash.com/photo-1609592309469-82c1f6e3c84c?w=500&h=400&fit=crop",
    category: "electronics",
    description: "High-capacity portable charger with fast charging technology. Never run out of battery again."
  }
];

let nextId = 9;

export const getAllProducts = () => products;

export const getProductById = (id: number) => {
  return products.find(product => product.id === id);
};

export const createProduct = (productData: Omit<typeof products[0], 'id'>) => {
  const newProduct = {
    id: nextId++,
    ...productData
  };
  products.push(newProduct);
  return newProduct;
};

export const deleteProduct = (id: number) => {
  const index = products.findIndex(product => product.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
};
