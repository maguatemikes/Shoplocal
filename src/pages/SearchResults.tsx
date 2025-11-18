import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, Grid, List, ChevronDown, X, Filter } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../lib/mockData';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export function SearchResults() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('organic');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('relevance');
  const [activeTab, setActiveTab] = useState<'all' | 'products'>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0; // relevance
  });

  const totalResults = filteredProducts.length;

  return (
    <div className="min-h-screen bg-white">
      {/* Search Header */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 rounded-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="lg:hidden rounded-lg"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-gray-500">
                {totalResults} {totalResults === 1 ? 'result' : 'results'} for "{searchQuery}"
              </p>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 hidden sm:block">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] bg-white rounded-lg">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name: A to Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6">
            {/* Sidebar Filters - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="w-5 h-5" />
                  <h3 className="text-gray-950">Filters</h3>
                </div>

                <div className="space-y-6">
                  {/* Category Filter */}
                  <div className="space-y-3">
                    <label className="text-gray-950">Category</label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="bg-gray-50 border-0 rounded-lg">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Eco-Friendly">Eco-Friendly</SelectItem>
                        <SelectItem value="Handmade">Handmade</SelectItem>
                        <SelectItem value="Customizable">Customizable</SelectItem>
                        <SelectItem value="Tech">Tech</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="h-px bg-gray-100" />

                  {/* Price Range */}
                  <div className="space-y-3">
                    <label className="text-gray-950">Price Range</label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>

                  <div className="h-px bg-gray-100" />

                  {/* Quick Filters */}
                  <div className="space-y-3">
                    <label className="text-gray-950">Quick Filters</label>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Checkbox id="new" />
                        <label htmlFor="new" className="text-sm text-gray-950 cursor-pointer">
                          New Arrivals
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="trending" />
                        <label htmlFor="trending" className="text-sm text-gray-950 cursor-pointer">
                          Trending
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="offers" />
                        <label htmlFor="offers" className="text-sm text-gray-950 cursor-pointer">
                          Accepts Offers
                        </label>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setCategoryFilter('all');
                      setPriceRange([0, 100]);
                    }}
                    className="w-full rounded-lg"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setShowFilters(false)}>
                <div
                  className="absolute right-0 top-0 h-full w-80 bg-white p-6 shadow-xl overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-gray-950">Filters</h3>
                    <button onClick={() => setShowFilters(false)}>
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-gray-950">Category</label>
                      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="bg-gray-50 border-0 rounded-lg">
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="Eco-Friendly">Eco-Friendly</SelectItem>
                          <SelectItem value="Handmade">Handmade</SelectItem>
                          <SelectItem value="Customizable">Customizable</SelectItem>
                          <SelectItem value="Tech">Tech</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="h-px bg-gray-100" />

                    <div className="space-y-3">
                      <label className="text-gray-950">Price Range</label>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => setShowFilters(false)}
                      className="w-full bg-sky-600 hover:bg-sky-700 text-white rounded-lg"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Results */}
            <div className="flex-1 min-w-0">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
                <TabsList className="bg-gray-100 p-1 rounded-lg mb-6">
                  <TabsTrigger value="all" className="rounded-lg">
                    All ({totalResults})
                  </TabsTrigger>
                  <TabsTrigger value="products" className="rounded-lg">
                    Products ({filteredProducts.length})
                  </TabsTrigger>
                </TabsList>

                {/* All Results */}
                <TabsContent value="all" className="space-y-8">
                  {filteredProducts.length > 0 && (
                    <div>
                      <h3 className="text-gray-950 mb-4">Products</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedProducts.slice(0, 6).map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            onNavigate={navigate}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {totalResults === 0 && (
                    <div className="text-center py-16">
                      <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-2xl text-gray-950 mb-2">No results found</h3>
                      <p className="text-gray-500">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  )}
                </TabsContent>

                {/* Products Only */}
                <TabsContent value="products">
                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {sortedProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onNavigate={navigate}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-2xl text-gray-950 mb-2">No products found</h3>
                      <p className="text-gray-500">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}