import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Building2, CheckCircle, Upload, ArrowRight, MapPin, Phone, Globe, AlertCircle, FileText, Shield } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { motion } from 'motion/react';

export function ClaimListing() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'search' | 'verify' | 'link' | 'confirm'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedListing, setSelectedListing] = useState<any>(null);

  // Mock search results
  const searchResults = [
    {
      id: 1,
      name: 'Fleet Feet Sports',
      address: '123 Main Street, Boston, MA 02101',
      category: 'Athletic Retail',
      verified: false,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Marathon Sports',
      address: '456 Boylston Street, Boston, MA 02116',
      category: 'Running Store',
      verified: false,
      image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=200&h=200&fit=crop'
    }
  ];

  const handleSelectListing = (listing: any) => {
    setSelectedListing(listing);
    setCurrentStep('verify');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-sky-600 to-sky-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-4">
            <Shield className="w-4 h-4" />
            <span className="text-sm">Claim & Verify Your Business</span>
          </div>
          <h1 className="text-white text-4xl mb-4">Claim Your Business Listing</h1>
          <p className="text-xl text-sky-100">
            Get verified as an authorized retailer and reach more customers on WFE
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            {[
              { step: 'search', label: 'Search Business', icon: Search },
              { step: 'verify', label: 'Verify Ownership', icon: CheckCircle },
              { step: 'link', label: 'Link Accounts', icon: Building2 },
              { step: 'confirm', label: 'Confirmation', icon: Shield }
            ].map((item, index) => {
              const Icon = item.icon;
              const isActive = currentStep === item.step;
              const isCompleted = ['search', 'verify', 'link'].indexOf(currentStep) > ['search', 'verify', 'link'].indexOf(item.step as any);
              
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

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentStep === 'search' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                <h2 className="text-2xl text-gray-900 mb-4">Find Your Business</h2>
                <p className="text-gray-600 mb-6">
                  Search for your business listing to get started. If you don't find it, you can create a new listing.
                </p>

                {/* Search Box */}
                <div className="relative mb-8">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by business name or address..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-sky-500"
                  />
                </div>

                {/* Search Results */}
                {searchQuery && (
                  <div className="space-y-4 mb-6">
                    <h3 className="text-sm text-gray-600">Search Results ({searchResults.length})</h3>
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
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Create New */}
                <div className="border-t border-gray-200 pt-6">
                  <p className="text-gray-600 mb-4">Can't find your business?</p>
                  <button
                    onClick={() => navigate('/marketplace/sell/')}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg transition-colors"
                  >
                    Create a New Listing
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 'verify' && selectedListing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                <h2 className="text-2xl text-gray-900 mb-4">Verify Business Ownership</h2>
                <p className="text-gray-600 mb-6">
                  To claim this listing, please verify that you are authorized to represent this business.
                </p>

                {/* Selected Business */}
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

                {/* Verification Form */}
                <div className="space-y-6">
                  <div>
                    <Label>Your Full Name *</Label>
                    <Input placeholder="John Smith" className="mt-2" />
                  </div>

                  <div>
                    <Label>Business Phone Number *</Label>
                    <Input placeholder="(617) 555-0123" className="mt-2" />
                  </div>

                  <div>
                    <Label>Business Email *</Label>
                    <Input type="email" placeholder="owner@business.com" className="mt-2" />
                  </div>

                  <div>
                    <Label>Your Role/Title *</Label>
                    <Input placeholder="Owner, Manager, etc." className="mt-2" />
                  </div>

                  <div>
                    <Label>Authorized Brand Partnerships (Optional)</Label>
                    <Input placeholder="e.g., Nike, New Balance, Apple" className="mt-2" />
                    <p className="text-sm text-gray-500 mt-1">
                      List brands you're authorized to sell. We'll verify these separately.
                    </p>
                  </div>

                  <div>
                    <Label>Proof of Authorization *</Label>
                    <p className="text-sm text-gray-600 mb-3">
                      Upload documentation proving your authorization (business license, partnership agreement, etc.)
                    </p>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-sky-500 transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500">PDF, JPG, PNG (Max 10MB)</p>
                    </div>
                  </div>

                  <div>
                    <Label>Additional Notes (Optional)</Label>
                    <Textarea 
                      placeholder="Any additional information to support your claim..."
                      className="mt-2"
                      rows={4}
                    />
                  </div>
                </div>

                {/* Alert */}
                <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl mt-6">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <p className="mb-1">We'll review your submission within 3-5 business days.</p>
                    <p>You'll receive an email notification once your listing is verified.</p>
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
                    onClick={() => setCurrentStep('link')}
                    className="flex-1 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    Continue to Account Linking
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 'link' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                <h2 className="text-2xl text-gray-900 mb-4">Link Vendor Account (Optional)</h2>
                <p className="text-gray-600 mb-6">
                  Connect your GeoDirectory business listing with a Dokan vendor account to sell products online.
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
                      Show up in local searches and product listings
                    </p>
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-4 mb-8">
                  <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-sky-500 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-sky-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gray-900 mb-1">Link Existing Vendor Account</h4>
                        <p className="text-sm text-gray-600">
                          Already selling on WFE? Connect your existing Dokan store
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-sky-500 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gray-900 mb-1">Create New Vendor Account</h4>
                        <p className="text-sm text-gray-600">
                          Start selling online and link it to this listing
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gray-900 mb-1">Skip for Now</h4>
                        <p className="text-sm text-gray-600">
                          Just claim the listing, I'll add a store later
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
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
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

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

                <h2 className="text-3xl text-gray-900 mb-4">Claim Submitted Successfully!</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  We've received your claim for <strong>{selectedListing?.name}</strong>. Our team will review your submission and verify your authorization within 3-5 business days.
                </p>

                {/* Next Steps */}
                <div className="bg-sky-50 border border-sky-200 rounded-xl p-6 mb-8 text-left max-w-2xl mx-auto">
                  <h3 className="text-lg text-gray-900 mb-4">What happens next?</h3>
                  <ol className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-sky-600 text-white rounded-full flex items-center justify-center text-xs">1</span>
                      <span>Our verification team reviews your submitted documentation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-sky-600 text-white rounded-full flex items-center justify-center text-xs">2</span>
                      <span>We verify your brand authorization partnerships (if applicable)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-sky-600 text-white rounded-full flex items-center justify-center text-xs">3</span>
                      <span>You'll receive an email confirmation with your verified badge</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-sky-600 text-white rounded-full flex items-center justify-center text-xs">4</span>
                      <span>Access your dashboard to manage your listing and start selling</span>
                    </li>
                  </ol>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate('/marketplace/')}
                    className="px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl transition-all"
                  >
                    Return to Homepage
                  </button>
                  <button
                    onClick={() => navigate('/marketplace/sell/')}
                    className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300 rounded-xl transition-all"
                  >
                    View Seller Resources
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ClaimListing;