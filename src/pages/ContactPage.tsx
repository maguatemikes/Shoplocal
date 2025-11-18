import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function ContactPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageCircle className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-5xl mb-6">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Have questions? We're here to help
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-lg text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm mb-3">We'll respond within 24 hours</p>
              <a href="mailto:support@shoplocal.com" className="text-blue-600 hover:text-blue-700">
                support@shoplocal.com
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-lg text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 text-sm mb-3">Mon-Fri, 9AM-6PM EST</p>
              <a href="tel:1-800-555-0123" className="text-blue-600 hover:text-blue-700">
                1-800-555-0123
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-lg text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 text-sm mb-3">Available 24/7</p>
              <button className="text-blue-600 hover:text-blue-700">
                Start Chat
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-lg text-gray-900 mb-2">Help Center</h3>
              <p className="text-gray-600 text-sm mb-3">Browse FAQs & guides</p>
              <button
                onClick={() => navigate('/marketplace/help/')}
                className="text-blue-600 hover:text-blue-700"
              >
                Visit Help Center
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl text-gray-900 mb-4">Send us a message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" className="mt-2 rounded-lg" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" className="mt-2 rounded-lg" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="mt-2 rounded-lg" />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input id="phone" type="tel" placeholder="(555) 123-4567" className="mt-2 rounded-lg" />
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger className="mt-2 rounded-lg">
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="order">Order Support</SelectItem>
                      <SelectItem value="seller">Seller Inquiry</SelectItem>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="payment">Payment Question</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us how we can help..."
                    className="mt-2 rounded-lg min-h-[150px]"
                  />
                </div>

                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl">
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Info & Map */}
            <div className="space-y-8">
              {/* Office Info */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <h3 className="text-xl text-gray-900 mb-6">Office Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-900 mb-1">Address</p>
                      <p className="text-gray-600">123 Market Street<br />San Francisco, CA 94103<br />United States</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-900 mb-1">Business Hours</p>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM EST<br />Saturday - Sunday: Closed</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-900 mb-1">Phone</p>
                      <p className="text-gray-600">Main: 1-800-555-0123<br />Fax: 1-800-555-0124</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-900 mb-1">Email</p>
                      <p className="text-gray-600">General: support@shoplocal.com<br />Sales: sales@shoplocal.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1553775282-20af80779df7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHNlcnZpY2UlMjBjb250YWN0fGVufDF8fHx8MTc2MTExNjk1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Customer service"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl text-gray-900 mb-8 text-center">Looking for something else?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => navigate('/marketplace/faq/')}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-600 transition-colors text-left"
            >
              <HelpCircle className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="text-lg text-gray-900 mb-2">FAQs</h3>
              <p className="text-gray-600 text-sm">Find quick answers to common questions</p>
            </button>

            <button
              onClick={() => navigate('/marketplace/sell/')}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-600 transition-colors text-left"
            >
              <Package className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="text-lg text-gray-900 mb-2">Become a Seller</h3>
              <p className="text-gray-600 text-sm">Join our marketplace and start selling</p>
            </button>

            <button
              onClick={() => navigate('/marketplace/help/')}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-600 transition-colors text-left"
            >
              <MessageCircle className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="text-lg text-gray-900 mb-2">Help Center</h3>
              <p className="text-gray-600 text-sm">Browse guides and documentation</p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}