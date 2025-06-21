
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ShoppingBag, Star, Zap, Sparkles, Globe, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-indigo-400/10 to-blue-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 group">
              <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                GeerStore
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/products">
                <Button variant="ghost" className="hover:bg-indigo-50 transition-colors">
                  Products
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Sparkles className="h-16 w-16 text-indigo-600 animate-pulse" />
                <div className="absolute inset-0 bg-indigo-600/20 rounded-full blur-xl animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 hover-scale">
              Next-Gen E-Commerce
              <span className="text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text block animate-pulse">
                Experience
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover premium products with our cutting-edge shopping platform. 
              Built with modern technology for an unparalleled user experience.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 animate-fade-in">
            <Link to="/products">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                Explore Products
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-2 border-indigo-300 hover:bg-indigo-50 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Learn More
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-in">
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-bold text-indigo-600 mb-2">10K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-bold text-purple-600 mb-2">50K+</div>
              <div className="text-gray-600">Products Sold</div>
            </div>
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-bold text-pink-600 mb-2">99%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Enhanced Features Section */}
        <div className="grid md:grid-cols-3 gap-8 animate-fade-in">
          <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="text-center">
              <div className="h-16 w-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl group-hover:text-indigo-600 transition-colors">Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-lg text-center leading-relaxed">
                Built with modern technologies for optimal performance and lightning-fast loading speeds.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="text-center">
              <div className="h-16 w-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Star className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl group-hover:text-green-600 transition-colors">Premium Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-lg text-center leading-relaxed">
                Carefully curated products with the highest quality standards and premium materials.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="text-center">
              <div className="h-16 w-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl group-hover:text-purple-600 transition-colors">Secure Shopping</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-lg text-center leading-relaxed">
                Advanced security measures and encrypted transactions for worry-free shopping.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 shadow-2xl animate-fade-in">
          <Globe className="h-16 w-16 text-white mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Shopping?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and experience the future of e-commerce today.
          </p>
          <Link to="/products">
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              Start Shopping Now
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
