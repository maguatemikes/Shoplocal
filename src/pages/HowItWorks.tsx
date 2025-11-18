import { ShoppingBag, Search, Store, CreditCard, Truck, Award, Shield, Heart, ArrowRight, ArrowDown, CheckCircle, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

export function HowItWorks() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-sky-600 to-sky-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl mb-6">How It Works</h1>
          <p className="text-xl text-sky-100 max-w-2xl mx-auto">
            Simple steps to start buying or selling on our marketplace
          </p>
        </div>
      </section>

      {/* For Buyers Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-sky-100 text-sky-700 rounded-full mb-6">
              <ShoppingBag className="w-4 h-4" />
              <span>For Buyers</span>
            </div>
            <h2 className="text-4xl text-gray-900 mb-4">Shop Unique Products</h2>
            <p className="text-xl text-gray-600">
              Four simple steps to discover and purchase from independent sellers
            </p>
          </div>

          {/* Step 1 */}
          <div className="relative mb-12">
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-sky-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  1
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-sky-600" />
                    </div>
                    <h3 className="text-2xl text-gray-900">Discover Products</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Browse our curated marketplace of unique products from independent sellers worldwide. Use filters and search to find exactly what you need.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white rounded-lg text-sm text-gray-700 border border-gray-200">
                      Search & Filter
                    </span>
                    <span className="px-3 py-1 bg-white rounded-lg text-sm text-gray-700 border border-gray-200">
                      Browse Categories
                    </span>
                    <span className="px-3 py-1 bg-white rounded-lg text-sm text-gray-700 border border-gray-200">
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Arrow */}
            <div className="flex justify-center my-6">
              <ArrowDown className="w-8 h-8 text-sky-300" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative mb-12">
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-sky-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  2
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-sky-600" />
                    </div>
                    <h3 className="text-2xl text-gray-900">Place Orders Securely</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Shop from multiple vendors in one order with secure checkout and payment processing. Your payment is protected until delivery.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white rounded-lg text-sm text-gray-700 border border-gray-200">
                      Add to Cart
                    </span>
                    <span className="px-3 py-1 bg-white rounded-lg text-sm text-gray-700 border border-gray-200">
                      Secure Checkout
                    </span>
                    <span className="px-3 py-1 bg-white rounded-lg text-sm text-gray-700 border border-gray-200">
                      Multiple Vendors
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Arrow */}
            <div className="flex justify-center my-6">
              <ArrowDown className="w-8 h-8 text-sky-300" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative mb-12">
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-sky-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  3
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                      <Truck className="w-6 h-6 text-sky-600" />
                    </div>
                    <h3 className="text-2xl text-gray-900">Vendors Ship Directly</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Sellers fulfill orders directly from their warehouse to you with tracking provided. Track your shipment in real-time.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white rounded-lg text-sm text-gray-700 border border-gray-200">
                      Direct Shipping
                    </span>
                    <span className="px-3 py-1 bg-white rounded-lg text-sm text-gray-700 border border-gray-200">
                      Track Package
                    </span>
                    <span className="px-3 py-1 bg-white rounded-lg text-sm text-gray-700 border border-gray-200">
                      Fast Delivery
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Arrow */}
            <div className="flex justify-center my-6">
              <ArrowDown className="w-8 h-8 text-sky-300" />
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative mb-12">
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-sky-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  4
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                      <Heart className="w-6 h-6 text-sky-600" />
                    </div>
                    <h3 className="text-2xl text-gray-900">Support Small Businesses</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Every purchase helps independent creators and small businesses grow. Leave reviews to help other buyers and sellers.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white rounded-lg text-sm text-gray-700 border border-gray-200">
                      Leave Review
                    </span>
                    <span className="px-3 py-1 bg-white rounded-lg text-sm text-gray-700 border border-gray-200">
                      Support Local
                    </span>
                    <span className="px-3 py-1 bg-white rounded-lg text-sm text-gray-700 border border-gray-200">
                      Reorder
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Button
              onClick={() => navigate('/marketplace/products/')}
              size="lg"
              className="bg-sky-600 hover:bg-sky-700 text-white px-10 py-6 rounded-xl text-lg"
            >
              Start Shopping
              <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      {/* For Sellers Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-sky-100 text-sky-700 rounded-full mb-6">
              <Store className="w-4 h-4" />
              <span>For Sellers</span>
            </div>
            <h2 className="text-4xl text-gray-900 mb-4">Grow Your Business</h2>
            <p className="text-xl text-gray-600">
              Three simple steps to start selling and reach thousands of buyers
            </p>
          </div>

          {/* Step 1 */}
          <div className="relative mb-12">
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-sky-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  1
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                      <Store className="w-6 h-6 text-sky-600" />
                    </div>
                    <h3 className="text-2xl text-gray-900">Apply to Join</h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Fill out our simple application with your business details and product samples. We review all applications within 3-5 business days.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-sky-600 flex-shrink-0" />
                      <span className="text-gray-700">Quick application process</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-sky-600 flex-shrink-0" />
                      <span className="text-gray-700">No upfront fees</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-sky-600 flex-shrink-0" />
                      <span className="text-gray-700">Review in 3-5 business days</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Arrow */}
            <div className="flex justify-center my-6">
              <ArrowDown className="w-8 h-8 text-sky-300" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative mb-12">
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-sky-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  2
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-sky-600" />
                    </div>
                    <h3 className="text-2xl text-gray-900">Set Up Your Store</h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Once approved, customize your vendor storefront and upload your products. Our intuitive dashboard makes management easy.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-sky-600 flex-shrink-0" />
                      <span className="text-gray-700">Custom branding options</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-sky-600 flex-shrink-0" />
                      <span className="text-gray-700">Easy product management</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-sky-600 flex-shrink-0" />
                      <span className="text-gray-700">Set your own prices</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Arrow */}
            <div className="flex justify-center my-6">
              <ArrowDown className="w-8 h-8 text-sky-300" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative mb-12">
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-sky-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  3
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-sky-600" />
                    </div>
                    <h3 className="text-2xl text-gray-900">Start Selling</h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Receive orders, fulfill them directly, and get paid weekly. Track your performance with detailed analytics.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-sky-600 flex-shrink-0" />
                      <span className="text-gray-700">Manage orders from dashboard</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-sky-600 flex-shrink-0" />
                      <span className="text-gray-700">Weekly automatic payouts</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-sky-600 flex-shrink-0" />
                      <span className="text-gray-700">Only 10% commission</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Button
              onClick={() => navigate('/marketplace/sell/')}
              size="lg"
              className="bg-sky-600 hover:bg-sky-700 text-white px-10 py-6 rounded-xl text-lg"
            >
              Become a Seller
              <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-gray-900 mb-4">Why Choose Our Marketplace?</h2>
            <p className="text-gray-600">Benefits for both buyers and sellers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="text-lg text-gray-900 mb-2">Verified Sellers</h3>
              <p className="text-gray-600 text-sm">
                All vendors are vetted and approved to ensure quality and reliability
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="text-lg text-gray-900 mb-2">Secure Transactions</h3>
              <p className="text-gray-600 text-sm">
                Protected payments and buyer protection for every purchase
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="text-lg text-gray-900 mb-2">Unique Products</h3>
              <p className="text-gray-600 text-sm">
                Find one-of-a-kind items you won't see anywhere else
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="text-lg text-gray-900 mb-2">Direct Shipping</h3>
              <p className="text-gray-600 text-sm">
                Products ship directly from sellers for faster delivery
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="text-lg text-gray-900 mb-2">Support Small Business</h3>
              <p className="text-gray-600 text-sm">
                Every purchase directly supports independent creators
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="text-lg text-gray-900 mb-2">Customer Support</h3>
              <p className="text-gray-600 text-sm">
                Dedicated support team ready to help with any questions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-10">
            Whether you're looking to shop or sell, we're here to help
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/marketplace/products/')}
              size="lg"
              className="bg-sky-600 hover:bg-sky-700 text-white px-8 rounded-xl"
            >
              Browse Products
            </Button>
            <Button
              onClick={() => navigate('/marketplace/sell/')}
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 px-8 rounded-xl"
            >
              Become a Seller
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}