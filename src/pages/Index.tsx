
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ShoppingBag, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">GeerStore</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/products">
                <Button variant="ghost">Products</Button>
              </Link>
              <Button>Sign In</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Modern E-Commerce
            <span className="text-indigo-600 block">Experience</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover amazing products with our sleek, modern shopping platform. 
            Built with cutting-edge technology for the best user experience.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/products">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle>Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Built with modern technologies for optimal performance and speed.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Premium Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Carefully curated products with the highest quality standards.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Easy Shopping</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Intuitive interface designed for the best shopping experience.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
