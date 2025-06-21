
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Lock, ShoppingBag, Plus, Minus, Trash2, Smartphone, Wallet } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';

const PaymentGateway = () => {
  const { cartItems, getTotalPrice, updateQuantity, removeFromCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: '',
    paypalEmail: '',
    phoneNumber: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setPaymentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handlePayment = async () => {
    if (paymentMethod === 'card' && (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv || !paymentData.name || !paymentData.email)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all payment details.",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === 'paypal' && !paymentData.paypalEmail) {
      toast({
        title: "Missing Information",
        description: "Please enter your PayPal email.",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === 'mobile' && !paymentData.phoneNumber) {
      toast({
        title: "Missing Information",
        description: "Please enter your phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment Successful!",
        description: `Your order of $${getTotalPrice().toFixed(2)} has been processed successfully via ${paymentMethod}.`,
      });
      
      setPaymentData({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        name: '',
        email: '',
        paypalEmail: '',
        phoneNumber: '',
      });
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <CardTitle>Your cart is empty</CardTitle>
          <CardDescription>Add some products to proceed with payment</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Enhanced Cart Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({cartItems.length} items)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg">
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="w-full sm:w-20 h-20 object-cover rounded"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=400&fit=crop';
                  }}
                />
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <Badge variant="outline" className="text-xs">{item.category}</Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-gray-500">${item.price} each</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="px-3 py-1 border rounded text-center min-w-[3rem]">
                        {item.quantity}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-1"
                    >
                      <Trash2 className="h-3 w-3" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <div className="border-t pt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="text-sm text-gray-600">
                Subtotal: ${getTotalPrice().toFixed(2)} | Tax: $0.00 | Shipping: Free
              </div>
              <div className="text-2xl font-bold">
                Total: ${getTotalPrice().toFixed(2)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Payment Options */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Payment Method</CardTitle>
          <CardDescription>Select your preferred payment option</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Payment Method Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-colors ${
                paymentMethod === 'card' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CreditCard className="h-8 w-8" />
              <span className="font-medium">Credit Card</span>
            </button>
            <button
              onClick={() => setPaymentMethod('paypal')}
              className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-colors ${
                paymentMethod === 'paypal' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Wallet className="h-8 w-8" />
              <span className="font-medium">PayPal</span>
            </button>
            <button
              onClick={() => setPaymentMethod('mobile')}
              className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-colors ${
                paymentMethod === 'mobile' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Smartphone className="h-8 w-8" />
              <span className="font-medium">Mobile Pay</span>
            </button>
          </div>

          {/* Payment Forms */}
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="name">Cardholder Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={paymentData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={paymentData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={paymentData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={paymentData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={paymentData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').substring(0, 3))}
                      maxLength={3}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'paypal' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="paypalEmail">PayPal Email</Label>
                <Input
                  id="paypalEmail"
                  type="email"
                  placeholder="your@paypal.com"
                  value={paymentData.paypalEmail}
                  onChange={(e) => handleInputChange('paypalEmail', e.target.value)}
                />
              </div>
            </div>
          )}

          {paymentMethod === 'mobile' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  placeholder="+1 (555) 123-4567"
                  value={paymentData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                />
              </div>
            </div>
          )}
          
          <Button 
            onClick={handlePayment} 
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-lg py-6"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing Payment...
              </>
            ) : (
              <>
                <Lock className="h-4 w-4 mr-2" />
                Pay ${getTotalPrice().toFixed(2)}
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentGateway;
