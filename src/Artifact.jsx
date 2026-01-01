import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Search, Heart, User, ChevronRight } from 'lucide-react';

const ShoeStore = () => {
  const [cart, setCart] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCart, setShowCart] = useState(false);

  const products = [
    {
      id: 1,
      name: "Air Runner Pro",
      category: "running",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
      description: "Lightweight running shoes with superior cushioning"
    },
    {
      id: 2,
      name: "Classic Sneaker",
      category: "casual",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80",
      description: "Timeless design for everyday comfort"
    },
    {
      id: 3,
      name: "Sport Elite",
      category: "sports",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&q=80",
      description: "High-performance athletic footwear"
    },
    {
      id: 4,
      name: "Urban Walker",
      category: "casual",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80",
      description: "Perfect for city strolls and casual outings"
    },
    {
      id: 5,
      name: "Trail Master",
      category: "outdoor",
      price: 159.99,
      image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&q=80",
      description: "Rugged outdoor shoes for any terrain"
    },
    {
      id: 6,
      name: "Speed Racer",
      category: "running",
      price: 139.99,
      image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&q=80",
      description: "Maximum speed and agility for runners"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Shoes' },
    { id: 'running', name: 'Running' },
    { id: 'casual', name: 'Casual' },
    { id: 'sports', name: 'Sports' },
    { id: 'outdoor', name: 'Outdoor' }
  ];

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, change) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                className="md:hidden mr-4"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-2xl font-bold text-gray-900">SoleStyle</h1>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Shop</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">About</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Contact</a>
            </nav>

            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-gray-900">
                <Search size={20} />
              </button>
              <button className="text-gray-700 hover:text-gray-900">
                <Heart size={20} />
              </button>
              <button className="text-gray-700 hover:text-gray-900">
                <User size={20} />
              </button>
              <button 
                className="relative text-gray-700 hover:text-gray-900"
                onClick={() => setShowCart(!showCart)}
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <div className="px-4 py-3 space-y-3">
              <a href="#" className="block text-gray-700 hover:text-gray-900">Home</a>
              <a href="#" className="block text-gray-700 hover:text-gray-900">Shop</a>
              <a href="#" className="block text-gray-700 hover:text-gray-900">About</a>
              <a href="#" className="block text-gray-700 hover:text-gray-900">Contact</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Step Into Style</h2>
            <p className="text-xl mb-8">Discover premium footwear for every occasion</p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex overflow-x-auto space-x-4">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group">
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
                />
                <button className="absolute top-4 right-4 bg-white p-2 rounded-full hover:bg-gray-100 transition">
                  <Heart size={20} className="text-gray-600" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shopping Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowCart(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold">Shopping Cart</h2>
              <button onClick={() => setShowCart(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 border-b pb-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-600">${item.price}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="bg-gray-200 px-2 py-1 rounded"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="bg-gray-200 px-2 py-1 rounded"
                          >
                            +
                          </button>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-red-600 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t p-6">
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-blue-600">${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center">
                  Checkout
                  <ChevronRight size={20} className="ml-2" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SoleStyle</h3>
              <p className="text-gray-400">Premium footwear for every step of your journey.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Running Shoes</a></li>
                <li><a href="#" className="hover:text-white">Casual Shoes</a></li>
                <li><a href="#" className="hover:text-white">Sports Shoes</a></li>
                <li><a href="#" className="hover:text-white">Outdoor Shoes</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white">Returns</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe for exclusive offers</p>
              <input 
                type="email" 
                placeholder="Your email"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SoleStyle. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ShoeStore;