import { Check, Building2, FileText, CreditCard, Rocket, MapPin, Phone, Mail, Globe, Users, Package, TrendingUp, DollarSign, Shield, ChevronRight, Search, ExternalLink, AlertCircle, CheckCircle2, ArrowRight, Upload, Store, CheckCircle, Settings, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';

export function BecomeSeller() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'search' | 'verify' | 'setup' | 'confirm'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [isNewListing, setIsNewListing] = useState(false);

  // API state
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  
  // Ref to track the current axios cancel token
  const cancelTokenRef = useRef<any>(null);

  // Search businesses from API
  const searchBusinesses = useCallback(async (query: string) => {
    // Cancel previous request if it exists
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel('New search initiated');
    }

    if (!query || query.length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    // Create new cancel token
    cancelTokenRef.current = axios.CancelToken.source();

    try {
      const response = await axios.get(
        `https://shoplocal.kinsta.cloud/wp-json/geodir/v2/places`,
        {
          params: {
            search: query,
            per_page: 10
          },
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          timeout: 10000,
          cancelToken: cancelTokenRef.current.token,
        }
      );

      // Map API results to our format
      const businesses = response.data.map((place: any) => {
        const titleString = typeof place.title === 'string' ? place.title : place.title?.rendered || 'Business';
        const imageUrl = place.featured_image?.src || place.images?.[0]?.src || '';
        
        let address = '';
        if (place.street) address = place.street;
        if (place.city) address += (address ? ', ' : '') + place.city;
        if (place.region) address += (address ? ', ' : '') + place.region;
        if (place.zip) address += ' ' + place.zip;

        let category = 'General';
        if (place.post_category) {
          if (typeof place.post_category === 'string') {
            category = place.post_category;
          } else if (Array.isArray(place.post_category)) {
            category = place.post_category.map((cat: any) => cat.name).join(', ');
          } else if (typeof place.post_category === 'object') {
            category = place.post_category.name;
          }
        }

        return {
          id: place.id,
          name: titleString,
          address: address || 'Address not available',
          category: category,
          verified: place.claimed === 1,
          image: imageUrl || 'https://via.placeholder.com/200'
        };
      });

      setSearchResults(businesses);
    } catch (error) {
      if (axios.isCancel(error)) {
        // Request was cancelled, do nothing
        return;
      }
      console.error('Error searching businesses:', error);
      setSearchError('Unable to search businesses. Please try again.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      searchBusinesses(searchQuery);
    }, 600);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery, searchBusinesses]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cancelTokenRef.current) {
        cancelTokenRef.current.cancel('Component unmounted');
      }
    };
  }, []);

  const handleSelectListing = (listing: any) => {
    setSelectedListing(listing);
    setIsNewListing(false);
    setCurrentStep('verify');
  };

  const handleCreateNew = () => {
    setIsNewListing(true);
    setCurrentStep('verify');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-sky-600 to-sky-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <Shield className="w-4 h-4" />
            <span className="text-sm text-white">Join 250+ Authorized Local Sellers & Premium Brands</span>
          </div>
          <h1 className="text-white text-4xl sm:text-5xl mb-6">
            Become an Authorized Seller on ShopLocal
          </h1>
          <p className="text-xl mb-4 text-sky-50 max-w-3xl mx-auto">
            Get visibility alongside premium national brands and reach customers who value quality and community.
          </p>
          <p className="text-lg mb-8 text-sky-100 max-w-2xl mx-auto">
            Whether you sell products or offer services (restaurants, lawyers, doctors, wellness), we'll promote you as an authorized local seller.
          </p>
          
          {/* Dual Positioning Highlight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-10">
            <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl p-6 text-left">
              <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center mb-4">
                <Store className="w-6 h-6 text-green-300" />
              </div>
              <h3 className="text-xl text-white mb-2">Sell Brand-Name Products</h3>
              <p className="text-sky-100 text-sm">
                Authorized to sell premium brands? We'll verify and badge you, giving customers confidence and boosting your sales.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl p-6 text-left">
              <div className="w-12 h-12 bg-purple-400/20 rounded-xl flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-xl text-white mb-2">Offer Local Services</h3>
              <p className="text-sky-100 text-sm">
                Restaurants, professionals, wellness—get listed and promoted to local customers actively searching for quality services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            {[
              { step: 'search', label: 'Find or Create', icon: Search },
              { step: 'verify', label: 'Verify & Setup', icon: CheckCircle },
              { step: 'setup', label: 'Store Details', icon: Settings },
              { step: 'confirm', label: 'Launch', icon: Award }
            ].map((item, index) => {
              const Icon = item.icon;
              const isActive = currentStep === item.step;
              const isCompleted = ['search', 'verify', 'setup'].indexOf(currentStep) > ['search', 'verify', 'setup'].indexOf(item.step as any);
              
              return (
                <div key={item.step} className="flex-1 flex items-center">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCompleted ? 'bg-green-500 border-green-500 text-white' :
                      isActive ? 'bg-sky-600 border-sky-600 text-white' :
                      'bg-white border-gray-300 text-gray-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-xs mt-2 hidden md:block ${
                      isActive ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  {index < 3 && (
                    <div className={`h-0.5 flex-1 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* STEP 1: Search for Existing Business or Create New */}
          {currentStep === 'search' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 mb-8">
                <h2 className="text-3xl text-gray-900 mb-4">Step 1: Find Your Business</h2>
                <p className="text-gray-600 mb-6">
                  First, let's check if your business already exists on ShopLocal. If it does, you can claim it. If not, you'll create a new listing.
                </p>

                {/* Search Box */}
                <div className="relative mb-8">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by business name or address..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-sky-500 text-lg"
                  />
                </div>

                {/* Search Results */}
                {searchQuery && (
                  <div className="space-y-4 mb-6">
                    {isSearching && (
                      <div className="text-center py-8">
                        <div className="inline-block w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                        <p className="text-sm text-gray-600">Searching businesses...</p>
                      </div>
                    )}
                    
                    {!isSearching && searchError && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                        <AlertCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
                        <p className="text-sm text-red-800">{searchError}</p>
                      </div>
                    )}
                    
                    {!isSearching && !searchError && searchResults.length > 0 && (
                      <>
                        <h3 className="text-sm text-gray-600">Found {searchResults.length} matching businesses</h3>
                        {searchResults.map((listing) => (
                          <div
                            key={listing.id}
                            className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-sky-500 transition-colors cursor-pointer"
                            onClick={() => handleSelectListing(listing)}
                          >
                            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                              <ImageWithFallback
                                src={listing.image}
                                alt={listing.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-gray-900 mb-1">{listing.name}</h4>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span>{listing.address}</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">{listing.category}</div>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-sky-50 text-sky-700 rounded-full text-sm">
                              <CheckCircle className="w-4 h-4" />
                              Claim This
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                    
                    {!isSearching && !searchError && searchResults.length === 0 && (
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
                        <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 mb-2">No businesses found matching "{searchQuery}"</p>
                        <p className="text-sm text-gray-500">Try a different search or create a new listing below</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Create New Button */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-sky-200 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-sky-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg text-gray-900 mb-2">Don't see your business?</h4>
                        <p className="text-gray-600 mb-4">
                          No problem! You can create a new listing and we'll help you get set up as an authorized seller.
                        </p>
                        <button
                          onClick={handleCreateNew}
                          className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors inline-flex items-center gap-2"
                        >
                          Create New Listing
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <Users className="w-8 h-8 text-sky-600 mb-3" />
                  <h3 className="text-gray-900 mb-2">Premium Positioning</h3>
                  <p className="text-sm text-gray-600">
                    Showcase alongside exclusive brands and reach engaged customers
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <Shield className="w-8 h-8 text-sky-600 mb-3" />
                  <h3 className="text-gray-900 mb-2">Verified Badge</h3>
                  <p className="text-sm text-gray-600">
                    Get official verification for brand authorization and credibility
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <DollarSign className="w-8 h-8 text-sky-600 mb-3" />
                  <h3 className="text-gray-900 mb-2">Community Support</h3>
                  <p className="text-sm text-gray-600">
                    "Shop Local" badges drive community-focused customers to you
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Verify Ownership & Business Info */}
          {currentStep === 'verify' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                <h2 className="text-3xl text-gray-900 mb-4">
                  {isNewListing ? 'Step 2: Create Your Business Profile' : 'Step 2: Verify Business Ownership'}
                </h2>
                <p className="text-gray-600 mb-8">
                  {isNewListing 
                    ? 'Tell us about your business so we can create your listing and verify your authorization.'
                    : 'Verify that you are authorized to represent this business and manage its listing.'
                  }
                </p>

                {/* Selected Business (if claiming) */}
                {!isNewListing && selectedListing && (
                  <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={selectedListing.image}
                          alt={selectedListing.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-gray-900 mb-1">{selectedListing.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{selectedListing.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Form */}
                <div className="space-y-6">
                  {/* Business Name */}
                  <div>
                    <Label>Business Name *</Label>
                    <Input placeholder="e.g., Fleet Feet Sports Boston" className="mt-2" />
                  </div>

                  {/* Business Type */}
                  <div>
                    <Label>Business Type *</Label>
                    <select className="w-full mt-2 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-sky-500">
                      <option value="">Select type...</option>
                      <option value="retail">Retail Store (Products)</option>
                      <option value="restaurant">Restaurant / Food Service</option>
                      <option value="professional">Professional Services (Lawyer, Doctor, etc.)</option>
                      <option value="wellness">Wellness / Fitness</option>
                      <option value="other">Other Service</option>
                    </select>
                  </div>

                  {/* Address */}
                  <div>
                    <Label>Business Address *</Label>
                    <Input placeholder="123 Main Street" className="mt-2 mb-2" />
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="City" />
                      <Input placeholder="State" />
                    </div>
                    <Input placeholder="ZIP Code" className="mt-2" />
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Business Phone *</Label>
                      <Input placeholder="(617) 555-0123" className="mt-2" />
                    </div>
                    <div>
                      <Label>Business Email *</Label>
                      <Input type="email" placeholder="info@business.com" className="mt-2" />
                    </div>
                  </div>

                  {/* Website */}
                  <div>
                    <Label>Business Website (Optional)</Label>
                    <Input placeholder="https://www.yourbusiness.com" className="mt-2" />
                  </div>

                  {/* Your Role */}
                  <div>
                    <Label>Your Name & Role *</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <Input placeholder="Your Full Name" />
                      <Input placeholder="Your Title (Owner, Manager, etc.)" />
                    </div>
                  </div>

                  {/* Brand Partnerships */}
                  <div>
                    <Label>Authorized Brand Partnerships (Optional)</Label>
                    <Input 
                      placeholder="e.g., Nike, New Balance, Apple" 
                      className="mt-2" 
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      List brands you're authorized to sell. We'll verify these separately and add verified badges.
                    </p>
                  </div>

                  {/* Business Description */}
                  <div>
                    <Label>Business Description *</Label>
                    <Textarea 
                      placeholder="Tell customers about your business, what makes you special, and what you offer..."
                      className="mt-2"
                      rows={4}
                    />
                  </div>

                  {/* Proof Upload */}
                  <div>
                    <Label>Proof of Authorization *</Label>
                    <p className="text-sm text-gray-600 mb-3">
                      Upload documentation proving your authorization (business license, partnership agreement, utility bill, etc.)
                    </p>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-sky-500 transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500">PDF, JPG, PNG (Max 10MB)</p>
                    </div>
                  </div>
                </div>

                {/* Alert */}
                <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl mt-8">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <p className="mb-1">We'll review your submission within 3-5 business days.</p>
                    <p>You'll receive an email notification once your listing is verified and approved.</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setCurrentStep('search')}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep('setup')}
                    className="flex-1 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    Continue to Store Setup
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Online Store Setup (Optional) */}
          {currentStep === 'setup' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                <h2 className="text-3xl text-gray-900 mb-4">Step 3: Online Store Setup (Optional)</h2>
                <p className="text-gray-600 mb-8">
                  Want to sell online in addition to your local listing? Set up your vendor store.
                </p>

                {/* Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
                    <CheckCircle className="w-6 h-6 text-sky-600 mb-2" />
                    <h4 className="text-gray-900 mb-1">Unified Profile</h4>
                    <p className="text-sm text-gray-600">
                      Your local listing and online store in one place
                    </p>
                  </div>
                  <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
                    <CheckCircle className="w-6 h-6 text-sky-600 mb-2" />
                    <h4 className="text-gray-900 mb-1">Dual Visibility</h4>
                    <p className="text-sm text-gray-600">
                      Show up in local searches AND product listings
                    </p>
                  </div>
                  <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
                    <CheckCircle className="w-6 h-6 text-sky-600 mb-2" />
                    <h4 className="text-gray-900 mb-1">National Reach</h4>
                    <p className="text-sm text-gray-600">
                      Sell to customers nationwide, not just locally
                    </p>
                  </div>
                  <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
                    <CheckCircle className="w-6 h-6 text-sky-600 mb-2" />
                    <h4 className="text-gray-900 mb-1">Easy Management</h4>
                    <p className="text-sm text-gray-600">
                      One dashboard to manage listings and products
                    </p>
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-4 mb-8">
                  <div className="border-2 border-sky-500 bg-sky-50 rounded-xl p-6 cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-sky-600 rounded-xl flex items-center justify-center">
                        <Store className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gray-900 mb-1">✅ Yes, Set Up My Online Store</h4>
                        <p className="text-sm text-gray-600">
                          I want to sell products online in addition to my local presence
                        </p>
                      </div>
                    </div>
                    
                    {/* Store Setup Fields */}
                    <div className="mt-6 space-y-4 pl-16">
                      <div>
                        <Label>Store Name / URL Slug *</Label>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-gray-500">shoplocal.com/store/</span>
                          <Input placeholder="your-store-name" className="flex-1" />
                        </div>
                      </div>
                      
                      <div>
                        <Label>What will you sell? *</Label>
                        <Textarea 
                          placeholder="Describe your product categories (e.g., running shoes, athletic apparel, sports equipment)"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label>Estimated Number of Products</Label>
                        <select className="w-full mt-2 px-4 py-2 border-2 border-gray-300 rounded-lg">
                          <option>1-10 products</option>
                          <option>11-50 products</option>
                          <option>51-100 products</option>
                          <option>100+ products</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gray-900 mb-1">No Thanks, Local Listing Only</h4>
                        <p className="text-sm text-gray-600">
                          I only want a local business listing
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setCurrentStep('verify')}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep('confirm')}
                    className="flex-1 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    Complete Application
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Confirmation */}
          {currentStep === 'confirm' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>

                <h2 className="text-4xl text-gray-900 mb-4">Application Submitted! 🎉</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Your seller application has been submitted successfully. Our team will review your information and verify your authorization within 3-5 business days.
                </p>

                {/* What's Next */}
                <div className="bg-sky-50 border border-sky-200 rounded-xl p-6 mb-8 text-left max-w-2xl mx-auto">
                  <h3 className="text-lg text-gray-900 mb-4 text-center">What happens next?</h3>
                  <ol className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-sky-600 text-white rounded-full flex items-center justify-center text-xs">1</span>
                      <span>Our verification team reviews your business information and documentation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-sky-600 text-white rounded-full flex items-center justify-center text-xs">2</span>
                      <span>We verify your brand authorization partnerships (if applicable)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-sky-600 text-white rounded-full flex items-center justify-center text-xs">3</span>
                      <span>Your business listing goes live with verified badges</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-sky-600 text-white rounded-full flex items-center justify-center text-xs">4</span>
                      <span>You'll receive your dashboard login credentials via email</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-sky-600 text-white rounded-full flex items-center justify-center text-xs">5</span>
                      <span>Start managing your profile and (if applicable) uploading products</span>
                    </li>
                  </ol>
                </div>

                {/* Next Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <FileText className="w-8 h-8 text-sky-600 mx-auto mb-2" />
                    <h4 className="text-sm text-gray-900 mb-1">Check Your Email</h4>
                    <p className="text-xs text-gray-600">
                      We've sent a confirmation to your email
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <Award className="w-8 h-8 text-sky-600 mx-auto mb-2" />
                    <h4 className="text-sm text-gray-900 mb-1">Prepare Assets</h4>
                    <p className="text-xs text-gray-600">
                      Get your product photos and descriptions ready
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <Settings className="w-8 h-8 text-sky-600 mx-auto mb-2" />
                    <h4 className="text-sm text-gray-900 mb-1">Review Seller Guide</h4>
                    <p className="text-xs text-gray-600">
                      Learn best practices for success
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate('/create-listing/')}
                    className="px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Store className="w-5 h-5" />
                    Create Your First Listing
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300 rounded-xl transition-all"
                  >
                    Return to Homepage
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* FAQ Section (Visible on Step 1 only) */}
      {currentStep === 'search' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What types of businesses can join?</AccordionTrigger>
                <AccordionContent>
                  We welcome both product retailers and service providers. This includes authorized brand retailers, restaurants, professional services (lawyers, doctors), wellness providers, and more. As long as you're a legitimate local business or authorized seller, you're welcome to apply.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Do I need to be authorized by brands to join?</AccordionTrigger>
                <AccordionContent>
                  Not necessarily! While having brand authorization gives you verified badges and premium positioning, you can still join as a local business without specific brand partnerships. However, if you claim to sell certain brands, we will verify your authorization.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What's the difference between a local listing and online store?</AccordionTrigger>
                <AccordionContent>
                  A local listing shows your business location, hours, and contact info—great for local visibility. An online store lets you sell products nationwide through ecommerce. You can have both for maximum visibility!
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Are there any fees?</AccordionTrigger>
                <AccordionContent>
                  Local business listings are free. If you set up an online store, we charge a small commission on sales (typically 5-15% depending on your plan). No upfront costs or monthly fees. You only pay when you make sales.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>How long does verification take?</AccordionTrigger>
                <AccordionContent>
                  Typically 3-5 business days. We manually review each application to ensure quality and authenticity. Brand authorization verification may take slightly longer if we need to contact brand representatives.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      )}
    </div>
  );
}

export default BecomeSeller;