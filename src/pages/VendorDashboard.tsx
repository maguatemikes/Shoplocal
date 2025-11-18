import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, DollarSign, TrendingUp, Users, ChevronRight, Eye, Settings, Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { products } from '../lib/mockData';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function VendorDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = {
    totalSales: 45678.99,
    pendingOrders: 12,
    totalProducts: 48,
    thisMonth: 12345.67,
  };

  const recentOrders = [
    { id: 'ORD-101', customer: 'John Doe', items: 3, total: 245.99, status: 'pending' },
    { id: 'ORD-102', customer: 'Jane Smith', items: 1, total: 89.99, status: 'shipped' },
    { id: 'ORD-103', customer: 'Bob Johnson', items: 2, total: 156.50, status: 'delivered' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl text-gray-900">Vendor Dashboard</h1>
              <p className="text-gray-600">Green Earth Co.</p>
            </div>
            <Button
              onClick={() => navigate('/marketplace/')}
              variant="outline"
              className="rounded-lg"
            >
              View Store
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Total Sales</p>
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl text-gray-900">${stats.totalSales.toLocaleString()}</p>
            <p className="text-sm text-green-600 mt-1">+12.5% from last month</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Pending Orders</p>
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl text-gray-900">{stats.pendingOrders}</p>
            <p className="text-sm text-gray-600 mt-1">Needs fulfillment</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Total Products</p>
              <Package className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl text-gray-900">{stats.totalProducts}</p>
            <p className="text-sm text-gray-600 mt-1">Active listings</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">This Month</p>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl text-gray-900">${stats.thisMonth.toLocaleString()}</p>
            <p className="text-sm text-blue-600 mt-1">On track for goal</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Products
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Orders
            </TabsTrigger>
            <TabsTrigger
              value="payouts"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Payouts
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Content */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl text-gray-900">Recent Orders</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab('orders')}
                  className="rounded-lg"
                >
                  View All
                </Button>
              </div>

              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="text-gray-900 mb-1">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer} • {order.items} items</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900 mb-1">${order.total}</p>
                      <Badge className={
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' :
                        'bg-green-100 text-green-700 hover:bg-green-100'
                      }>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl text-gray-900 mb-6">Quick Actions</h2>
              
              <div className="space-y-3">
                <Button
                  className="w-full justify-start bg-blue-600 hover:bg-blue-700 rounded-xl"
                  size="lg"
                >
                  <Plus className="w-5 h-5 mr-3" />
                  Add New Product
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-xl"
                  size="lg"
                  onClick={() => setActiveTab('orders')}
                >
                  <Package className="w-5 h-5 mr-3" />
                  Process Orders
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-xl"
                  size="lg"
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Store Settings
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm text-gray-700 mb-3">Need Help?</h3>
                <Button
                  variant="outline"
                  className="w-full rounded-lg"
                  onClick={() => navigate('/marketplace/help/')}
                >
                  Visit Help Center
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="products">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-gray-900">Manage Products</h2>
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl">
                <Plus className="w-5 h-5 mr-2" />
                Add Product
              </Button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm text-gray-700">Product</th>
                    <th className="text-left px-6 py-4 text-sm text-gray-700">Price</th>
                    <th className="text-left px-6 py-4 text-sm text-gray-700">Stock</th>
                    <th className="text-left px-6 py-4 text-sm text-gray-700">Status</th>
                    <th className="text-right px-6 py-4 text-sm text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.slice(0, 8).map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                            <ImageWithFallback
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-gray-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-900">${product.price}</td>
                      <td className="px-6 py-4 text-gray-600">245 units</td>
                      <td className="px-6 py-4">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h2 className="text-2xl text-gray-900 mb-6">Orders</h2>
            <p className="text-gray-600">Order management interface would go here...</p>
          </div>
        </TabsContent>

        <TabsContent value="payouts">
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h2 className="text-2xl text-gray-900 mb-6">Payouts</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl flex justify-between items-center">
                <div>
                  <p className="text-gray-900 mb-1">Next Payout</p>
                  <p className="text-sm text-gray-600">October 27, 2025</p>
                </div>
                <p className="text-2xl text-green-600">$1,245.67</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </div>
    </div>
  );
}