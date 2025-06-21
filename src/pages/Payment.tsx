
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import PaymentGateway from "@/components/PaymentGateway";

const Payment = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">GeerStore</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/products">
                <Button variant="ghost">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/products" className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Secure Payment</h1>
          <p className="text-gray-600">Complete your purchase securely</p>
        </div>

        <PaymentGateway />
      </div>
    </div>
  );
};

export default Payment;
