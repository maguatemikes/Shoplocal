import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, ChevronDown, ChevronUp, Download, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'delivered' | 'in-transit' | 'processing' | 'cancelled';
  total: number;
  items: {
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
    vendor: string;
  }[];
  trackingNumber?: string;
  estimatedDelivery?: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001234',
    date: '2024-10-25',
    status: 'delivered',
    total: 145.50,
    trackingNumber: 'USPS9400111899223344556677',
    items: [
      {
        id: '1',
        name: 'Organic Cotton T-Shirt',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop',
        quantity: 3,
        price: 18.50,
        vendor: 'Green Threads Co.'
      },
      {
        id: '2',
        name: 'Recycled Tote Bag',
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop',
        quantity: 2,
        price: 12.00,
        vendor: 'Green Threads Co.'
      }
    ]
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-001233',
    date: '2024-10-22',
    status: 'in-transit',
    total: 95.00,
    trackingNumber: 'UPS1Z9999999999999999',
    estimatedDelivery: '2024-10-30',
    items: [
      {
        id: '3',
        name: 'Handcrafted Leather Wallet',
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=600&fit=crop',
        quantity: 1,
        price: 45.00,
        vendor: 'Artisan Crafts Studio'
      },
      {
        id: '4',
        name: 'Custom Embroidered Hat',
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=600&fit=crop',
        quantity: 2,
        price: 22.00,
        vendor: 'Custom Print House'
      }
    ]
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-001232',
    date: '2024-10-20',
    status: 'processing',
    total: 64.00,
    estimatedDelivery: '2024-11-02',
    items: [
      {
        id: '5',
        name: 'Organic Face Serum',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop',
        quantity: 2,
        price: 32.00,
        vendor: 'Natural Beauty Co.'
      }
    ]
  }
];

export function OrderHistory() {
  const navigate = useNavigate();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = mockOrders.filter((order) => {
    if (statusFilter === 'all') return true;
    return order.status === statusFilter;
  });

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in-transit':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-orange-600" />;
      case 'cancelled':
        return <Package className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    const variants: Record<Order['status'], string> = {
      delivered: 'bg-green-100 text-green-800',
      'in-transit': 'bg-blue-100 text-blue-800',
      processing: 'bg-orange-100 text-orange-800',
      cancelled: 'bg-red-100 text-red-800'
    };

    const labels: Record<Order['status'], string> = {
      delivered: 'Delivered',
      'in-transit': 'In Transit',
      processing: 'Processing',
      cancelled: 'Cancelled'
    };

    return (
      <Badge className={`${variants[status]} rounded-lg`}>
        {labels[status]}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl text-gray-950 mb-3">Order History</h1>
          <p className="text-gray-500">Track and manage all your orders</p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Filter by status:</span>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] bg-white rounded-lg">
                <SelectValue placeholder="All Orders" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="in-transit">In Transit</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Orders List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl text-gray-950 mb-2">No orders found</h2>
              <p className="text-gray-500 mb-6">
                Start shopping to see your orders here!
              </p>
              <Button
                onClick={() => navigate('/marketplace/products/')}
                className="bg-sky-600 hover:bg-sky-700 text-white rounded-lg"
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Order Header */}
                  <div className="p-6 bg-gray-50 border-b border-gray-200">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        {getStatusIcon(order.status)}
                        <div>
                          <h3 className="text-gray-950 mb-1">{order.orderNumber}</h3>
                          <p className="text-sm text-gray-500">
                            Placed on {new Date(order.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                          {order.estimatedDelivery && order.status !== 'delivered' && (
                            <p className="text-sm text-gray-500 mt-1">
                              Est. delivery: {new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {getStatusBadge(order.status)}
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Total</p>
                          <p className="text-gray-950">${order.total.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      {order.items.slice(0, 3).map((item) => (
                        <ImageWithFallback
                          key={item.id}
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm text-gray-500">+{order.items.length - 3}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-gray-500 mb-4">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </p>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <Button
                        onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                        variant="outline"
                        className="rounded-lg"
                        size="sm"
                      >
                        {expandedOrder === order.id ? (
                          <>
                            <ChevronUp className="w-4 h-4 mr-2" />
                            Hide Details
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4 mr-2" />
                            View Details
                          </>
                        )}
                      </Button>
                      {order.trackingNumber && (
                        <Button
                          variant="outline"
                          className="rounded-lg"
                          size="sm"
                        >
                          <Truck className="w-4 h-4 mr-2" />
                          Track Package
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        className="rounded-lg"
                        size="sm"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Invoice
                      </Button>
                      {order.status === 'delivered' && (
                        <Button
                          onClick={() => navigate('/marketplace/products/')}
                          className="bg-sky-600 hover:bg-sky-700 text-white rounded-lg"
                          size="sm"
                        >
                          Buy Again
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Expanded Order Details */}
                  {expandedOrder === order.id && (
                    <div className="px-6 pb-6 border-t border-gray-200 pt-6">
                      <h4 className="text-gray-950 mb-4">Order Items</h4>
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-start gap-4">
                            <ImageWithFallback
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h5 className="text-gray-950 mb-1">{item.name}</h5>
                              <p className="text-sm text-gray-500 mb-1">
                                Sold by: {item.vendor}
                              </p>
                              <p className="text-sm text-gray-500">
                                Qty: {item.quantity} × ${item.price.toFixed(2)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-gray-950">
                                ${(item.quantity * item.price).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {order.trackingNumber && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Tracking Number</p>
                          <p className="text-gray-950 font-mono">{order.trackingNumber}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}