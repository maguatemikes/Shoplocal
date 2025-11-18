import { Star, ArrowUpRight, MapPin, Award, Sparkles, TrendingUp } from 'lucide-react';
import { Vendor } from '../lib/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface VendorCardProps {
  vendor: Vendor;
  onViewStore: (slug: string) => void;
  onViewDetails?: (slug: string) => void;
}

export function VendorCard({ vendor, onViewStore, onViewDetails }: VendorCardProps) {
  return (
    <div className="group bg-gradient-to-br from-white via-white to-sky-50/30 rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-sky-300 transition-all duration-300 hover:shadow-xl w-full relative backdrop-blur-sm">
      {/* Top accent bar */}
      <div className="h-1.5 bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500" />
      
      {/* Compact Banner */}
      <div className="relative h-32 overflow-hidden">
        <ImageWithFallback
          src={vendor.banner}
          alt={vendor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600/20 to-blue-600/20 mix-blend-multiply" />
        
        {/* Corner badges */}
        <div className="absolute top-3 right-3 flex gap-2">
          <div className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-sky-400" />
            <span className="text-xs text-white">Top Rated</span>
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="p-5">
        {/* Logo positioned differently */}
        <div className="flex items-start gap-4 mb-4 -mt-10">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-blue-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
            <ImageWithFallback
              src={vendor.logo}
              alt={vendor.name}
              className="relative w-16 h-16 rounded-xl object-cover border-3 border-white shadow-2xl"
            />
            {/* Mini verified badge on logo */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-sky-600 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
              <Award className="w-3 h-3 text-white" />
            </div>
          </div>
          
          <div className="flex-1 pt-12">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-lg text-gray-900 group-hover:text-sky-600 transition-colors">
                {vendor.name}
              </h3>
            </div>
            
            {/* Rating and location inline */}
            <div className="flex items-center gap-3 text-sm mb-2">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-gray-900 ml-1">{vendor.rating}</span>
              </div>
              <span className="text-gray-300">|</span>
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-xs">{vendor.location}</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{vendor.tagline}</p>
          </div>
        </div>
        
        {/* Specialty tag */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-sky-100 to-blue-100 border border-sky-200 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span className="text-xs text-sky-900">{vendor.specialty}</span>
          </div>
        </div>
        
        {/* Single prominent CTA button */}
        <button
          onClick={() => onViewStore(vendor.slug)}
          className="w-full px-4 py-3.5 bg-gray-900 text-white rounded-xl hover:bg-sky-600 transition-all duration-300 shadow-lg hover:shadow-xl group/btn relative overflow-hidden"
        >
          <span className="relative flex items-center justify-center gap-2 z-10">
            <span>Visit Store</span>
            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </span>
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
        </button>
        
        {/* Secondary action as text link */}
        {onViewDetails && (
          <button
            onClick={() => onViewDetails(vendor.slug)}
            className="w-full mt-2 text-center text-sm text-gray-600 hover:text-sky-600 transition-colors py-2 group/link"
          >
            <span className="inline-flex items-center gap-1">
              View Full Details
              <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
            </span>
          </button>
        )}
      </div>
      
      {/* Corner decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-5 group-hover:opacity-10 transition-opacity">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-transparent rounded-bl-full" />
      </div>
    </div>
  );
}