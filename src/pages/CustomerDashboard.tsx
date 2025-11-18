import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, MapPin, User, Heart, Settings, LogOut, ChevronRight, Download, Eye } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { products } from '../lib/mockData';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function CustomerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');

  // Mock data
  const orders = [
    {
      id: 'ORD-001',
      date: '2025-10-20',
      status: 'delivered',
      total: 156.99,
      items: [products[0], products[1]],
    },
    {
      id: 'ORD-002',
      date: '2025-10-18',
      status: 'shipped',
      total: 89.99,
      items: [products[2]],
    },
    {
      id: 'ORD-003',
      date: '2025-10-15',
      status: 'processing',
      total: 234.50,
      items: [products[3], products[4]],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl text-gray-900">My Account</h1>
          <p className="text-gray-600 mt-2">Manage your orders and account settings</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-900">John Doe</p>
                  <p className="text-sm text-gray-600">john@example.com</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => navigate('/marketplace/orders/')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors hover:bg-gray-50 text-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5" />
                    <span>Orders</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate('/marketplace/wishlist/')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors hover:bg-gray-50 text-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5" />
                    <span>Wishlist</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate('/marketplace/profile/')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors hover:bg-gray-50 text-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5" />
                    <span>Account Settings</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors">
                  <div className="flex items-center gap-3">
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </div>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl text-gray-900">Your Orders</h2>
                  <Button variant="outline" className="rounded-lg">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>

                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-2xl p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg text-gray-900">Order {order.id}</h3>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">Placed on {order.date}</p>
                      </div>
                      <p className="text-lg text-gray-900">${order.total.toFixed(2)}</p>
                    </div>

                    <div className="space-y-3 mb-4">
                      {order.items.map((product, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                            <ImageWithFallback
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-600">${product.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <Button variant="outline" className="flex-1 rounded-lg">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      {order.status === 'shipped' && (
                        <Button
                          onClick={() => navigate('/marketplace/track-order/')}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-lg"
                        >
                          Track Order
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h2 className="text-2xl text-gray-900 mb-6">Wishlist</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.slice(0, 6).map((product) => (
                    <div key={product.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                      <div className="aspect-square bg-gray-100">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-gray-900 mb-2">{product.name}</h3>
                        <p className="text-lg text-gray-900 mb-4">${product.price}</p>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg">
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl text-gray-900">Saved Addresses</h2>
                  <Button className="bg-blue-600 hover:bg-blue-700 rounded-lg">
                    Add New Address
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 border-2 border-blue-600">
                    <div className="flex items-start justify-between mb-4">
                      <Badge>Default</Badge>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                    <p className="text-gray-900 mb-1">John Doe</p>
                    <p className="text-gray-600 text-sm">123 Main Street</p>
                    <p className="text-gray-600 text-sm">San Francisco, CA 94102</p>
                    <p className="text-gray-600 text-sm">United States</p>
                    <p className="text-gray-600 text-sm mt-2">(555) 123-4567</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div></div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                    <p className="text-gray-900 mb-1">John Doe</p>
                    <p className="text-gray-600 text-sm">456 Oak Avenue</p>
                    <p className="text-gray-600 text-sm">Los Angeles, CA 90001</p>
                    <p className="text-gray-600 text-sm">United States</p>
                    <p className="text-gray-600 text-sm mt-2">(555) 987-6543</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h2 className="text-2xl text-gray-900 mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="john@example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue="(555) 123-4567"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 rounded-lg">
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}