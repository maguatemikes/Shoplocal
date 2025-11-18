import { Store, Users, Shield, TrendingUp, Award, Heart, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function AboutPage() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1920&h=600&fit=crop"
            alt="About us"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <span className="text-sm text-white">Where Quality Meets Community</span>
          </div>
          <h1 className="text-white mb-6">Your Trusted Destination for Exclusive Brands & Local Sellers</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            We're building a marketplace that connects premium brands and local artisans with customers who value quality, authenticity, and community.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-black mb-6 text-center">Our Story</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              ShopLocal Marketplace was born from a vision: create a platform where premium exclusive brands and local independent sellers can thrive side by side, while customers enjoy the best of both worlds.
            </p>
            <p>
              <strong>We're an Authorized Retail Partner.</strong> This means we have direct partnerships with premium brands to sell their products nationally at wholesale prices. But we don't stop there—we also promote local authorized sellers for those same brands on a local level.
            </p>
            <p>
              <strong>Your Choice: National or Local.</strong> Want the convenience of ordering directly from us with fast national shipping? We've got you. Prefer to support a local authorized seller in your community for the same brand? We'll connect you with them. It's shopping on your terms.
            </p>
            <p>
              Our dual approach means you get curated quality from established brands while discovering unique, handcrafted items from local creators. Every purchase supports both innovation in retail and entrepreneurship in your community.
            </p>
            <p>
              <strong>Beyond Products: Services Too.</strong> We don't just sell products—we also connect you with local service providers like restaurants, doctors, lawyers, and wellness professionals. Whether you're shopping for goods or looking for trusted local services, we're your one-stop marketplace.
            </p>
            <p>
              Since our launch, we've built partnerships with 47+ premium brands, empowered hundreds of local sellers, and created a trusted marketplace where quality meets community.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-black mb-4">Our Values</h2>
            <p className="text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-sky-600" />
              </div>
              <h3 className="text-black mb-3">Premium Quality</h3>
              <p className="text-gray-600 text-sm">
                Exclusive brand partnerships and carefully vetted local sellers ensure you get premium quality every time
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-sky-600" />
              </div>
              <h3 className="text-black mb-3">Community First</h3>
              <p className="text-gray-600 text-sm">
                Supporting local makers and bringing communities together through conscious commerce
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-sky-600" />
              </div>
              <h3 className="text-black mb-3">Values-Driven</h3>
              <p className="text-gray-600 text-sm">
                We partner with brands and sellers who share our commitment to quality, sustainability, and authenticity
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-sky-600" />
              </div>
              <h3 className="text-black mb-3">Curated Excellence</h3>
              <p className="text-gray-600 text-sm">
                Every product and seller is handpicked to create a trusted marketplace you can rely on
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* By The Numbers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-black mb-4">Our Impact</h2>
            <p className="text-gray-600">Building a thriving ecosystem of brands, sellers, and customers</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl text-sky-600 mb-2">15+</div>
              <p className="text-gray-600">Exclusive Brand Partners</p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-sky-600 mb-2">250+</div>
              <p className="text-gray-600">Local Sellers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-sky-600 mb-2">50K+</div>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-sky-600 mb-2">95%</div>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Partnerships & Local Sellers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Exclusive Brands */}
            <div>
              <div className="text-center md:text-left mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-50 border border-sky-200 rounded-full mb-4">
                  <span className="text-sm text-sky-900">Premium Partners</span>
                </div>
                <h2 className="text-black mb-4">Exclusive Brand Partnerships</h2>
                <p className="text-gray-600">
                  We partner with top brands to bring you exclusive collections and premium products
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="bg-white rounded-lg p-6 flex items-center justify-center border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="text-center">
                      <div className="text-2xl text-gray-400 mb-2">★★★</div>
                      <p className="text-xs text-gray-600">Brand Partner</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Local Sellers */}
            <div>
              <div className="text-center md:text-left mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-50 border border-sky-200 rounded-full mb-4">
                  <span className="text-sm text-sky-900">❤️ Community First</span>
                </div>
                <h2 className="text-black mb-4">Meet Our Local Sellers</h2>
                <p className="text-gray-600">
                  Talented artisans and makers from communities nationwide
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <ImageWithFallback
                      src={`https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&h=300&fit=crop&sig=${index}`}
                      alt={`Local Vendor ${index}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <Button
                  onClick={() => navigate('/marketplace/vendors/')}
                  className="bg-sky-600 hover:bg-sky-700 text-white rounded-lg"
                >
                  View All Local Sellers
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-black mb-4">Our Commitment</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We're committed to making wholesale accessible to everyone. Our team works tirelessly to provide the best platform for sellers to grow and buyers to discover. We're here to support you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-sky-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-black mb-4">Join Our Community</h2>
          <p className="text-gray-700 mb-8">
            Whether you're a brand looking to partner, a local seller wanting visibility, or a customer seeking quality — there's a place for you here
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/marketplace/sell/')}
              className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-lg"
            >
              Become a Seller
            </Button>
            <Button
              onClick={() => navigate('/marketplace/products/')}
              className="bg-white hover:bg-gray-50 text-black border-2 border-gray-300 px-8 py-3 rounded-lg"
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}