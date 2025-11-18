import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp, MessageCircle, Mail, Phone, HelpCircle, CreditCard } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

export function FAQ() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      title: 'For Buyers',
      icon: MessageCircle,
      questions: [
        {
          q: 'How do I place an order?',
          a: 'Simply browse our marketplace, add items to your cart, and proceed to checkout. You can purchase from multiple vendors in a single order.',
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. All transactions are securely processed.',
        },
        {
          q: 'Can I track my order?',
          a: 'Yes! Once your order ships, you\'ll receive a tracking number via email. You can also track orders from your account dashboard.',
        },
        {
          q: 'What is your return policy?',
          a: 'Returns are accepted within 30 days of delivery. Items must be unused and in original packaging. Each vendor may have specific return policies.',
        },
        {
          q: 'How long does shipping take?',
          a: 'Shipping times vary by vendor and shipping method selected. Standard shipping is typically 5-7 business days, while express is 2-3 business days.',
        },
      ],
    },
    {
      title: 'For Sellers',
      icon: Mail,
      questions: [
        {
          q: 'How do I become a seller?',
          a: 'Click on "Become a Seller" and fill out our application form. We review all applications within 3-5 business days and will notify you of approval.',
        },
        {
          q: 'What are the fees?',
          a: 'We charge a 10% commission on each sale. There are no monthly fees, listing fees, or upfront costs to join the marketplace.',
        },
        {
          q: 'When do I get paid?',
          a: 'Payouts are processed weekly, every Friday. Funds are typically available in your account within 2-3 business days after processing.',
        },
        {
          q: 'Can I customize my storefront?',
          a: 'Yes! You can customize your vendor page with your logo, banner image, description, and brand colors through your dashboard.',
        },
        {
          q: 'How do I manage inventory?',
          a: 'You can manage all your products, inventory levels, and pricing through your vendor dashboard. Real-time inventory syncing helps prevent overselling.',
        },
      ],
    },
    {
      title: 'Shipping & Delivery',
      icon: Phone,
      questions: [
        {
          q: 'Do you offer free shipping?',
          a: 'Free shipping is available on orders over $500. Standard and express shipping options are available for smaller orders.',
        },
        {
          q: 'Do you ship internationally?',
          a: 'Currently, we only ship within the United States. International shipping may be available from select vendors.',
        },
        {
          q: 'What happens if my package is lost?',
          a: 'All shipments are insured. If your package is lost, contact our support team and we\'ll file a claim and arrange for a replacement or refund.',
        },
        {
          q: 'Can I change my shipping address after ordering?',
          a: 'Contact the seller immediately through your order page. If the order hasn\'t shipped yet, they may be able to update the address.',
        },
      ],
    },
    {
      title: 'Payments & Refunds',
      icon: CreditCard,
      questions: [
        {
          q: 'Is my payment information secure?',
          a: 'Yes, all payment information is encrypted and processed through secure payment gateways. We never store your complete credit card information.',
        },
        {
          q: 'How do refunds work?',
          a: 'Refunds are processed back to your original payment method within 5-7 business days after the return is approved by the seller.',
        },
        {
          q: 'Can I cancel my order?',
          a: 'Orders can be cancelled before they ship. Contact the seller immediately through your order page to request cancellation.',
        },
        {
          q: 'What if I receive a damaged item?',
          a: 'Contact the seller within 48 hours of delivery with photos of the damage. They will arrange for a replacement or full refund.',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HelpCircle className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-5xl mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-blue-100 mb-8">
            Find answers to common questions about shopping and selling
          </p>

          {/* Search */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 rounded-xl bg-white text-gray-900"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div key={index}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl text-gray-900">{category.title}</h2>
                  </div>

                  <Accordion type="single" collapsible className="space-y-3">
                    {category.questions.map((faq, qIndex) => (
                      <AccordionItem
                        key={qIndex}
                        value={`${index}-${qIndex}`}
                        className="bg-gray-50 rounded-xl border border-gray-200 px-6"
                      >
                        <AccordionTrigger className="hover:no-underline py-5">
                          <span className="text-left text-gray-900">{faq.q}</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 pb-5">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl text-gray-900 mb-4">Still have questions?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Our support team is here to help
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/marketplace/contact/')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all"
            >
              Contact Support
            </button>
            <button
              onClick={() => navigate('/marketplace/help/')}
              className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300 rounded-xl transition-all"
            >
              Visit Help Center
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}