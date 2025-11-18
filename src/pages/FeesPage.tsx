import { DollarSign, TrendingUp, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

export function FeesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <DollarSign className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-5xl mb-6">Pricing & Fees</h1>
          <p className="text-xl text-blue-100">
            Transparent pricing with no hidden costs
          </p>
        </div>
      </section>

      {/* Commission Structure */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-gray-900 mb-4">Simple Commission-Based Model</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Pay only when you make a sale. No monthly fees, no listing fees, no surprises.
            </p>
          </div>

          {/* Main Pricing Card */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-12 border-2 border-blue-200">
              <div className="text-center mb-8">
                <div className="inline-flex items-baseline gap-2 mb-4">
                  <span className="text-7xl text-gray-900">10</span>
                  <span className="text-3xl text-gray-600">%</span>
                </div>
                <p className="text-xl text-gray-700">Commission on each sale</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg text-gray-900">What's Included</h3>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></span>
                      <span>Unlimited product listings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></span>
                      <span>Custom storefront</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></span>
                      <span>Order management tools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></span>
                      <span>Analytics dashboard</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg text-gray-900">No Hidden Fees</h3>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></span>
                      <span>$0 monthly subscription</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></span>
                      <span>$0 listing fees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></span>
                      <span>$0 setup costs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></span>
                      <span>$0 transaction fees</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <Button
                  onClick={() => navigate('/marketplace/sell/')}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-10"
                >
                  Start Selling Today
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Breakdown */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600">Simple calculation on every sale</p>
          </div>

          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl text-gray-900 mb-6">Example Calculation</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-600">Product Sale Price</span>
                <span className="text-xl text-gray-900">$100.00</span>
              </div>
              
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-600">Marketplace Commission (10%)</span>
                <span className="text-xl text-red-600">- $10.00</span>
              </div>
              
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-600">Payment Processing (~3%)</span>
                <span className="text-xl text-red-600">- $3.00</span>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg text-gray-900">Your Earnings</span>
                <span className="text-2xl text-green-600">$87.00</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-gray-600">
              <p className="mb-2">
                <strong>Note:</strong> Payment processing fees are standard industry rates (typically 2.9% + $0.30) and are required for secure transactions.
              </p>
              <p>
                You keep 87% of every sale while we handle payments, disputes, and platform maintenance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-gray-900 mb-4">Compare to Other Platforms</h2>
            <p className="text-gray-600">See how we stack up</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 text-gray-900">Feature</th>
                  <th className="text-center py-4 px-6 text-blue-600">ShopLocal</th>
                  <th className="text-center py-4 px-6 text-gray-600">Competitor A</th>
                  <th className="text-center py-4 px-6 text-gray-600">Competitor B</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6 text-gray-700">Monthly Fee</td>
                  <td className="py-4 px-6 text-center text-green-600">$0</td>
                  <td className="py-4 px-6 text-center text-gray-600">$39/mo</td>
                  <td className="py-4 px-6 text-center text-gray-600">$79/mo</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">Commission</td>
                  <td className="py-4 px-6 text-center text-blue-600">10%</td>
                  <td className="py-4 px-6 text-center text-gray-600">15%</td>
                  <td className="py-4 px-6 text-center text-gray-600">12%</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">Listing Fees</td>
                  <td className="py-4 px-6 text-center text-green-600">$0</td>
                  <td className="py-4 px-6 text-center text-gray-600">$0.20/item</td>
                  <td className="py-4 px-6 text-center text-gray-600">$0</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">Setup Cost</td>
                  <td className="py-4 px-6 text-center text-green-600">Free</td>
                  <td className="py-4 px-6 text-center text-gray-600">Free</td>
                  <td className="py-4 px-6 text-center text-gray-600">$299</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">Payout Frequency</td>
                  <td className="py-4 px-6 text-center text-blue-600">Weekly</td>
                  <td className="py-4 px-6 text-center text-gray-600">Bi-weekly</td>
                  <td className="py-4 px-6 text-center text-gray-600">Monthly</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-gray-900 mb-4">Why Sellers Love Our Pricing</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-3">Grow Risk-Free</h3>
              <p className="text-gray-600">
                No upfront costs means you can test products and scale at your own pace without financial pressure.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-3">Keep More Money</h3>
              <p className="text-gray-600">
                At just 10% commission, you keep significantly more than on other platforms while still getting full support.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-3">Transparent & Fair</h3>
              <p className="text-gray-600">
                What you see is what you pay. No hidden fees, surprise charges, or complex pricing tiers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl text-gray-900 mb-4">Ready to Start Selling?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of sellers who trust our fair pricing
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/marketplace/sell/')}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8"
            >
              Apply Now
            </Button>
            <Button
              onClick={() => navigate('/marketplace/contact/')}
              variant="outline"
              size="lg"
              className="rounded-xl px-8"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}