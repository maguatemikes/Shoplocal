/**
 * Footer.tsx - Global Footer Component
 * 
 * Provides the site-wide footer with:
 * - Company branding and social media links
 * - Organized link sections for buyers, sellers, and company info
 * - Copyright and legal quick links
 * 
 * Features a 4-column responsive grid layout that adapts to mobile devices.
 * 
 * @module Footer
 */

import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const logoImage = 'https://wholesaleforeveryone.com/wp-content/uploads/2022/12/img_logo.webp';

/**
 * Footer Component
 * 
 * Site-wide footer with navigation links, social media, and company information.
 * Organized into four main sections:
 * 1. Company Info - Logo, tagline, and social media
 * 2. For Buyers - Customer-facing links
 * 3. For Sellers - Vendor-facing links
 * 4. Company - Legal and about pages
 * 
 * @returns {JSX.Element} Complete footer navigation and information
 */
export function Footer() {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        
        {/* ============================================
            MAIN FOOTER GRID
            Four-column responsive layout
            ============================================ */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* ============================================
              COLUMN 1: COMPANY INFO & SOCIAL MEDIA
              ============================================ */}
          <div>
            {/* Company Logo */}
            <div className="mb-4">
              <img 
                src={logoImage} 
                alt="Wholesale For Everyone" 
                className="h-8"
              />
            </div>
            
            {/* Company Tagline */}
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Where quality meets community. Premium brands and local sellers together.
            </p>
            
            {/* Hashtag/Slogan */}
            <p className="text-xs text-sky-400 mb-6">
              #ShopLocalWithUs
            </p>
            
            {/* Social Media Icons */}
            <div className="flex gap-3">
              <button 
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-sky-600 hover:text-white flex items-center justify-center transition-all text-gray-400"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button 
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-sky-600 hover:text-white flex items-center justify-center transition-all text-gray-400"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </button>
              <button 
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-sky-600 hover:text-white flex items-center justify-center transition-all text-gray-400"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button 
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-sky-600 hover:text-white flex items-center justify-center transition-all text-gray-400"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ============================================
              COLUMN 2: FOR BUYERS
              Customer-facing navigation links
              ============================================ */}
          <div>
            <h3 className="text-sm mb-4 text-white">For Buyers</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => navigate('/products')} className="text-gray-400 hover:text-white transition-colors">
                  Browse Products
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/vendors')} className="text-gray-400 hover:text-white transition-colors">
                  Find Vendors
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/how-it-works')} className="text-gray-400 hover:text-white transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/help')} className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </button>
              </li>
            </ul>
          </div>

          {/* ============================================
              COLUMN 3: FOR SELLERS
              Vendor-facing navigation links
              ============================================ */}
          <div>
            <h3 className="text-sm mb-4 text-white">For Sellers</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => navigate('/sell')} className="text-gray-400 hover:text-white transition-colors">
                  Become a Seller
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/vendor-login')} className="text-gray-400 hover:text-white transition-colors">
                  Vendor Login
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/fees')} className="text-gray-400 hover:text-white transition-colors">
                  Fees & Commission
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/seller-agreement')} className="text-gray-400 hover:text-white transition-colors">
                  Seller Agreement
                </button>
              </li>
            </ul>
          </div>

          {/* ============================================
              COLUMN 4: COMPANY & LEGAL
              About and legal documentation links
              ============================================ */}
          <div>
            <h3 className="text-sm mb-4 text-white">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => navigate('/about')} className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/terms')} className="text-gray-400 hover:text-white transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/privacy')} className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/refund-policy')} className="text-gray-400 hover:text-white transition-colors">
                  Refund Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* ============================================
            BOTTOM BAR
            Copyright and quick legal links
            ============================================ */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright Notice */}
          <p className="text-sm text-gray-400">&copy; 2025 ShopLocal. All rights reserved.</p>
          
          {/* Quick Legal Links */}
          <div className="flex gap-6 text-sm text-gray-400">
            <button onClick={() => navigate('/privacy')} className="hover:text-white transition-colors">Privacy</button>
            <button onClick={() => navigate('/terms')} className="hover:text-white transition-colors">Terms</button>
            <button className="hover:text-white transition-colors">Cookies</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
