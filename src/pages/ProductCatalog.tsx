import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, X, Grid3x3, Tag, Barcode, BadgePercent, RotateCcw } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import { ProductCard } from '../components/ProductCard';
import { products } from '../lib/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

export function ProductCatalog() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [acceptsOffers, setAcceptsOffers] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [brandFilter, setBrandFilter] = useState<string>('all');
  const [upcFilter, setUpcFilter] = useState<string>('');

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesOffers = !acceptsOffers || product.acceptsOffers;
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesBrand = brandFilter === 'all' || product.brand === brandFilter;
      const matchesUpc = upcFilter === '' || product.upc?.includes(upcFilter);
      
      return matchesSearch && matchesOffers && matchesCategory && matchesBrand && matchesUpc;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'popular') return b.isTrending ? 1 : -1;
      return 0;
    });

  const categories = ['Eco-Friendly', 'Handmade', 'Customizable'];
  const hasActiveFilters = selectedCategory !== 'all' || acceptsOffers || brandFilter !== 'all' || upcFilter !== '';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <button onClick={() => navigate('/')} className="hover:text-gray-900">
              Home
            </button>
            <span className="mx-2">→</span>
            <span className="text-gray-900">Products</span>
          </div>
          <h1 className="text-5xl tracking-tight text-gray-900 mb-4">All Products</h1>
          <p className="text-xl text-gray-600">
            Browse unique products from independent sellers
          </p>
        </div>
      </section>

      {/* Search and Sort */}
      <section className="bg-white border-b border-gray-100 py-6 sticky top-20 z-40 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-xl border-gray-200 bg-gray-50"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[200px] h-12 rounded-xl border-gray-200 bg-gray-50">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-40">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-gray-900" />
                    <h3 className="text-lg text-gray-900">Filters</h3>
                  </div>
                  {hasActiveFilters && (
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setAcceptsOffers(false);
                        setBrandFilter('all');
                        setUpcFilter('');
                      }}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Grid3x3 className="w-4 h-4 text-gray-600" />
                    <h4 className="text-sm text-gray-900">Category</h4>
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="bg-gray-50 border-0 rounded-lg h-9">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Eco-Friendly">Eco-Friendly</SelectItem>
                      <SelectItem value="Handmade">Handmade</SelectItem>
                      <SelectItem value="Customizable">Customizable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Brand Filter */}
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-gray-600" />
                    <h4 className="text-sm text-gray-900">Brand</h4>
                  </div>
                  <Select value={brandFilter} onValueChange={setBrandFilter}>
                    <SelectTrigger className="bg-gray-50 border-0 rounded-lg h-9">
                      <SelectValue placeholder="All Brands" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Brands</SelectItem>
                      <SelectItem value="EcoWear">EcoWear</SelectItem>
                      <SelectItem value="Artisan Collection">Artisan Collection</SelectItem>
                      <SelectItem value="PrintPro">PrintPro</SelectItem>
                      <SelectItem value="NaturalGlow">NaturalGlow</SelectItem>
                      <SelectItem value="TechLife">TechLife</SelectItem>
                      <SelectItem value="EcoHome">EcoHome</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* UPC Filter */}
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Barcode className="w-4 h-4 text-gray-600" />
                    <h4 className="text-sm text-gray-900">UPC</h4>
                  </div>
                  <Input
                    type="text"
                    placeholder="Enter UPC..."
                    value={upcFilter}
                    onChange={(e) => setUpcFilter(e.target.value)}
                    className="bg-gray-50 border-0 rounded-lg h-9"
                  />
                </div>

                {/* Accepts Offers */}
                <div className="pt-2">
                  <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <Checkbox
                      checked={acceptsOffers}
                      onCheckedChange={(checked) => setAcceptsOffers(checked as boolean)}
                    />
                    <div className="flex items-center gap-2">
                      <BadgePercent className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">Accepts Offers</span>
                    </div>
                  </label>
                </div>

                {/* Clear All Filters Button */}
                {hasActiveFilters && (
                  <>
                    <div className="h-px bg-gray-100 my-6" />
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setAcceptsOffers(false);
                        setBrandFilter('all');
                        setUpcFilter('');
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Clear All Filters
                    </button>
                  </>
                )}
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-gray-600">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setAcceptsOffers(false);
                      setBrandFilter('all');
                      setUpcFilter('');
                    }}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    <X className="w-4 h-4" />
                    Clear filters
                  </button>
                )}
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onViewProduct={(slug) => navigate(`/product/${slug}/`)}
                      onViewVendor={(slug) => navigate(`/vendor/${slug}/`)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your filters or search term</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setAcceptsOffers(false);
                      setBrandFilter('all');
                      setUpcFilter('');
                    }}
                    className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition-all"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl tracking-tight text-gray-900 mb-4">Want to see your products here?</h2>
          <p className="text-gray-600 mb-8">
            Join thousands of sellers reaching wholesale buyers on our platform
          </p>
          <button
            onClick={() => navigate('/sell/')}
            className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition-all"
          >
            Become a Seller
          </button>
        </div>
      </section>
    </div>
  );
}