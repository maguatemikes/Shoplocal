import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Clock, TrendingUp, Tag, Sparkles } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../lib/mockData';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export function DealsPromotions() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock deals data (in real app, these would have actual discount prices)
  const flashDeals = products.slice(0, 4);
  const trendingDeals = products.slice(4, 8);
  const newDeals = products.slice(2, 6);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-sky-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8" />
            <h1 className="text-4xl">Deals & Promotions</h1>
            <Sparkles className="w-8 h-8" />
          </div>
          <p className="text-xl text-sky-100">
            Save big on your favorite products from local vendors
          </p>
        </div>
      </section>

      {/* Flash Sale Banner */}
      <section className="py-8 bg-gradient-to-r from-orange-50 to-red-50 border-y border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 rounded-full p-3">
                <Zap className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl text-gray-950 mb-1">Flash Sale!</h2>
                <p className="text-gray-600">Limited time offers - Don't miss out!</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="text-sm text-gray-600">Ends in:</span>
              </div>
              <div className="flex gap-2">
                <div className="bg-white rounded-lg p-3 min-w-[60px] text-center border border-orange-200">
                  <div className="text-2xl text-gray-950">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="text-xs text-gray-500">Hours</div>
                </div>
                <div className="bg-white rounded-lg p-3 min-w-[60px] text-center border border-orange-200">
                  <div className="text-2xl text-gray-950">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="text-xs text-gray-500">Mins</div>
                </div>
                <div className="bg-white rounded-lg p-3 min-w-[60px] text-center border border-orange-200">
                  <div className="text-2xl text-gray-950">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="text-xs text-gray-500">Secs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Banner Deals */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Deal 1 */}
            <div 
              className="relative bg-gradient-to-br from-sky-600 to-blue-700 rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => navigate('/marketplace/products/')}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="relative p-8 text-white">
                <Badge className="bg-yellow-400 text-yellow-900 mb-4 rounded-lg">
                  Up to 50% OFF
                </Badge>
                <h3 className="text-3xl mb-2">Eco-Friendly Collection</h3>
                <p className="text-sky-100 mb-6">
                  Sustainable products for a better tomorrow
                </p>
                <div className="inline-block bg-white text-sky-600 px-6 py-2 rounded-lg group-hover:bg-sky-50 transition-colors">
                  Shop Now →
                </div>
              </div>
            </div>

            {/* Deal 2 */}
            <div 
              className="relative bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => navigate('/marketplace/products/')}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="relative p-8 text-white">
                <Badge className="bg-yellow-400 text-yellow-900 mb-4 rounded-lg">
                  Buy 2 Get 1 FREE
                </Badge>
                <h3 className="text-3xl mb-2">Handmade Crafts</h3>
                <p className="text-purple-100 mb-6">
                  Unique artisan pieces from local creators
                </p>
                <div className="inline-block bg-white text-purple-600 px-6 py-2 rounded-lg group-hover:bg-purple-50 transition-colors">
                  Shop Now →
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deals Tabs */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="flash" className="space-y-8">
            <TabsList className="bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="flash" className="rounded-lg">
                <Zap className="w-4 h-4 mr-2" />
                Flash Deals
              </TabsTrigger>
              <TabsTrigger value="trending" className="rounded-lg">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="new" className="rounded-lg">
                <Tag className="w-4 h-4 mr-2" />
                New Deals
              </TabsTrigger>
            </TabsList>

            {/* Flash Deals */}
            <TabsContent value="flash">
              <div className="mb-6">
                <h2 className="text-2xl text-gray-950 mb-2">Flash Deals</h2>
                <p className="text-gray-500">Limited time offers expiring soon</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {flashDeals.map((product) => (
                  <div key={product.id} className="relative">
                    <Badge className="absolute top-4 left-4 z-10 bg-red-600 text-white rounded-lg">
                      -30%
                    </Badge>
                    <ProductCard
                      product={product}
                      onViewProduct={(slug) => navigate(`/marketplace/product/${slug}`)}
                      onViewVendor={(slug) => navigate(`/marketplace/vendor/${slug}`)}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Trending Deals */}
            <TabsContent value="trending">
              <div className="mb-6">
                <h2 className="text-2xl text-gray-950 mb-2">Trending Deals</h2>
                <p className="text-gray-500">Most popular deals right now</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {trendingDeals.map((product) => (
                  <div key={product.id} className="relative">
                    <Badge className="absolute top-4 left-4 z-10 bg-sky-600 text-white rounded-lg">
                      -25%
                    </Badge>
                    <ProductCard
                      product={product}
                      onViewProduct={(slug) => navigate(`/marketplace/product/${slug}`)}
                      onViewVendor={(slug) => navigate(`/marketplace/vendor/${slug}`)}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* New Deals */}
            <TabsContent value="new">
              <div className="mb-6">
                <h2 className="text-2xl text-gray-950 mb-2">New Deals</h2>
                <p className="text-gray-500">Fresh offers added today</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {newDeals.map((product) => (
                  <div key={product.id} className="relative">
                    <Badge className="absolute top-4 left-4 z-10 bg-green-600 text-white rounded-lg">
                      -20%
                    </Badge>
                    <ProductCard
                      product={product}
                      onViewProduct={(slug) => navigate(`/marketplace/product/${slug}`)}
                      onViewVendor={(slug) => navigate(`/marketplace/vendor/${slug}`)}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="w-12 h-12 text-sky-600 mx-auto mb-4" />
          <h2 className="text-3xl text-gray-950 mb-4">Never Miss a Deal</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to get exclusive deals and early access to sales
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
            <button className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}