
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Lock, ShoppingBag } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';

const PaymentGateway = () => {
  const { cartItems, getTotalPrice } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: '',
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

  const handlePayment = async () => {
    if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv || !paymentData.name || !paymentData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all payment details.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment Successful!",
        description: `Your order of $${getTotalPrice().toFixed(2)} has been processed successfully.`,
      });
      
      // Reset form
      setPaymentData({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        name: '',
        email: '',
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
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <span className="text-sm">{item.name} × {item.quantity}</span>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-3 flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Details
          </CardTitle>
          <CardDescription className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Your payment information is secure and encrypted
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
