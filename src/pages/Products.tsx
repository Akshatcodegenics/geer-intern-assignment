
import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ShoppingBag, Filter, Heart, Star, Zap, Share2, ShoppingCart, SlidersHorizontal, Grid3X3, List } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { fetchProducts } from "@/api/products";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  description: string;
}

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [viewMode, setViewMode] = useState("grid");
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, getTotalItems } = useCart();

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  // Enhanced filtering and sorting
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product: Product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'category':
          aValue = a.category.toLowerCase();
          bValue = b.category.toLowerCase();
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy, sortOrder]);

  const categories: string[] = ["all", ...new Set(products.map((p: Product) => p.category))];

  const handleShare = async (product: Product) => {
    const shareData = {
      title: product.name,
      text: product.description,
      url: `${window.location.origin}/products/${product.id}`,
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast({
          title: "Shared!",
          description: `${product.name} has been shared successfully.`,
        });
      } else {
        await navigator.clipboard.writeText(`${product.name} - ${shareData.url}`);
        toast({
          title: "Link Copied!",
          description: `Product link has been copied to clipboard.`,
        });
      }
    } catch (error) {
      try {
        await navigator.clipboard.writeText(`${product.name} - ${shareData.url}`);
        toast({
          title: "Link Copied!",
          description: `Product link has been copied to clipboard.`,
        });
      } catch (clipboardError) {
        toast({
          title: "Share Failed",
          description: "Unable to share or copy link.",
          variant: "destructive",
        });
      }
    }
  };

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to Wishlist!",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=400&fit=crop';
  };

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load products. Please try again.",
      variant: "destructive",
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-xl border-b border-indigo-100/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                GeerStore
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/payment">
                <Button variant="ghost" className="hover:bg-indigo-50 transition-colors relative">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Button variant="ghost" className="hover:bg-indigo-50 transition-colors">
                <Heart className="h-4 w-4 mr-2" />
                Wishlist
              </Button>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-16 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <Zap className="h-24 w-24 lg:h-32 lg:w-32 text-indigo-600" />
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 lg:mb-6 relative">
            Premium Collection
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed relative px-4">
            Discover our handpicked selection of premium products designed to elevate your lifestyle
          </p>
          <div className="flex items-center justify-center mt-6 space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-400 fill-current" />
            ))}
            <span className="ml-2 text-sm lg:text-base text-gray-600 font-medium">4.9/5 Customer Rating</span>
          </div>
        </div>

        {/* Enhanced Search, Filter, and Sort */}
        <div className="mb-8 lg:mb-12 bg-white/70 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg border border-white/20">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search products by name, category, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-base lg:text-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl bg-white/80 backdrop-blur-sm"
            />
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filters:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category: string) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`capitalize transition-all duration-300 ${
                      selectedCategory === category 
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg" 
                        : "hover:bg-indigo-50 hover:border-indigo-300"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Sort:</span>
              </div>
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="category">Category</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-1 border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8 w-8 p-0"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredAndSortedProducts.length} of {products.length} products
          </div>
        </div>

        {/* Products Grid/List */}
        {isLoading ? (
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-6 lg:gap-8`}>
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse bg-white/50 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
                <div className="h-48 lg:h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-2xl"></div>
                <CardHeader className="space-y-3">
                  <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-6 lg:gap-8`}>
            {filteredAndSortedProducts.map((product: Product) => (
              <Card key={product.id} className={`h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden ${viewMode === 'list' ? 'flex flex-row' : ''}`}>
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${viewMode === 'list' ? 'h-full' : 'h-48 lg:h-64'}`}
                      onError={handleImageError}
                      loading="lazy"
                    />
                  </Link>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Badge className="absolute top-4 right-4 bg-white/95 text-gray-700 backdrop-blur-sm border-0 shadow-lg capitalize font-medium">
                    {product.category}
                  </Badge>
                  <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:bg-white"
                      onClick={(e) => {
                        e.preventDefault();
                        handleWishlistToggle(product);
                      }}
                    >
                      <Heart className={`h-4 w-4 transition-colors ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:bg-white"
                      onClick={(e) => {
                        e.preventDefault();
                        handleShare(product);
                      }}
                    >
                      <Share2 className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>
                </div>
                <div className={`${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                  <CardHeader className="pb-3">
                    <Link to={`/products/${product.id}`}>
                      <CardTitle className="text-lg lg:text-xl group-hover:text-indigo-600 transition-colors duration-300 font-bold hover:underline">
                        {product.name}
                      </CardTitle>
                    </Link>
                    <CardDescription className="line-clamp-2 text-gray-600 leading-relaxed text-sm lg:text-base">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        ${product.price}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 text-sm lg:text-base"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product);
                        }}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}

        {filteredAndSortedProducts.length === 0 && !isLoading && (
          <div className="text-center py-12 lg:py-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-lg border border-white/20 max-w-md mx-auto">
              <Search className="h-12 w-12 lg:h-16 lg:w-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">No products found</h3>
              <p className="text-gray-500 text-base lg:text-lg">Try adjusting your search or filter criteria to discover more amazing products</p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Floating elements for visual appeal */}
      <div className="fixed top-1/4 -left-4 w-16 h-16 lg:w-24 lg:h-24 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
      <div className="fixed bottom-1/4 -right-4 w-20 h-20 lg:w-32 lg:h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
    </div>
  );
};

export default Products;
