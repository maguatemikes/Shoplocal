import { Search, ShoppingCart, Store, CreditCard, Truck, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

export function HelpCenter() {
  const navigate = useNavigate();

  const categories = [
    { icon: ShoppingCart, title: 'Buyers', description: 'Shopping and orders' },
    { icon: Store, title: 'Sellers', description: 'Managing your store' },
    { icon: CreditCard, title: 'Payments', description: 'Payment methods' },
    { icon: Truck, title: 'Shipping', description: 'Delivery and returns' },
    { icon: HelpCircle, title: 'Policies', description: 'Terms and agreements' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-black mb-4">Help Center</h1>
          <p className="text-gray-600 text-lg mb-8">
            How can we help you today?
          </p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for answers..."
              className="pl-12 py-6 rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Category Tiles */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.title}
                  className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md hover:bg-white transition-all group"
                >
                  <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-sky-600 transition-colors">
                    <Icon className="w-6 h-6 text-sky-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-black mb-1">{category.title}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Buyers FAQ */}
          <div className="bg-white rounded-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <ShoppingCart className="w-6 h-6 text-sky-600 mr-3" />
              <h2 className="text-black">For Buyers</h2>
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value="buyer-1">
                <AccordionTrigger>How do I place an order?</AccordionTrigger>
                <AccordionContent>
                  Browse products, add items to your cart, and proceed to checkout. You can order from multiple vendors in a single transaction. After completing payment, each vendor will be notified to fulfill your order.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="buyer-2">
                <AccordionTrigger>Can I order from multiple vendors at once?</AccordionTrigger>
                <AccordionContent>
                  Yes! You can add products from different vendors to your cart and check out once. Each vendor will ship their items separately, and you'll receive tracking information for each shipment.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="buyer-3">
                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                  We accept all major credit cards, PayPal, and other secure payment methods. All transactions are encrypted and secure.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="buyer-4">
                <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                <AccordionContent>
                  Shipping times vary by vendor and location. Most vendors ship within 3-7 business days. Check each product page for specific shipping information from that vendor.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="buyer-5">
                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                <AccordionContent>
                  Return policies vary by vendor. Each vendor sets their own return policy, which you can find on their store page. Generally, most vendors accept returns within 14-30 days.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Sellers FAQ */}
          <div className="bg-white rounded-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <Store className="w-6 h-6 text-sky-600 mr-3" />
              <h2 className="text-black">For Sellers</h2>
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value="seller-1">
                <AccordionTrigger>How do I become a seller?</AccordionTrigger>
                <AccordionContent>
                  Click on "Become a Seller" and fill out the application form. Our team reviews applications within 3-5 business days. Once approved, you'll receive access to your vendor dashboard to set up your store.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="seller-2">
                <AccordionTrigger>What are the fees?</AccordionTrigger>
                <AccordionContent>
                  We charge a 10% commission on each sale. There are no setup fees, monthly fees, or listing fees. You only pay when you make a sale.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="seller-3">
                <AccordionTrigger>When do I get paid?</AccordionTrigger>
                <AccordionContent>
                  Payments are processed weekly via PayPal or Stripe. Once an order is marked as shipped and delivered, funds are available in your next payout cycle.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="seller-4">
                <AccordionTrigger>How do I manage orders?</AccordionTrigger>
                <AccordionContent>
                  Use your vendor dashboard to view incoming orders, update order status, add tracking information, and communicate with buyers. You'll receive email notifications for new orders.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="seller-5">
                <AccordionTrigger>Can I customize my store?</AccordionTrigger>
                <AccordionContent>
                  Yes! You can upload a custom banner, logo, write your store bio, set policies, and organize your products. Make your store unique to attract more buyers.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Orders & Shipping */}
          <div className="bg-white rounded-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <Truck className="w-6 h-6 text-sky-600 mr-3" />
              <h2 className="text-black">Orders & Shipping</h2>
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value="shipping-1">
                <AccordionTrigger>How can I track my order?</AccordionTrigger>
                <AccordionContent>
                  Once your order ships, you'll receive tracking information via email. You can also view tracking details in your account under "My Orders."
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping-2">
                <AccordionTrigger>What if my order is delayed?</AccordionTrigger>
                <AccordionContent>
                  If your order hasn't arrived within the estimated delivery time, first check the tracking information. If there's an issue, contact the vendor directly through their store page or reach out to our support team.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping-3">
                <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
                <AccordionContent>
                  International shipping availability varies by vendor. Check the product page or vendor's shipping policy for their international shipping options and rates.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-black mb-4">Still Need Help?</h2>
          <p className="text-gray-600 mb-8">
            Our support team is here to assist you
          </p>
          <Button
            onClick={() => navigate('/marketplace/contact/')}
            className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-lg"
          >
            Contact Support
            <HelpCircle className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-black mb-6 text-center">Popular Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <button
              onClick={() => navigate('/marketplace/terms/')}
              className="bg-white rounded-lg p-4 text-left hover:shadow-md transition-shadow"
            >
              <h4 className="text-black mb-1">Terms & Conditions</h4>
              <p className="text-sm text-gray-600">Marketplace terms of service</p>
            </button>
            <button
              onClick={() => navigate('/marketplace/privacy/')}
              className="bg-white rounded-lg p-4 text-left hover:shadow-md transition-shadow"
            >
              <h4 className="text-black mb-1">Privacy Policy</h4>
              <p className="text-sm text-gray-600">How we protect your data</p>
            </button>
            <button
              onClick={() => navigate('/marketplace/refund-policy/')}
              className="bg-white rounded-lg p-4 text-left hover:shadow-md transition-shadow"
            >
              <h4 className="text-black mb-1">Refund Policy</h4>
              <p className="text-sm text-gray-600">Returns and refunds</p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}