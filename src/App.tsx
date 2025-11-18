/**
 * App.tsx - Main Application Component
 * 
 * This is the root component of the ShopLocal marketplace application.
 * It handles:
 * - React Router setup and route definitions
 * - Application layout structure (Navigation, Content, Footer)
 * - Route wrappers for dynamic URL parameters
 * - Stub pages for authentication and error handling
 * 
 * @module App
 */

import { BrowserRouter, Routes, Route, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Homepage } from './pages/Homepage';
import VendorsDirectory from './pages/VendorsDirectory';
import { VendorStorefront } from './pages/VendorStorefront';
import { VendorDetail } from './pages/VendorDetail';
import { ProductCatalog } from './pages/ProductCatalog';
import { ProductDetail } from './pages/ProductDetail';
import { BecomeSeller } from './pages/BecomeSeller';
import { HowItWorks } from './pages/HowItWorks';
import { HelpCenter } from './pages/HelpCenter';
import { AboutPage } from './pages/AboutPage';
import { PolicyPage } from './pages/PolicyPage';
import { ContactPage } from './pages/ContactPage';
import { FeesPage } from './pages/FeesPage';
import { FAQ } from './pages/FAQ';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { VendorDashboard } from './pages/VendorDashboard';
import { Wishlist } from './pages/Wishlist';
import { OrderHistory } from './pages/OrderHistory';
import { UserProfile } from './pages/UserProfile';
import { SearchResults } from './pages/SearchResults';
import { DealsPromotions } from './pages/DealsPromotions';
import { ClaimListing } from './pages/ClaimListing';
import { CreateListing } from './pages/CreateListing';
import { vendors } from './lib/mockData';

/**
 * AppContent Component
 * 
 * Main content wrapper that includes the navigation, routing system, and footer.
 * This component is wrapped by BrowserRouter in the default export.
 * 
 * @returns {JSX.Element} The main application layout with routing
 */
