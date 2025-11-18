import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Store, MapPin, Phone, Mail, Globe, Facebook, Twitter, 
  DollarSign, Tag, Image as ImageIcon, FileText, Calendar,
  CheckCircle2, AlertCircle, Upload, X, Loader2, ChevronRight,
  Clock, Video, Award, Lock, Eye
} from 'lucide-react';
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
import { motion } from 'motion/react';
import { config, getAuthHeader, getApiUrl } from '../lib/config';

interface ListingFormData {
  claimed: string;
  title: string;
  content: string;
  post_tags: string;
  post_category: string;
  street: string;
  country: string;
  region: string;
  city: string;
  zip: string;
  latitude: string;
  longitude: string;
  mapview: string;
  post_images: string;
  phone: string;
  email: string;
  website: string;
  twitter: string;
  facebook: string;
  video: string;
  special_offers: string;
  business_hours: string;
  featured: string;
  slug: string;
  status: string;
  author: string;
  date: string;
  date_gmt: string;
  featured_media: string;
  meta: string;
  comment_status: string;
  ping_status: string;
  password: string;
}

export function CreateListing() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [categories, setCategories] = useState<Array<{ id: number; name: string; slug: string }>>([]);
  const [regions, setRegions] = useState<Array<{ id: number; name: string; slug: string }>>([]);
  const [cities, setCities] = useState<Array<{ id: number; name: string; slug: string }>>([]);
  
  // Form data state
  const [formData, setFormData] = useState<ListingFormData>({
    claimed: '',
    title: '',
    content: '',
    post_tags: '',
    post_category: '',
    street: '',
    country: 'United States',
    region: '',
    city: '',
    zip: '',
    latitude: '',
    longitude: '',
    mapview: '',
    post_images: '',
    phone: '',
    email: '',
    website: '',
    twitter: '',
    facebook: '',
    video: '',
    special_offers: '',
    business_hours: '',
    featured: '',
    slug: '',
    status: 'publish',
    author: '',
    date: '',
    date_gmt: '',
    featured_media: '',
    meta: '',
    comment_status: 'open',
    ping_status: 'open',
    password: ''
  });

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${getApiUrl('geodir')}/places/categories?per_page=100&hide_empty=false`,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          setCategories(data.filter((cat: any) => cat.name && cat.name !== ''));
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchRegions = async () => {
      try {
        const response = await fetch(
          `${getApiUrl('geodir')}/places/regions`,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          setRegions(data.filter((region: any) => region.name && region.name !== ''));
        }
      } catch (error) {
        console.error('Error fetching regions:', error);
      }
    };

    fetchCategories();
    fetchRegions();
  }, []);

  // Fetch cities when region changes
  useEffect(() => {
    if (formData.region) {
      const fetchCities = async () => {
        try {
          const response = await fetch(
            `${getApiUrl('geodir')}/places/cities`,
            {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            }
          );
          
          if (response.ok) {
            const data = await response.json();
            setCities(data.filter((city: any) => city.name && city.name !== ''));
          }
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      };

      fetchCities();
    }
  }, [formData.region]);

  const handleInputChange = (field: keyof ListingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Get authentication header from config utility
      const authHeader = getAuthHeader();
      
      const url = `${getApiUrl('geodir')}/places`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'Authorization': authHeader
        },
        body: new URLSearchParams(formData as any)
      };

      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        // Redirect to vendor directory or the new listing after 2 seconds
        setTimeout(() => {
          navigate('/vendors/');
        }, 2000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.message || 'Failed to create listing. Please try again.');
      }
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error.message || 'An error occurred while creating the listing.');
      console.error('Error creating listing:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: 'Basic Info', icon: Store },
    { number: 2, title: 'Location', icon: MapPin },
    { number: 3, title: 'Contact & Social', icon: Phone },
    { number: 4, title: 'Additional Details', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl text-white mb-4">
              Create New Listing
            </h1>
            <p className="text-xl text-gray-300">
              Add your business or service to ShopLocal marketplace
            </p>
          </motion.div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        isCompleted
                          ? 'bg-green-600 text-white'
                          : isActive
                          ? 'bg-sky-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="hidden md:block">
                      <p className={`text-sm ${isActive ? 'text-sky-600' : 'text-gray-600'}`}>
                        Step {step.number}
                      </p>
                      <p className={`font-medium ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-1 bg-gray-200 mx-4">
                      <div
                        className={`h-full transition-all duration-300 ${
                          isCompleted ? 'bg-green-600 w-full' : 'bg-gray-200 w-0'
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl border border-gray-200 p-8"
                >
                  <h2 className="text-2xl text-gray-900 mb-6">Basic Information</h2>
                  
                  <div className="space-y-6">
                    {/* Title */}
                    <div>
                      <Label htmlFor="title" className="text-gray-900">
                        Business/Listing Title <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Enter your business name"
                        className="mt-2"
                        required
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <Label htmlFor="category" className="text-gray-900">
                        Category <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.post_category}
                        onValueChange={(value) => handleInputChange('post_category', value)}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id.toString()}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Description */}
                    <div>
                      <Label htmlFor="content" className="text-gray-900">
                        Description <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => handleInputChange('content', e.target.value)}
                        placeholder="Describe your business, products, or services..."
                        className="mt-2 min-h-[150px]"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        Provide a detailed description to help customers understand what you offer
                      </p>
                    </div>

                    {/* Tags */}
                    <div>
                      <Label htmlFor="tags" className="text-gray-900">
                        Tags
                      </Label>
                      <Input
                        id="tags"
                        value={formData.post_tags}
                        onChange={(e) => handleInputChange('post_tags', e.target.value)}
                        placeholder="e.g., retail, clothing, shoes (comma-separated)"
                        className="mt-2"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        Add tags to help customers find your listing
                      </p>
                    </div>

                    {/* Slug */}
                    <div>
                      <Label htmlFor="slug" className="text-gray-900">
                        URL Slug (Optional)
                      </Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => handleInputChange('slug', e.target.value)}
                        placeholder="my-business-name"
                        className="mt-2"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        Leave empty to auto-generate from title
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Location Information */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl border border-gray-200 p-8"
                >
                  <h2 className="text-2xl text-gray-900 mb-6">Location Details</h2>
                  
                  <div className="space-y-6">
                    {/* Street Address */}
                    <div>
                      <Label htmlFor="street" className="text-gray-900">
                        Street Address
                      </Label>
                      <Input
                        id="street"
                        value={formData.street}
                        onChange={(e) => handleInputChange('street', e.target.value)}
                        placeholder="123 Main Street"
                        className="mt-2"
                      />
                    </div>

                    {/* City, Region, Zip */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Region */}
                      <div>
                        <Label htmlFor="region" className="text-gray-900">
                          State/Region <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.region}
                          onValueChange={(value) => handleInputChange('region', value)}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px]">
                            {regions.map((region) => (
                              <SelectItem key={region.id} value={region.name}>
                                {region.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* City */}
                      <div>
                        <Label htmlFor="city" className="text-gray-900">
                          City <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.city}
                          onValueChange={(value) => handleInputChange('city', value)}
                          disabled={!formData.region}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px]">
                            {cities.map((city) => (
                              <SelectItem key={city.id} value={city.name}>
                                {city.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Zip */}
                      <div>
                        <Label htmlFor="zip" className="text-gray-900">
                          ZIP Code
                        </Label>
                        <Input
                          id="zip"
                          value={formData.zip}
                          onChange={(e) => handleInputChange('zip', e.target.value)}
                          placeholder="12345"
                          className="mt-2"
                        />
                      </div>
                    </div>

                    {/* Country */}
                    <div>
                      <Label htmlFor="country" className="text-gray-900">
                        Country
                      </Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className="mt-2"
                        disabled
                      />
                    </div>

                    {/* Coordinates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="latitude" className="text-gray-900">
                          Latitude (Optional)
                        </Label>
                        <Input
                          id="latitude"
                          value={formData.latitude}
                          onChange={(e) => handleInputChange('latitude', e.target.value)}
                          placeholder="40.012976"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="longitude" className="text-gray-900">
                          Longitude (Optional)
                        </Label>
                        <Input
                          id="longitude"
                          value={formData.longitude}
                          onChange={(e) => handleInputChange('longitude', e.target.value)}
                          placeholder="-75.048402"
                          className="mt-2"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      Leave coordinates empty to auto-geocode from address
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Contact & Social */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl border border-gray-200 p-8"
                >
                  <h2 className="text-2xl text-gray-900 mb-6">Contact & Social Media</h2>
                  
                  <div className="space-y-6">
                    {/* Phone */}
                    <div>
                      <Label htmlFor="phone" className="text-gray-900 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(123) 456-7890"
                        className="mt-2"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="email" className="text-gray-900 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="contact@business.com"
                        className="mt-2"
                      />
                    </div>

                    {/* Website */}
                    <div>
                      <Label htmlFor="website" className="text-gray-900 flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Website URL
                      </Label>
                      <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        placeholder="https://www.yourbusiness.com"
                        className="mt-2"
                      />
                    </div>

                    {/* Social Media */}
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-lg text-gray-900 mb-4">Social Media</h3>
                      
                      {/* Facebook */}
                      <div className="mb-4">
                        <Label htmlFor="facebook" className="text-gray-900 flex items-center gap-2">
                          <Facebook className="w-4 h-4" />
                          Facebook
                        </Label>
                        <Input
                          id="facebook"
                          value={formData.facebook}
                          onChange={(e) => handleInputChange('facebook', e.target.value)}
                          placeholder="https://facebook.com/yourbusiness"
                          className="mt-2"
                        />
                      </div>

                      {/* Twitter */}
                      <div>
                        <Label htmlFor="twitter" className="text-gray-900 flex items-center gap-2">
                          <Twitter className="w-4 h-4" />
                          Twitter/X
                        </Label>
                        <Input
                          id="twitter"
                          value={formData.twitter}
                          onChange={(e) => handleInputChange('twitter', e.target.value)}
                          placeholder="https://twitter.com/yourbusiness"
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Additional Details */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl border border-gray-200 p-8"
                >
                  <h2 className="text-2xl text-gray-900 mb-6">Additional Details</h2>
                  
                  <div className="space-y-6">
                    {/* Business Hours */}
                    <div>
                      <Label htmlFor="business_hours" className="text-gray-900 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Business Hours
                      </Label>
                      <Textarea
                        id="business_hours"
                        value={formData.business_hours}
                        onChange={(e) => handleInputChange('business_hours', e.target.value)}
                        placeholder="Mon-Fri: 9AM-5PM, Sat-Sun: Closed"
                        className="mt-2"
                        rows={3}
                      />
                    </div>

                    {/* Special Offers */}
                    <div>
                      <Label htmlFor="special_offers" className="text-gray-900 flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Special Offers
                      </Label>
                      <Textarea
                        id="special_offers"
                        value={formData.special_offers}
                        onChange={(e) => handleInputChange('special_offers', e.target.value)}
                        placeholder="Describe any special offers, promotions, or deals..."
                        className="mt-2"
                        rows={3}
                      />
                    </div>

                    {/* Video URL */}
                    <div>
                      <Label htmlFor="video" className="text-gray-900 flex items-center gap-2">
                        <Video className="w-4 h-4" />
                        Video URL (YouTube, Vimeo, etc.)
                      </Label>
                      <Input
                        id="video"
                        value={formData.video}
                        onChange={(e) => handleInputChange('video', e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="mt-2"
                      />
                    </div>

                    {/* Featured Listing */}
                    <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                      <Checkbox
                        id="featured"
                        checked={formData.featured === '1'}
                        onCheckedChange={(checked) => 
                          handleInputChange('featured', checked ? '1' : '')
                        }
                      />
                      <div className="flex-1">
                        <Label htmlFor="featured" className="text-gray-900 cursor-pointer">
                          Featured Listing
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">
                          Mark this listing as featured to increase visibility
                        </p>
                      </div>
                    </div>

                    {/* Image Upload Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <ImageIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="text-gray-900 mb-1">Images</h4>
                          <p className="text-sm text-gray-600">
                            After creating your listing, you can upload images through the listing management dashboard
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between gap-4">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6"
                  >
                    Previous
                  </Button>
                )}
                
                {currentStep < 4 ? (
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="ml-auto px-6 bg-sky-600 hover:bg-sky-700"
                  >
                    Next Step
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.title || !formData.content}
                    className="ml-auto px-8 bg-sky-600 hover:bg-sky-700"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Listing...
                      </>
                    ) : (
                      <>
                        Create Listing
                        <CheckCircle2 className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                {/* Preview Card */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Preview
                  </h3>
                  <div className="space-y-3">
                    {formData.title && (
                      <div>
                        <p className="text-sm text-gray-500">Title</p>
                        <p className="text-gray-900">{formData.title}</p>
                      </div>
                    )}
                    {formData.post_category && (
                      <div>
                        <p className="text-sm text-gray-500">Category</p>
                        <p className="text-gray-900">
                          {categories.find(c => c.id.toString() === formData.post_category)?.name || formData.post_category}
                        </p>
                      </div>
                    )}
                    {(formData.city || formData.region) && (
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="text-gray-900">
                          {[formData.city, formData.region].filter(Boolean).join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tips Card */}
                <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl border border-sky-200 p-6">
                  <h3 className="text-lg text-gray-900 mb-4">Tips for Success</h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 mt-0.5 flex-shrink-0" />
                      <span>Use a clear, descriptive title</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 mt-0.5 flex-shrink-0" />
                      <span>Provide detailed descriptions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 mt-0.5 flex-shrink-0" />
                      <span>Add accurate contact information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 mt-0.5 flex-shrink-0" />
                      <span>Include your business hours</span>
                    </li>
                  </ul>
                </div>

                {/* Auth Notice */}
                <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="text-gray-900 mb-2">Authentication Required</h4>
                      <p className="text-sm text-gray-600">
                        Make sure you're logged in with a verified Dokan vendor account before submitting
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 z-50"
          >
            <CheckCircle2 className="w-6 h-6" />
            <div>
              <p className="font-medium">Listing Created Successfully!</p>
              <p className="text-sm text-green-100">Redirecting to vendors directory...</p>
            </div>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 right-8 bg-red-600 text-white px-6 py-4 rounded-xl shadow-lg flex items-start gap-3 z-50 max-w-md"
          >
            <AlertCircle className="w-6 h-6 flex-shrink-0" />
            <div>
              <p className="font-medium">Error Creating Listing</p>
              <p className="text-sm text-red-100">{errorMessage}</p>
            </div>
            <button
              onClick={() => setSubmitStatus('idle')}
              className="ml-auto text-white hover:text-red-100"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}