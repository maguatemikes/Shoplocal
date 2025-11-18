import { Star, ArrowRight, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { products } from '../lib/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ShopLocalSection() {
  const navigate = useNavigate();

  // Get first 3 products from local vendors
  const localProducts = products.slice(0, 3);

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 border border-[#b8e6fe] rounded-full mb-6">
            <span className="text-sm">🏪 Support Your Community</span>
          </div>
          <h2 className="text-4xl tracking-tight text-gray-900 mb-4">
            Shop Local Marketplace
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover products from artisans and small businesses in your community. Shop small, shop near.
          </p>
        </motion.div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {localProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleProductClick(product.id)}
            >
              {/* Local Badge */}
              <div className="absolute top-4 right-4 z-10 bg-[#0084d1] px-3 py-1 rounded-full shadow-lg">
                <p className="text-white text-xs">❤️ Local</p>
              </div>

              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-gray-50">
                <ImageWithFallback 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Product Info */}
                <div className="mb-4">
                  <h3 className="text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                </div>

                {/* Rating & Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#FFB900] stroke-[#FFB900]" />
                    <span className="text-sm text-gray-900">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviewCount || 0})</span>
                  </div>
                  <div className="text-gray-900">${product.price}</div>
                </div>

                {/* Category Tag */}
                <div className="inline-flex items-center px-3 py-1.5 bg-gray-50 rounded-lg mb-4">
                  <span className="text-xs text-gray-600">{product.category}</span>
                </div>

                {/* View Details Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(product.id);
                  }}
                  className="w-full bg-[#0EA5E9] hover:bg-sky-600 text-white py-2.5 px-4 rounded-lg text-sm transition-colors"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Browse All Button */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            onClick={() => navigate('/products/')}
            className="inline-flex items-center gap-2 bg-[#0084d1] hover:bg-[#0074b8] text-white px-6 py-3 rounded-lg transition-colors"
          >
            Browse All Local Products
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}