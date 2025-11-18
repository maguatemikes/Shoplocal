import { ArrowLeft, Star, DollarSign, MapPin, Phone, Globe, Clock, Mail, Send, User, Flag, CheckCircle, Shield, Package, ShoppingBag, Store } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Vendor, products } from '../lib/mockData';
import { ProductCard } from '../components/ProductCard';
import { LeafletMap } from '../components/LeafletMap';

interface VendorDetailProps {
  vendor: Vendor;
}

export function VendorDetail({ vendor }: VendorDetailProps) {
  const navigate = useNavigate();
  const [categoryIcon, setCategoryIcon] = useState<string | undefined>(undefined);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  console.log('🏪 VendorDetail - Vendor data:', {
    id: vendor.id,
    name: vendor.name,
    categoryId: vendor.categoryId,
    specialty: vendor.specialty,
    hasLatLng: !!(vendor.latitude && vendor.longitude)
  });

  // Fetch category icon from GeoDirectory API
  useEffect(() => {
    const fetchCategoryIcon = async () => {
      if (!vendor.categoryId) {
        return;
      }

      try {
        const response = await fetch(
          `https://shoplocal.kinsta.cloud/wp-json/geodir/v2/places/categories?per_page=100&hide_empty=false`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const categories = await response.json();
        
        // Find the matching category by ID
        const category = categories.find((cat: any) => cat.id === vendor.categoryId);
        
        // Check if category has an icon
        if (category?.icon?.src) {
          setCategoryIcon(category.icon.src);
        }
      } catch (error) {
        console.error('❌ Error fetching category icon:', error);
      }
    };

    fetchCategoryIcon();
  }, [vendor.categoryId]);

  // Check if this is a claimed listing (mock logic)
  const isClaimed = vendor.rating >= 4.5; // In real app, this would be a property

  // Get vendor products
  const vendorProducts = products.filter(p => p.vendorSlug === vendor.slug);

  // Mock data for demonstration
  const mockReviews = [
    {
      id: 1,
      author: 'Jennifer Thompson',
      date: '1 week ago',
      rating: 5,
      text: "Best clam chowder I've ever had! The clams were incredibly fresh and the portion sizes are generous. The staff was friendly and knowledgeable about their daily catches. Perfect spot for seafood lovers!"
    },
    {
      id: 2,
      author: 'Robert Wilson',
      date: '2 weeks ago',
      rating: 4,
      text: "Great local gem! The steamed clams were fantastic and the prices are very reasonable. Love that they have a seafood market too - picked up some fresh fish to take home. Will definitely be back!"
    },
    {
      id: 3,
      author: 'Maria Santos',
      date: '3 weeks ago',
      rating: 5,
      text: "Took the family here for dinner and everyone loved it! The crab cakes were amazing and the oysters were so fresh. Great casual atmosphere and the kids loved the fried clam strips. Highly recommend!"
    },
    {
      id: 4,
      author: 'David Johnson',
      date: '1 month ago',
      rating: 4,
      text: "Solid seafood spot in Berlin. The lobster roll was delicious and packed with meat. Service was quick and friendly. Good value for the quality of seafood you get."
    }
  ];

  const businessHours = [
    { day: 'Monday', hours: '11:00 AM - 9:00 PM' },
    { day: 'Tuesday', hours: '11:00 AM - 9:00 PM' },
    { day: 'Wednesday', hours: '11:00 AM - 9:00 PM' },
    { day: 'Thursday', hours: '11:00 AM - 9:00 PM' },
    { day: 'Friday', hours: '11:00 AM - 10:00 PM' },
    { day: 'Saturday', hours: '11:00 AM - 10:00 PM' },
    { day: 'Sunday', hours: '12:00 PM - 9:00 PM' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/vendors/')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Return to Directory</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-1 space-y-8">
            {/* Hero Image */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
              <div className="aspect-[21/9] relative">
                <ImageWithFallback
                  src={vendor.banner}
                  alt={vendor.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Business Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-6">
              {/* Title and Rating */}
              <div>
                <h1 className="text-3xl text-gray-900 mb-3">{vendor.name}</h1>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(vendor.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm">(89 reviews)</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm">$10–20</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 text-gray-900 text-xs rounded-lg">
                    {vendor.specialty}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-900 text-xs rounded-lg">
                    Local Business
                  </span>
                  {isClaimed ? (
                    <span className="px-3 py-1 bg-sky-100 text-sky-700 text-xs rounded-lg flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Verified Listing
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-lg">
                      Unclaimed Listing
                    </span>
                  )}
                </div>
              </div>

              <div className="h-px bg-gray-200" />

              {/* Contact Information */}
              <div>
                <h2 className="text-lg text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-0.5 shrink-0" />
                    <p className="text-gray-900">{vendor.location}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-500 shrink-0" />
                    <p className="text-gray-900">(856) 767-0401</p>
                  </div>
                  
                  {vendor.socialLinks?.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-gray-500 shrink-0" />
                      <a 
                        href={vendor.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-900 hover:text-sky-600 transition-colors"
                      >
                        {vendor.socialLinks.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="h-px bg-gray-200" />

              {/* Visit Vendor Store Button - Always visible */}
              <div>
                <button
                  onClick={() => navigate(`/vendor/${vendor.slug}/`)}
                  className="w-full px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                  <Store className="w-5 h-5" />
                  <span>Visit Vendor Store</span>
                </button>
              </div>

              {/* View Store Button - Prominent CTA */}
              {vendorProducts.length > 0 && (
                <>
                  <div className="h-px bg-gray-200" />
                  
                  <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-4 border border-sky-200">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-sky-600 rounded-lg flex items-center justify-center">
                          <ShoppingBag className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-900">Shop from this vendor</p>
                          <p className="text-xs text-gray-600">{vendorProducts.length} products available</p>
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(`/vendor/${vendor.slug}/`)}
                        className="px-4 py-2 bg-white hover:bg-gray-50 text-sky-600 border border-sky-300 rounded-lg transition-colors text-sm whitespace-nowrap shadow-sm hover:shadow-md"
                      >
                        Browse Products
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-gray-500" />
                <h2 className="text-lg text-gray-900">Hours</h2>
              </div>
              
              <div className="space-y-2">
                {businessHours.map((schedule) => (
                  <div key={schedule.day} className="flex items-center justify-between">
                    <span className="text-gray-900 capitalize">{schedule.day.toLowerCase()}</span>
                    <span className="text-gray-600">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">
                {vendor.bio}
              </p>
            </div>

            {/* Customer Reviews */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg text-gray-900 mb-6">Customer Reviews</h2>
              
              <div className="space-y-6">
                {mockReviews.map((review, index) => (
                  <div key={review.id}>
                    <div className="flex gap-4">
                      {/* Avatar */}
                      <div className="shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                      </div>
                      
                      {/* Review Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-gray-900">{review.author}</p>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        
                        <p className="text-gray-600 leading-relaxed">{review.text}</p>
                      </div>
                    </div>
                    
                    {index < mockReviews.length - 1 && (
                      <div className="h-px bg-gray-200 mt-6" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200" id="contact-form">
              <div className="flex items-center gap-2 mb-6">
                <Mail className="w-5 h-5 text-gray-900" />
                <h2 className="text-lg text-gray-900">Contact Business</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-900 mb-2">Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-100 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-600"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-900 mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-100 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-600"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-900 mb-2">Subject</label>
                  <input
                    type="text"
                    placeholder="What is this regarding?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-100 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-900 mb-2">Message</label>
                  <textarea
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-100 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-600 resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span className="text-sm">Send Message</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Sidebar - Map */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Map Card - Same height as hero image */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                {vendor.latitude && vendor.longitude ? (
                  <div className="aspect-[21/9] bg-gray-100 relative">
                    <LeafletMap
                      markers={[{
                        id: vendor.id,
                        name: vendor.name,
                        lat: parseFloat(vendor.latitude),
                        lng: parseFloat(vendor.longitude),
                        specialty: vendor.specialty,
                        categoryIcon: categoryIcon,
                        rating: vendor.rating,
                        location: vendor.location
                      }]}
                      onMarkerClick={() => {}}
                      onVendorSelect={() => {}}
                      selectedVendorId={null}
                    />
                  </div>
                ) : (
                  <div className="aspect-[21/9] bg-gray-100 relative flex items-center justify-center">
                    <div className="text-center p-8">
                      <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-gray-950 mb-2">No Location Data</h3>
                      <p className="text-sm text-gray-500">
                        Location coordinates not available for this business
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Claim Listing Card - Only show if unclaimed */}
              {!isClaimed && (
                <div className="bg-white border-2 border-sky-600 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sky-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Flag className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg text-gray-900 mb-2">Is this your business?</h3>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        Claim this listing to manage your business information, respond to reviews, and connect with customers.
                      </p>
                      
                      {/* Benefits */}
                      <div className="space-y-2 mb-4 bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-sky-600" />
                          <span>Get verified badge</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-sky-600" />
                          <span>Update business info</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-sky-600" />
                          <span>Respond to reviews</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-sky-600" />
                          <span>Add photos & promotions</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => navigate('/sell/')}
                        className="w-full px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                      >
                        <Shield className="w-5 h-5" />
                        Claim This Listing
                      </button>
                      <p className="text-xs text-gray-500 mt-3 text-center">
                        Already claimed? <button className="text-sky-600 hover:underline">Sign in</button>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Verified Business Info - Show if claimed */}
              {isClaimed && (
                <div className="bg-white border-2 border-sky-600 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sky-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg text-gray-900">Verified Business</h3>
                        <CheckCircle className="w-5 h-5 text-sky-600" />
                      </div>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        This business has been verified by ShopLocal. The information is accurate and regularly updated by the business owner.
                      </p>
                      
                      {/* Trust Indicators */}
                      <div className="space-y-2 mb-4 bg-sky-50 rounded-lg p-3 border border-sky-200">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-sky-600" />
                          <span>Owner verified</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-sky-600" />
                          <span>Information accurate</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-sky-600" />
                          <span>Regularly updated</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => document.querySelector('#contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                        className="w-full px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors text-sm"
                      >
                        Contact Business
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Products Section - Full Width Below */}
        {vendorProducts.length > 0 && (
          <div className="mt-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-100 to-blue-100 rounded-xl flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-sky-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl text-gray-900">Products from {vendor.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">{vendorProducts.length} {vendorProducts.length === 1 ? 'product' : 'products'} available</p>
                  </div>
                </div>
                
                {/* View Store Button */}
                <button
                  onClick={() => navigate(`/vendor/${vendor.slug}/`)}
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors flex items-center gap-2 shadow-sm hover:shadow-md"
                >
                  <Package className="w-4 h-4" />
                  <span className="text-sm">View Full Store</span>
                </button>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {vendorProducts.slice(0, 4).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewProduct={(slug) => navigate(`/product/${slug}/`)}
                    onViewVendor={(slug) => navigate(`/vendor/${slug}/`)}
                  />
                ))}
              </div>

              {/* View More Link */}
              {vendorProducts.length > 4 && (
                <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                  <button
                    onClick={() => navigate(`/vendor/${vendor.slug}/`)}
                    className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 transition-colors"
                  >
                    <span>View all {vendorProducts.length} products</span>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VendorDetail;