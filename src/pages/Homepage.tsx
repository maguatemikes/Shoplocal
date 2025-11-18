import { ArrowRight, Sparkles, Palette, Leaf, Pencil, Zap, ShoppingBag, UtensilsCrossed, Key, Wrench, Recycle, Gavel, Users, Calendar, Package, Award, Smartphone, Star, Shield, Gem, Crown, Search, ShoppingCart, Heart, Gift, Gamepad2, Trophy, Shirt, Pizza, Salad, Beef, IceCream, Utensils, PartyPopper, Mic2, Car, Box, WashingMachine, Scissors, Sprout, Plug, Hammer, Armchair, Laptop, Watch, Music, Grid3x3, Dumbbell, Store, UserPlus, CheckCircle, MapPin, Building2, Filter, Map } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { VendorCard } from '../components/VendorCard';
import { ProductCard } from '../components/ProductCard';
import { ShopLocalSection } from '../components/ShopLocalSection';
import { vendors, products, categories, marketplaceItems } from '../lib/mockData';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useState } from 'react';
import { motion } from 'motion/react';

// Icon mapping
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Palette,
  Leaf,
  Pencil,
  Zap
};

// Sub-category icon mapping
const subCategoryIcons: { [key: string]: { [key: string]: React.ComponentType<{ className?: string }> } } = {
  'Products': {
    'All': Grid3x3,
    'Custom Gifts': Gift,
    'Toys': Gamepad2,
    'Sports': Trophy,
    'Jewelry': Gem,
    'Clothes': Shirt
  },
  'Food': {
    'All': Utensils,
    'Pizza': Pizza,
    'Healthy': Salad,
    'Burgers': Beef,
    'Desserts': IceCream,
    'Asian': UtensilsCrossed
  },
  'Rentals': {
    'All': Key,
    'Events': PartyPopper,
    'Audio/Video': Mic2,
    'Vehicles': Car,
    'Equipment': Box
  },
  'Services': {
    'All': Wrench,
    'Cleaning': WashingMachine,
    'Lawn Care': Sprout,
    'Plumbing': Package,
    'Electrical': Plug,
    'Handyman': Hammer
  },
  'Used Goods': {
    'All': Recycle,
    'Furniture': Armchair,
    'Electronics': Laptop,
    'Antiques': Watch,
    'Appliances': WashingMachine
  },
  'Auctions': {
    'All': Gavel,
    'Jewelry': Gem,
    'Art': Palette,
    'Collectibles': Star,
    'Music': Music
  },
  'Local Community': {
    'All': Users,
    'Fitness': Dumbbell,
    'Markets': Store,
    'Clubs': UserPlus,
    'Groups': Users
  },
  'Events': {
    'All': Calendar,
    'Music': Music,
    'Food & Drink': UtensilsCrossed,
    'Art': Palette,
    'Sports': Trophy,
    'Festivals': PartyPopper
  }
};