function AppContent() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Global Navigation */}
      <Navigation />
      
      {/* Main Content Area - Grows to fill available space */}
      <main className="flex-grow">
        <Routes>
          {/* ============================================
              HOMEPAGE ROUTE
              ============================================ */}
          <Route path="/" element={<Homepage />} />
          
          {/* ============================================
              VENDOR ROUTES
              Handles vendor directory, detail pages, and storefronts
              ============================================ */}
          <Route path="/vendors" element={<VendorsDirectory />} />
          <Route path="/vendor-detail/:slug" element={<VendorDetailWrapper />} />
          <Route path="/vendor/:slug" element={<VendorStorefrontWrapper />} />
          
          {/* ============================================
              PRODUCT ROUTES
              Handles product catalog and individual product pages
              ============================================ */}
          <Route path="/products" element={<ProductCatalog />} />
          <Route path="/product/:slug" element={<ProductDetailWrapper />} />
          
          {/* ============================================
              SELLER ONBOARDING ROUTES
              For new sellers to sign up and claim listings
              ============================================ */}
          <Route path="/sell" element={<BecomeSeller />} />
          <Route path="/claim-listing" element={<ClaimListing />} />
          <Route path="/create-listing" element={<CreateListing />} />
          
          {/* ============================================
              INFORMATIONAL PAGES
              Static/semi-static content pages
              ============================================ */}
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/fees" element={<FeesPage />} />
          <Route path="/faq" element={<FAQ />} />
          
          {/* ============================================
              POLICY & LEGAL PAGES
              Terms, privacy, refunds, and agreements
              ============================================ */}
          <Route path="/terms" element={<PolicyPage type="terms" />} />
          <Route path="/privacy" element={<PolicyPage type="privacy" />} />
          <Route path="/refund-policy" element={<PolicyPage type="refund" />} />
          <Route path="/seller-agreement" element={<PolicyPage type="seller-agreement" />} />
          
          {/* ============================================
              SHOPPING FLOW ROUTES
              Cart, checkout, wishlist, search, and deals
              ============================================ */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/deals" element={<DealsPromotions />} />
          
          {/* ============================================
              CUSTOMER ACCOUNT ROUTES
              Customer dashboard, orders, and profile
              ============================================ */}
          <Route path="/my-account" element={<CustomerDashboard />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/profile" element={<UserProfile />} />
          
          {/* ============================================
              VENDOR DASHBOARD ROUTES
              Vendor management and authentication
              ============================================ */}
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          <Route path="/vendor-login" element={<VendorLoginPage />} />
          
          {/* ============================================
              404 NOT FOUND
              Catch-all route for invalid URLs
              ============================================ */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      
      {/* Global Footer */}
      <Footer />
    </div>
  );
}

/**
 * VendorDetailWrapper Component
 * 
 * Extracts the vendor slug from URL parameters and fetches the corresponding
 * vendor data. First checks location state (from API), then falls back to mockData.
 * If vendor is not found, redirects to vendors directory.
 * 
 * @returns {JSX.Element} VendorDetail page or VendorsDirectory if not found
 */
function VendorDetailWrapper() {
  const { slug } = useParams();
  const { state } = useLocation();
  
  // First check if vendor was passed via navigation state (from API)
  let vendor = state?.vendor;
  
  // If not in state, try to find in mockData as fallback
  if (!vendor) {
    vendor = vendors.find(v => v.slug === slug);
  }
  
  // Redirect to directory if vendor doesn't exist
  if (!vendor) {
    return <VendorsDirectory />;
  }
  
  return <VendorDetail vendor={vendor} />;
}

/**
 * VendorStorefrontWrapper Component
 * 
 * Extracts the vendor slug from URL parameters and passes it to the
 * VendorStorefront component. Also checks for vendor data in location state.
 * 
 * @returns {JSX.Element} VendorStorefront page with the vendor slug
 */
function VendorStorefrontWrapper() {
  const { slug } = useParams();
  const { state } = useLocation();
  
  // Pass vendor data if available
  return <VendorStorefront vendorSlug={slug || ''} vendor={state?.vendor} />;
}

/**
 * ProductDetailWrapper Component
 * 
 * Extracts the product slug from URL parameters and passes it to the
 * ProductDetail component.
 * 
 * @returns {JSX.Element} ProductDetail page with the product slug
 */
function ProductDetailWrapper() {
  const { slug } = useParams();
  return <ProductDetail productSlug={slug || ''} />;
}

/**
 * App Component (Default Export)
 * 
 * Root component that wraps the application with React Router's BrowserRouter.
 * 
 * @returns {JSX.Element} The complete application wrapped in BrowserRouter
 */
export default function App() {
  // Use basename only on GitHub Pages (check if URL includes github.io)
  const basename = window.location.hostname.includes('github.io') ? '/Shoplocal' : '/';
  
  return (
    <BrowserRouter basename={basename}>
      <AppContent />
    </BrowserRouter>
  );
}

/**
 * VendorLoginPage Component
 * 
 * Authentication page for vendors to access their dashboard.
 * Currently implemented as a stub with mock authentication.
 * 
 * Features:
 * - Email and password input fields
 * - Login button that navigates to vendor dashboard
 * - Link to seller registration page
 * 
 * @returns {JSX.Element} Vendor login form
 */
function VendorLoginPage() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Page Header */}
          <h1 className="text-black mb-2 text-center">Vendor Login</h1>
          <p className="text-gray-600 mb-8 text-center">Access your vendor dashboard</p>
          
          {/* Login Form */}
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
              />
            </div>
            
            {/* Password Input */}
            <div>
              <label className="block text-sm mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
              />
            </div>
            
            {/* Login Button - Currently bypasses authentication */}
            <button
              onClick={() => navigate('/vendor-dashboard')}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg"
            >
              Login
            </button>
          </div>
          
          {/* Registration Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/sell')}
                className="text-sky-600 hover:underline"
              >
                Become a Seller
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * NotFoundPage Component
 * 
 * 404 error page displayed when users navigate to invalid URLs.
 * Provides a clear message and navigation back to homepage.
 * 
 * @returns {JSX.Element} 404 error page with home navigation
 */
function NotFoundPage() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        {/* Large 404 indicator */}
        <h1 className="text-6xl text-gray-300 mb-4">404</h1>
        
        {/* Error message */}
        <h2 className="text-black mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        
        {/* Back to home button */}
        <button
          onClick={() => navigate('/')}
          className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-lg"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
