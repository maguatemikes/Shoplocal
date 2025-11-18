import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { products } from '../lib/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartItem {
  product: typeof products[0];
  quantity: number;
}

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: products[0], quantity: 2 },
    { product: products[1], quantity: 1 },
    { product: products[2], quantity: 3 },
  ]);
  const [promoCode, setPromoCode] = useState('');

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const newCart = [...cartItems];
    newCart[index].quantity = newQuantity;
    setCartItems(newCart);
  };

  const removeItem = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    onOpenChange(false);
    navigate('/checkout/');
  };

  const handleContinueShopping = () => {
    onOpenChange(false);
    navigate('/products/');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b border-gray-200">
          <SheetTitle className="text-2xl text-gray-900">
            Shopping Cart
          </SheetTitle>
          <SheetDescription className="text-sm text-gray-600 mt-2">
            {cartItems.length} items in your cart
          </SheetDescription>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Your Cart is Empty</h3>
              <p className="text-gray-600 mb-6">
                Start shopping and add items to your cart
              </p>
              <Button
                onClick={handleContinueShopping}
                className="bg-[#0EA5E9] hover:bg-sky-600 rounded-lg"
              >
                Browse Products
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Scrollable Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-4 border border-gray-100">
                  <div className="flex gap-4">
                    {/* Image */}
                    <button
                      onClick={() => {
                        onOpenChange(false);
                        navigate(`/product/${item.product.id}/`);
                      }}
                      className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0"
                    >
                      <ImageWithFallback
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </button>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 min-w-0 pr-2">
                          <button
                            onClick={() => {
                              onOpenChange(false);
                              navigate(`/product/${item.product.id}/`);
                            }}
                            className="text-sm text-gray-900 hover:text-[#0EA5E9] text-left line-clamp-2"
                          >
                            {item.product.name}
                          </button>
                          <button
                            onClick={() => {
                              onOpenChange(false);
                              navigate(`/vendor/${item.product.vendor}/`);
                            }}
                            className="text-xs text-gray-600 hover:text-[#0EA5E9] block mt-1"
                          >
                            {item.product.vendor}
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(index)}
                          className="text-gray-400 hover:text-red-600 flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity */}
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            className="px-2 py-1 hover:bg-gray-50"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 py-1 border-x border-gray-200 text-sm min-w-[40px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="px-2 py-1 hover:bg-gray-50"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-sm text-gray-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Fixed Bottom Section - Summary & Checkout */}
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
              {/* Promo Code */}
              <div className="mb-4">
                <label className="block text-xs text-gray-700 mb-2">Promo Code</label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="rounded-lg h-9 text-sm"
                  />
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <Tag className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between text-lg mb-4">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${total.toFixed(2)}</span>
              </div>

              {/* Free Shipping Notice */}
              {shipping > 0 && (
                <div className="bg-blue-50 text-blue-700 text-xs rounded-lg p-3 mb-4">
                  Add ${(500 - subtotal).toFixed(2)} more for free shipping!
                </div>
              )}

              {/* Checkout Button */}
              <Button
                onClick={handleCheckout}
                className="w-full bg-[#0EA5E9] hover:bg-sky-600 rounded-lg mb-2"
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>

              <Button
                onClick={handleContinueShopping}
                variant="outline"
                className="w-full rounded-lg"
              >
                Continue Shopping
              </Button>

              {/* Trust Badges */}
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-1.5 text-xs text-gray-600">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Secure checkout
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Buyer protection included
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Easy returns & refunds
                </p>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}