export function Homepage() {
  const navigate = useNavigate();
  const featuredVendors = vendors.slice(0, 3);
  const newProducts = products.filter(p => p.isNew).slice(0, 8);
  
  console.log('Homepage component is rendering');
  
  const [activeCategory, setActiveCategory] = useState<string>('Products');
  const [activeTab, setActiveTab] = useState('All');
  
  // Define subcategories for each main category
  const categorySubTabs: { [key: string]: string[] } = {
    'Products': ['All', 'Custom Gifts', 'Toys', 'Sports', 'Jewelry', 'Clothes'],
    'Food': ['All', 'Pizza', 'Healthy', 'Burgers', 'Desserts', 'Asian'],
    'Rentals': ['All', 'Events', 'Audio/Video', 'Vehicles', 'Equipment'],
    'Services': ['All', 'Cleaning', 'Lawn Care', 'Plumbing', 'Electrical', 'Handyman'],
    'Used Goods': ['All', 'Furniture', 'Electronics', 'Antiques', 'Appliances'],
    'Auctions': ['All', 'Jewelry', 'Art', 'Collectibles', 'Music'],
    'Local Community': ['All', 'Fitness', 'Markets', 'Clubs', 'Groups'],
    'Events': ['All', 'Music', 'Food & Drink', 'Art', 'Sports', 'Festivals']
  };
  
  // Get current subcategory tabs
  const currentSubTabs = categorySubTabs[activeCategory] || ['All'];
  
  // Handle category change - reset to "All" tab
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveTab('All');
  };
  
  // Filter marketplace items based on selected category and tab
  const filteredMarketplaceItems = marketplaceItems.filter(item => {
    const categoryMatch = item.marketplaceCategory === activeCategory;
    const tabMatch = activeTab === 'All' || item.subCategory === activeTab;
    return categoryMatch && tabMatch;
  }).slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section - Full Width Banner */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Full-width background image collage */}
        <div className="absolute inset-0">
          <div className="grid grid-cols-3 h-full">
            {/* Left Image */}
            <motion.div 
              className="relative overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1760464022002-138d5139f9f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFsbCUyMGJ1c2luZXNzJTIwc2hvcHBpbmclMjBwZW9wbGV8ZW58MXx8fHwxNzYxNzQ2NTk0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="People shopping at local business"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Center Image */}
            <motion.div 
              className="relative overflow-hidden"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758520387260-dbd4b5365007?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lcnMlMjBzaG9wcGluZyUyMHN0b3JlfGVufDF8fHx8MTc2MTc0NjY4OXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Customers shopping at local store"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Right Image */}
            <motion.div 
              className="relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1752650732081-8f61e81813ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMGJ1c2luZXNzJTIwb3duZXIlMjBjdXN0b21lcnxlbnwxfHx8fDE3NjE3NDY1OTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Local business owner with customer"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
          
          {/* Dark overlay for text readability */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-2 bg-sky-600/20 border border-sky-400/30 rounded-full text-sky-300 text-sm mb-6 backdrop-blur-sm">
                Where Quality Meets Community
              </span>
              <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl mb-6 max-w-4xl mx-auto">
                Shop Premium Brands & Support Local Sellers
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Discover exclusive products from trusted brands and independent local artisans—all in one marketplace that values quality, authenticity, and community.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => navigate('/products')}
                  className="px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-sky-600/30 hover:shadow-sky-600/50 hover:scale-105"
                >
                  Start Shopping
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => navigate('/vendors')}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-lg transition-all duration-300 flex items-center gap-2 backdrop-blur-sm hover:scale-105"
                >
                  Explore Vendors
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* NEW: Dual Positioning Strategy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-50 border border-sky-200 rounded-full mb-4">
              <CheckCircle className="w-4 h-4 text-sky-600" />
              <span className="text-sm text-sky-900">Authorized Retail Partner</span>
            </div>
            <h2 className="text-4xl tracking-tight text-gray-900 mb-4">Your Choice: National or Local</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're an authorized retail partner selling premium brands nationally at wholesale prices. 
              Plus, we connect you with local authorized sellers for the same brands—supporting your community while getting what you need.
            </p>
          </motion.div>

          {/* Dual Value Props */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Shop National */}
            <motion.div 
              className="relative bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-8 overflow-hidden group hover:shadow-xl transition-all"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl text-gray-900 mb-4">Shop National from WFE</h3>
                <p className="text-gray-700 mb-6">
                  Direct from us—authorized wholesale prices on premium brands. Fast shipping nationwide. Convenient online shopping with trusted quality.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Wholesale pricing on authorized brands</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Fast nationwide shipping</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">One-stop shopping convenience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Premium product guarantees</span>
                  </li>
                </ul>
                <button
                  onClick={() => navigate('/products/')}
                  className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all flex items-center justify-center gap-2 group-hover:scale-105"
                >
                  Shop National Brands
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* Shop Local */}
            <motion.div 
              className="relative bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-3xl p-8 overflow-hidden group hover:shadow-xl transition-all"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Store className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl text-gray-900 mb-4">Shop Local Authorized Sellers</h3>
                <p className="text-gray-700 mb-6">
                  Find authorized local sellers near you. Same brands, support your community, build local relationships. Products & services (restaurants, doctors, lawyers, wellness).
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Verified authorized local sellers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Support your community businesses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Products + local services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Build local relationships</span>
                  </li>
                </ul>
                <button
                  onClick={() => navigate('/vendors/')}
                  className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all flex items-center justify-center gap-2 group-hover:scale-105"
                >
                  Find Local Sellers
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Benefits Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-sky-600" />
              </div>
              <h4 className="text-gray-900 mb-2">Verified Sellers</h4>
              <p className="text-sm text-gray-600">
                All local sellers are authorized and verified with official badges
              </p>
            </motion.div>

            <motion.div 
              className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-sky-600" />
              </div>
              <h4 className="text-gray-900 mb-2">Same Quality Brands</h4>
              <p className="text-sm text-gray-600">
                Whether you shop national or local, you get the same premium brands
              </p>
            </motion.div>

            <motion.div 
              className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-sky-600" />
              </div>
              <h4 className="text-gray-900 mb-2">Beyond Products</h4>
              <p className="text-sm text-gray-600">
                Find local services too—restaurants, doctors, lawyers, wellness pros
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Promotional Banners */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 - New Seller Discount */}
            <motion.div 
              className="relative bg-gradient-to-br from-sky-500 to-sky-600 rounded-3xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-8 relative z-10">
                <div className="mb-3">
                  <span className="text-white/90 text-sm tracking-wide uppercase">UP TO 20% OFF</span>
                </div>
                <h3 className="text-white text-2xl mb-6 leading-tight">
                  Get The Latest<br />Products From<br />Top Sellers
                </h3>
                <button 
                  onClick={() => navigate('/products/')}
                  className="bg-white text-gray-900 px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  SEE ALL
                </button>
              </div>
              <Package className="absolute bottom-4 right-4 w-32 h-32 text-white/20" />
            </motion.div>

            {/* Card 2 - Quality Products */}
            <motion.div 
              className="relative bg-gradient-to-br from-sky-600 to-sky-700 rounded-3xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="p-8 relative z-10">
                <div className="mb-3">
                  <span className="text-white/90 text-sm tracking-wide uppercase">TRUSTED SELLERS</span>
                </div>
                <h3 className="text-white text-2xl mb-6 leading-tight">
                  Quality<br />Affordable<br />Products
                </h3>
                <button 
                  onClick={() => navigate('/vendors/')}
                  className="bg-white text-gray-900 px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  SEE ALL
                </button>
              </div>
              <Award className="absolute bottom-4 right-4 w-32 h-32 text-white/20" />
            </motion.div>

            {/* Card 3 - Mobile App Coming Soon */}
            <motion.div 
              className="relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="p-8 relative z-10">
                <div className="mb-3">
                  <span className="text-white/90 text-sm tracking-wide uppercase">COMING SOON!</span>
                </div>
                <h3 className="text-white text-2xl mb-6 leading-tight">
                  ShopLocal<br />Mobile App
                </h3>
                <button 
                  onClick={() => navigate('/about/')}
                  className="bg-white text-gray-900 px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  SEE ALL
                </button>
              </div>
              <Smartphone className="absolute bottom-4 right-4 w-32 h-32 text-white/20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Featured Exclusive Brands */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-50 border border-sky-200 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span className="text-sm text-sky-900">Exclusive Partnerships</span>
            </div>
            <h2 className="text-4xl tracking-tight text-gray-900 mb-3">Premium Brands You Trust</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Shop exclusive collections from top brands partnered with ShopLocal for quality you can count on
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Brand Cards */}
            {[
              { 
                icon: Leaf, 
                label: 'Eco-Friendly',
                description: 'Sustainable Products',
                stats: 'EcoWear & More',
                color: 'from-green-500 to-emerald-500',
                delay: 0.1 
              },
              { 
                icon: Palette, 
                label: 'Handmade Artisan',
                description: 'Crafted with Care',
                stats: 'Artisan Collection',
                color: 'from-purple-500 to-pink-500',
                delay: 0.2 
              },
              { 
                icon: Pencil, 
                label: 'Custom & Personalized',
                description: 'Your Design, Our Craft',
                stats: 'PrintPro Partners',
                color: 'from-blue-500 to-cyan-500',
                delay: 0.3 
              },
              { 
                icon: Sparkles, 
                label: 'Premium Brands',
                description: 'Tech, Beauty & More',
                stats: 'TechLife & NaturalGlow',
                color: 'from-amber-500 to-orange-500',
                delay: 0.4 
              }
            ].map((brand, index) => {
              const Icon = brand.icon;
              return (
                <motion.div 
                  key={index}
                  className="group relative bg-white rounded-2xl p-6 hover:shadow-2xl transition-all cursor-pointer border border-gray-200 hover:border-transparent overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: brand.delay }}
                  whileHover={{ y: -8 }}
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${brand.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                  
                  {/* Icon with gradient background */}
                  <div className="relative mb-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${brand.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-gray-900 mb-1">{brand.label}</h3>
                    <p className="text-sm text-gray-500 mb-3">{brand.description}</p>
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-12 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full" />
                      <span className="text-xs text-gray-600">{brand.stats}</span>
                    </div>
                  </div>
                  
                  {/* Hover arrow indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5 text-sky-600" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/products/')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all group shadow-lg hover:shadow-xl"
            >
              Explore All Brands
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Shop Local Marketplace */}
      <ShopLocalSection />

      {/* 5. Top Categories */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl tracking-tight text-gray-900 mb-3">Shop by Category</h2>
            <p className="text-gray-600">
              Find exactly what you're looking for
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => {
              const Icon = iconMap[category.iconName];
              return (
                <motion.button
                  key={category.name}
                  onClick={() => navigate('/products/')}
                  className="group bg-white rounded-2xl p-8 text-center hover:shadow-lg hover:shadow-gray-100/50 border border-gray-100 hover:border-gray-200 transition-all"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-sky-600" />
                    </div>
                  </div>
                  <h3 className="text-gray-900 group-hover:text-sky-600 transition-colors">
                    {category.name}
                  </h3>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Marketplace & Community */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl tracking-tight text-gray-900 mb-3">Marketplace & Community</h2>
            <p className="text-gray-600">Explore our diverse collection of products and services</p>
          </motion.div>

          {/* Main Category Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { icon: ShoppingBag, label: 'Products', color: 'bg-gray-100 text-gray-700 hover:bg-gray-200' },
                { icon: UtensilsCrossed, label: 'Food', color: 'bg-pink-100 text-pink-700 hover:bg-pink-200' },
                { icon: Key, label: 'Rentals', color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
                { icon: Wrench, label: 'Services', color: 'bg-purple-100 text-purple-700 hover:bg-purple-200' },
                { icon: Recycle, label: 'Used Goods', color: 'bg-orange-100 text-orange-700 hover:bg-orange-200' },
                { icon: Gavel, label: 'Auctions', color: 'bg-amber-100 text-amber-700 hover:bg-amber-200' },
                { icon: Users, label: 'Local Community', color: 'bg-sky-100 text-sky-700 hover:bg-sky-200' },
                { icon: Calendar, label: 'Events', color: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200' }
              ].map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.label}
                    onClick={() => handleCategoryChange(category.label)}
                    className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
                      activeCategory === category.label 
                        ? 'bg-sky-600 text-white shadow-lg scale-105' 
                        : category.color
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sub-category Tabs - Dynamic based on main category */}
          <div className="mb-8 border-b border-gray-200">
            <div className="flex flex-wrap gap-2 justify-center pb-4">
              {currentSubTabs.map((tab) => {
                const SubIcon = subCategoryIcons[activeCategory]?.[tab];
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all ${
                      activeTab === tab
                        ? 'bg-sky-600 text-white shadow-md scale-105'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {SubIcon && <SubIcon className="w-4 h-4" />}
                    <span className="text-sm">{tab}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Grid - Dynamic */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMarketplaceItems.length > 0 ? (
              filteredMarketplaceItems.map((item, index) => (
                <motion.div 
                  key={item.id} 
                  className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all group cursor-pointer"
                  onClick={() => navigate('/products/')}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {item.isNew && (
                      <div className="absolute top-3 right-3 bg-sky-600 text-white text-xs px-2 py-1 rounded-full shadow-md">
                        NEW
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-white border-t-2 border-gray-200">
                    <h3 className="text-sm text-gray-900 mb-1 line-clamp-1">{item.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-sky-600">${item.price.toFixed(2)}</p>
                      {item.location && (
                        <p className="text-xs text-gray-500">{item.location}</p>
                      )}
                      {item.date && (
                        <p className="text-xs text-gray-500">{item.date}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No items found in this category</p>
              </div>
            )}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/products/')}
              className="inline-flex items-center gap-2 px-8 py-3 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition-colors group shadow-lg"
            >
              View All Products
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. New Arrivals */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="flex items-end justify-between mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-4xl tracking-tight text-gray-900 mb-3">New Arrivals</h2>
              <p className="text-gray-600">
                Latest products from our marketplace sellers
              </p>
            </div>
            <button
              onClick={() => navigate('/products/')}
              className="hidden md:flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              View all
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ProductCard
                  product={product}
                  onViewProduct={(slug) => navigate(`/product/${slug}/`)}
                  onViewVendor={(slug) => navigate(`/vendor/${slug}/`)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Why Shop With Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl tracking-tight text-gray-900 mb-3">The Best of Both Worlds</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Premium quality from exclusive brands meets the heart and soul of local makers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Customers */}
            <motion.div 
              className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-14 h-14 bg-sky-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🛍️</span>
              </div>
              <h3 className="text-xl text-gray-900 mb-3">For Customers</h3>
              <p className="text-gray-600 mb-4">
                Discover premium products and support your local makers — all in one trusted marketplace.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-sky-600 mt-0.5">✓</span>
                  <span>Curated exclusive brands</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-600 mt-0.5">✓</span>
                  <span>Support local artisans</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-600 mt-0.5">✓</span>
                  <span>Quality you can trust</span>
                </li>
              </ul>
            </motion.div>

            {/* For Brands */}
            <motion.div 
              className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-14 h-14 bg-sky-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl text-gray-900 mb-3">For Brands</h3>
              <p className="text-gray-600 mb-4">
                Access an engaged, values-driven audience that appreciates quality and authenticity.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-sky-600 mt-0.5">✓</span>
                  <span>Premium positioning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-600 mt-0.5">✓</span>
                  <span>Exclusive partnerships</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-600 mt-0.5">✓</span>
                  <span>Targeted audience</span>
                </li>
              </ul>
            </motion.div>

            {/* For Local Sellers */}
            <motion.div 
              className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-14 h-14 bg-sky-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl text-gray-900 mb-3">For Local Sellers</h3>
              <p className="text-gray-600 mb-4">
                Get visibility alongside national brands and reach customers who value local commerce.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-sky-600 mt-0.5">✓</span>
                  <span>Premium marketplace exposure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-600 mt-0.5">✓</span>
                  <span>Community support badges</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-600 mt-0.5">✓</span>
                  <span>Featured seller opportunities</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 9. How It Works */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-sky-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span className="text-sm text-gray-300">Simple & Easy</span>
            </div>
            <h2 className="text-4xl tracking-tight mb-3">How It Works</h2>
            <p className="text-gray-400">
              Three simple steps to start shopping from local and premium sellers
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting lines */}
            <div className="hidden md:block absolute top-24 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-sky-500/50 to-blue-500/50" />
            <div className="hidden md:block absolute top-24 left-2/3 w-1/3 h-0.5 bg-gradient-to-r from-blue-500/50 to-purple-500/50" />
            
            {[
              { 
                step: '01', 
                icon: Search,
                title: 'Browse', 
                desc: 'Discover unique products from independent sellers and premium brands',
                color: 'from-sky-500 to-blue-500',
                delay: 0.1
              },
              { 
                step: '02', 
                icon: ShoppingCart,
                title: 'Buy', 
                desc: 'Securely purchase from multiple vendors in one seamless checkout',
                color: 'from-blue-500 to-purple-500',
                delay: 0.2
              },
              { 
                step: '03', 
                icon: Heart,
                title: 'Support', 
                desc: 'Help small businesses and local makers grow with every purchase',
                color: 'from-purple-500 to-pink-500',
                delay: 0.3
              }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={i} 
                  className="relative group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: item.delay }}
                >
                  {/* Card */}
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all group-hover:scale-105 overflow-hidden">
                    {/* Step number background */}
                    <div className="absolute top-4 right-4 text-8xl font-light text-white/5 select-none">
                      {item.step}
                    </div>
                    
                    {/* Icon with gradient */}
                    <div className="relative mb-6">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-sm px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-white`}>
                          Step {item.step}
                        </span>
                      </div>
                      <h3 className="text-2xl text-white mb-3 group-hover:text-sky-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    
                    {/* Hover arrow */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-6 h-6 text-sky-400" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* CTA Button */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <button
              onClick={() => navigate('/products/')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-xl hover:from-sky-500 hover:to-blue-500 transition-all group shadow-lg hover:shadow-xl"
            >
              Start Shopping Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 10. Community & Social */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl tracking-tight text-gray-900 mb-4">Join Our Community</h2>
            <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
              Share your ShopLocal finds and support local makers
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-sky-50 border border-sky-200 rounded-full">
              <span className="text-sky-900">#ShopLocalWithUs</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 text-center">
              <div className="text-3xl mb-4">🏪</div>
              <h3 className="text-xl text-gray-900 mb-2">Shop Global. Support Local.</h3>
              <p className="text-gray-600 text-sm">
                Exclusive brands you trust, local makers you'll love
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 text-center">
              <div className="text-3xl mb-4">❤️</div>
              <h3 className="text-xl text-gray-900 mb-2">Premium & Purpose-Driven</h3>
              <p className="text-gray-600 text-sm">
                Quality products that make a difference
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 text-center">
              <div className="text-3xl mb-4">✨</div>
              <h3 className="text-xl text-gray-900 mb-2">Exclusives You Love</h3>
              <p className="text-gray-600 text-sm">
                Premium brands + local artisans in one place
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Seller CTA */}
      <section className="py-24 bg-gradient-to-br from-sky-50 to-blue-50/50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-600 rounded-2xl mb-6">
            <ArrowRight className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-4xl tracking-tight text-gray-900 mb-4">Are You a Local Seller or Brand?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get visibility alongside premium brands and reach customers who value quality and community. Featured placements, local badges, and more.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/sell/')}
              className="group px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl transition-all inline-flex items-center justify-center gap-2"
            >
              Start Selling Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/about/')}
              className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 rounded-xl border-2 border-gray-200 transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Homepage;