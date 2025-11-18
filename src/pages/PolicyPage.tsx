import { FileText, Shield, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PolicyPageProps {
  type: 'terms' | 'privacy' | 'refund' | 'seller-agreement';
}

export function PolicyPage({ type }: PolicyPageProps) {
  const navigate = useNavigate();

  const policyContent = {
    terms: {
      icon: FileText,
      title: 'Terms & Conditions',
      lastUpdated: 'October 23, 2025',
      sections: [
        {
          heading: '1. Acceptance of Terms',
          content: 'By accessing and using the ShopLocal Marketplace, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our marketplace.'
        },
        {
          heading: '2. Use of the Marketplace',
          content: 'You may use our marketplace for lawful purposes only. You agree not to use the marketplace in any way that violates any applicable federal, state, local, or international law or regulation.'
        },
        {
          heading: '3. Account Registration',
          content: 'To access certain features of the marketplace, you may be required to register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.'
        },
        {
          heading: '4. Purchases and Payments',
          content: 'All purchases made through the marketplace are subject to product availability. Prices are subject to change without notice. Payment must be made at the time of purchase using one of our accepted payment methods.'
        },
        {
          heading: '5. Vendor Responsibilities',
          content: 'Vendors are responsible for the accuracy of product listings, fulfillment of orders, and compliance with all applicable laws. Vendors must maintain high standards of customer service and product quality.'
        },
        {
          heading: '6. Intellectual Property',
          content: 'The marketplace and its original content, features, and functionality are owned by ShopLocal and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.'
        },
        {
          heading: '7. Limitation of Liability',
          content: 'In no event shall ShopLocal, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the marketplace.'
        },
        {
          heading: '8. Dispute Resolution',
          content: 'Any disputes arising from the use of this marketplace shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.'
        }
      ]
    },
    privacy: {
      icon: Shield,
      title: 'Privacy Policy',
      lastUpdated: 'October 23, 2025',
      sections: [
        {
          heading: '1. Information We Collect',
          content: 'We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This includes your name, email address, shipping address, payment information, and communication preferences.'
        },
        {
          heading: '2. How We Use Your Information',
          content: 'We use the information we collect to process your orders, communicate with you, improve our services, prevent fraud, and comply with legal obligations. We may also use your information to send you marketing communications if you have opted in.'
        },
        {
          heading: '3. Information Sharing',
          content: 'We share your information with vendors to fulfill your orders, with payment processors to process transactions, and with service providers who assist us in operating the marketplace. We do not sell your personal information to third parties.'
        },
        {
          heading: '4. Cookies and Tracking',
          content: 'We use cookies and similar tracking technologies to track activity on our marketplace and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.'
        },
        {
          heading: '5. Data Security',
          content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.'
        },
        {
          heading: '6. Your Rights',
          content: 'You have the right to access, update, or delete your personal information. You can also object to processing of your data or request data portability. To exercise these rights, please contact us through our support channels.'
        },
        {
          heading: '7. Children\'s Privacy',
          content: 'Our marketplace is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.'
        },
        {
          heading: '8. Changes to This Policy',
          content: 'We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.'
        }
      ]
    },
    refund: {
      icon: RotateCcw,
      title: 'Refund & Return Policy',
      lastUpdated: 'October 23, 2025',
      sections: [
        {
          heading: '1. General Return Policy',
          content: 'Returns are handled individually by each vendor. Most vendors accept returns within 14-30 days of delivery. Please check the specific vendor\'s return policy on their store page before making a purchase.'
        },
        {
          heading: '2. Return Eligibility',
          content: 'To be eligible for a return, items must be unused, in their original packaging, and in the same condition as received. Custom or personalized items are typically final sale unless they arrive defective or damaged.'
        },
        {
          heading: '3. How to Initiate a Return',
          content: 'Contact the vendor directly through their store page or your order details to initiate a return. The vendor will provide instructions for returning the item and issue a return authorization if applicable.'
        },
        {
          heading: '4. Refund Processing',
          content: 'Once the vendor receives and inspects the returned item, they will process your refund. Refunds are typically issued to the original payment method within 5-10 business days of the vendor receiving the return.'
        },
        {
          heading: '5. Return Shipping Costs',
          content: 'Return shipping costs are the buyer\'s responsibility unless the item arrived damaged, defective, or incorrect. Some vendors may offer prepaid return labels at their discretion.'
        },
        {
          heading: '6. Damaged or Defective Items',
          content: 'If you receive a damaged or defective item, contact the vendor immediately with photos of the damage. The vendor will either send a replacement or issue a full refund including original shipping costs.'
        },
        {
          heading: '7. Wrong Item Received',
          content: 'If you receive the wrong item, contact the vendor immediately. The vendor is responsible for shipping the correct item and will provide a prepaid label for returning the incorrect item.'
        },
        {
          heading: '8. Marketplace Guarantee',
          content: 'If a vendor does not respond to your return request or refuses a valid return, contact our support team. We will mediate the dispute and ensure a fair resolution in accordance with our marketplace policies.'
        }
      ]
    },
    'seller-agreement': {
      icon: FileText,
      title: 'Seller Agreement',
      lastUpdated: 'October 23, 2025',
      sections: [
        {
          heading: '1. Seller Obligations',
          content: 'As a seller on our marketplace, you agree to provide accurate product descriptions, fulfill orders promptly, maintain high quality standards, and provide excellent customer service. You are responsible for the accuracy of all information you provide.'
        },
        {
          heading: '2. Commission and Fees',
          content: 'Sellers pay a 10% commission on each sale. This commission is automatically deducted from your payout. There are no setup fees, monthly fees, or listing fees. Additional fees may apply for premium features or services.'
        },
        {
          heading: '3. Payment Terms',
          content: 'Payments are processed weekly via PayPal or Stripe. Funds become available after orders are marked as delivered and the buyer review period has passed. We reserve the right to hold funds for quality assurance or dispute resolution.'
        },
        {
          heading: '4. Product Listings',
          content: 'You are responsible for creating accurate product listings with clear descriptions, appropriate pricing, and high-quality images. Products must comply with all applicable laws and regulations. Prohibited items include illegal goods, counterfeit items, and products that violate intellectual property rights.'
        },
        {
          heading: '5. Order Fulfillment',
          content: 'You must ship orders within the timeframe specified in your store settings (typically 3-7 business days). You are responsible for providing tracking information and ensuring products arrive safely. Delayed shipments may result in account penalties.'
        },
        {
          heading: '6. Returns and Refunds',
          content: 'You must establish clear return policies for your store. You are responsible for processing returns in accordance with your stated policy and marketplace guidelines. Unreasonable return policy rejections may result in account review.'
        },
        {
          heading: '7. Prohibited Conduct',
          content: 'Sellers may not engage in fraudulent activity, manipulate reviews, sell prohibited items, or violate buyer privacy. Violations may result in account suspension or termination without refund of outstanding balances.'
        },
        {
          heading: '8. Account Termination',
          content: 'We reserve the right to suspend or terminate seller accounts for violations of this agreement, poor performance metrics, or fraudulent activity. Upon termination, you will receive any outstanding balance owed after applicable fees and chargebacks.'
        }
      ]
    }
  };

  const policy = policyContent[type];
  const Icon = policy.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <button onClick={() => navigate('/marketplace/')} className="hover:text-black">
              Home
            </button>
            <span className="mx-2">→</span>
            <span className="text-black">{policy.title}</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Icon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-black">{policy.title}</h1>
              <p className="text-sm text-gray-600">Last updated: {policy.lastUpdated}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
            <div className="space-y-8">
              {policy.sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-black mb-3">{section.heading}</h2>
                  <p className="text-gray-700 leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Policies Sidebar */}
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-black mb-4">Related Policies</h3>
            <div className="space-y-2">
              {type !== 'terms' && (
                <button
                  onClick={() => navigate('/marketplace/terms/')}
                  className="block w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-gray-700 hover:text-green-600 transition-colors"
                >
                  Terms & Conditions
                </button>
              )}
              {type !== 'privacy' && (
                <button
                  onClick={() => navigate('/marketplace/privacy/')}
                  className="block w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-gray-700 hover:text-green-600 transition-colors"
                >
                  Privacy Policy
                </button>
              )}
              {type !== 'refund' && (
                <button
                  onClick={() => navigate('/marketplace/refund-policy/')}
                  className="block w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-gray-700 hover:text-green-600 transition-colors"
                >
                  Refund & Return Policy
                </button>
              )}
              {type !== 'seller-agreement' && (
                <button
                  onClick={() => navigate('/marketplace/seller-agreement/')}
                  className="block w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-gray-700 hover:text-green-600 transition-colors"
                >
                  Seller Agreement
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}