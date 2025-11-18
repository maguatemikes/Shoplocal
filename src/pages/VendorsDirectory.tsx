import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Star,
  Clock,
  Phone,
  ExternalLink,
  Filter as FilterIcon,
  SlidersHorizontal,
  Check,
  Map,
  Store,
  Navigation,
  Loader2,
} from "lucide-react";
import axios from "axios";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Vendor } from "../lib/mockData";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { Slider } from "../components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { LeafletMap } from "../components/LeafletMap";
import { calculateDistance, formatDistance } from "../lib/distance";

// GeoDirectory Place interface (based on API response)
interface Place {
  id: number;
  claimed: number;
  title: string | { raw: string; rendered: string };
  content: string | { raw: string; rendered: string };
  post_tags?: string;
  default_category?: number;
  post_category?:
    | string
    | { id: number; name: string; slug: string }
    | Array<{ id: number; name: string; slug: string }>;
  street?: string;
  country?: string;
  region?: string;
  city?: string;
  zip?: string;
  latitude?: string;
  longitude?: string;
  post_images?: string | null;
  phone?: string;
  email?: string;
  website?: string;
  twitter?: string;
  facebook?: string;
  video?: string;
  special_offers?: string;
  business_hours?: string;
  featured?: number;
  slug?: string;
  type?: string;
  status?: string;
  author?: number;
  date?: string;
  featured_media?: number;
  link?: string;
  rating?: number;
  featured_image?: { src?: string; sizes?: any };
  images?: Array<{ src?: string }>;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
      media_details?: any;
    }>;
  };
}

// Helper function to convert API Place to Vendor
function placeToVendor(place: Place, userLocation?: { lat: number; lon: number } | null): Vendor {
  // Handle category - post_category from API
  let specialty = "General";
  let categoryId: number | undefined;
  
  // Extract category ID and name
  if (place.default_category) {
    categoryId = place.default_category;
  }
  
  if (place.post_category) {
    // post_category can be a string, object, or array
    if (typeof place.post_category === "string") {
      specialty = place.post_category;
    } else if (Array.isArray(place.post_category)) {
      specialty = place.post_category
        .map((cat) => cat.name)
        .join(", ");
      // Use the first category ID if available
      if (!categoryId && place.post_category.length > 0) {
        categoryId = place.post_category[0].id;
      }
    } else if (typeof place.post_category === "object") {
      specialty = place.post_category.name;
      if (!categoryId) {
        categoryId = place.post_category.id;
      }
    }
  }

  // Strip HTML tags from content with safety check
  const stripHtml = (html: string | null | undefined) => {
    if (!html || typeof html !== "string") return "";
    return html.replace(/<[^>]*>/g, "").trim();
  };

  // Get image - use featured_image or images array from API
  const imageUrl =
    place.featured_image?.src || place.images?.[0]?.src || "";
  const logo = imageUrl || "https://via.placeholder.com/150";
  const banner =
    imageUrl || "https://via.placeholder.com/800x300";

  // Create tagline from content (first 100 chars)
  const content = stripHtml(
    typeof place.content === "string"
      ? place.content
      : place.content?.rendered,
  );
  const tagline =
    content.substring(0, 100) || "Quality local business";

  // Full bio from content
  const bio =
    content || "A trusted local business in your community.";

  // Extract title string
  const titleString =
    typeof place.title === "string"
      ? place.title
      : place.title?.rendered || "Business";

  // Calculate distance if user location is available
  let distance: number | undefined;
  if (userLocation && place.latitude && place.longitude) {
    distance = calculateDistance(
      userLocation.lat,
      userLocation.lon,
      parseFloat(place.latitude),
      parseFloat(place.longitude)
    );
  }

  return {
    id: place.id.toString(),
    name: titleString,
    slug:
      place.slug ||
      titleString
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
    logo: logo,
    banner: banner,
    tagline: tagline,
    bio: bio,
    specialty: specialty,
    categoryId: categoryId,
    rating: place.rating || 4.5,
    location:
      place.city && place.region
        ? `${place.city}, ${place.region}`
        : place.city || place.region || "Local",
    latitude: place.latitude,
    longitude: place.longitude,
    distance: distance,
    socialLinks: {
      website: place.website || undefined,
      instagram: place.twitter || undefined, // Using twitter field for instagram as example
    },
    policies: {
      shipping:
        place.special_offers ||
        "Please contact us for shipping details and rates.",
      returns:
        "Returns accepted within 30 days. Please contact us for more information.",
      faqs: "For any questions, please reach out to us directly.",
    },
  };
}

export default function VendorsDirectory() {
  const navigate = useNavigate();

  // Cache configuration
  const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds
  const CACHE_KEY = "vendorsDirectory_cache";

  // State management
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [allPlaces, setAllPlaces] = useState<Place[]>([]); // Store ALL fetched places for client-side filtering
  const [mapMarkers, setMapMarkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<
    Array<{
      id: number;
      name: string;
      slug: string;
      icon?: { src?: string };
      fa_icon?: string;
      fa_icon_color?: string;
    }>
  >([]);
  const [regions, setRegions] = useState<
    Array<{ id: number; name: string; slug: string }>
  >([]);
  const [cities, setCities] = useState<
    Array<{ id: number; name: string; slug: string }>
  >([]);
  const [allLocations, setAllLocations] = useState<
    Array<{ region: string; city: string }>
  >([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState<number[]>([
    0,
  ]);
  const [openNow, setOpenNow] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [showMap, setShowMap] = useState(false);
  const [selectedVendorId, setSelectedVendorId] = useState<
    string | null
  >(null);

  // User location state
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [showManualLocation, setShowManualLocation] = useState(false);
  const [manualZipCode, setManualZipCode] = useState("");

  // Cache helper functions
  const getCachedData = () => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const { data, timestamp, filters } = JSON.parse(cached);
      const now = Date.now();

      // Check if cache is still valid
      if (now - timestamp > CACHE_DURATION) {
        console.log("🗑️ Cache expired, clearing...");
        localStorage.removeItem(CACHE_KEY);
        return null;
      }

      console.log(
        "✅ Using cached data from",
        new Date(timestamp).toLocaleTimeString(),
      );
      return { data, filters };
    } catch (err) {
      console.error("Error reading cache:", err);
      return null;
    }
  };

  const setCachedData = (data: Place[], filters: any) => {
    try {
      const cacheObject = {
        data,
        filters,
        timestamp: Date.now(),
      };
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify(cacheObject),
      );
      console.log("💾 Data cached successfully");
    } catch (err) {
      console.error("Error setting cache:", err);
      // If localStorage is full, clear old cache
      localStorage.removeItem(CACHE_KEY);
    }
  };

  const clearCache = () => {
    localStorage.removeItem(CACHE_KEY);
    console.log("🗑️ Cache cleared");
  };

  // Save scroll position when navigating away
  const saveScrollPosition = () => {
    sessionStorage.setItem(
      "vendorsDirectory_scrollPosition",
      window.scrollY.toString(),
    );
    sessionStorage.setItem(
      "vendorsDirectory_currentPage",
      currentPage.toString(),
    );
    console.log("💾 Saved scroll position:", window.scrollY);
  };

  // Helper function to apply filters and pagination
  const applyFiltersAndPagination = (
    places: Place[],
    page: number,
  ) => {
    // CLIENT-SIDE FILTERING (API doesn't support region/city filtering via params)
    let filteredPlaces = places;

    // Filter by region if selected
    if (regionFilter && regionFilter !== "all") {
      filteredPlaces = filteredPlaces.filter(
        (place: Place) => place.region === regionFilter,
      );
    }

    // Filter by city if selected
    if (cityFilter && cityFilter !== "all") {
      filteredPlaces = filteredPlaces.filter(
        (place: Place) => place.city === cityFilter,
      );
    }

    // CLIENT-SIDE PAGINATION: Show only 12 items per page
    const itemsPerPage = 12;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedPlaces = filteredPlaces.slice(
      startIndex,
      endIndex,
    );

    // Map API places to Vendor format (with distance calculation)
    const mappedVendors = paginatedPlaces.map((place: Place) =>
      placeToVendor(place, userLocation),
    );

    // Store vendors for display
    setVendors(mappedVendors);

    // Update pagination info (based on filtered results)
    setTotalItems(filteredPlaces.length);
    setTotalPages(
      Math.ceil(filteredPlaces.length / itemsPerPage),
    );
  };

  // Fetch places from GeoDirectory API with pagination
  const fetchPlaces = async (
    page: number = 1,
    useCache: boolean = true,
  ) => {
    setLoading(true);
    setError(null);

    try {
      const currentFilters = {
        search: searchQuery,
        category: categoryFilter,
        region: regionFilter,
        city: cityFilter,
      };

      // Check cache first if enabled
      if (useCache) {
        const cached = getCachedData();
        if (cached) {
          // Check if filters match
          const filtersMatch =
            cached.filters.search === currentFilters.search &&
            cached.filters.category === currentFilters.category &&
            cached.filters.region === currentFilters.region &&
            cached.filters.city === currentFilters.city;

          if (filtersMatch) {
            console.log(
              "📦 Loading from cache - filters match!",
            );
            setAllPlaces(cached.data);

            // Apply client-side filtering and pagination
            applyFiltersAndPagination(cached.data, page);
            setLoading(false);
            return;
          } else {
            console.log(
              "🔄 Filters changed, fetching fresh data...",
            );
          }
        }
      }

      // Fetch from API
      const params = new URLSearchParams({
        per_page: "100", // Fetch ALL items (max 100 per page)
        page: "1", // Always fetch page 1, we'll paginate client-side
      });

      // Add search filter
      if (searchQuery && searchQuery.trim() !== "") {
        params.append("search", searchQuery.trim());
      }

      // Add category filter if present
      if (categoryFilter && categoryFilter !== "all") {
        const selectedCategory = categories.find(
          (cat) => cat.name === categoryFilter,
        );
        if (selectedCategory) {
          params.append(
            "gd_placecategory",
            selectedCategory.id.toString(),
          );
        }
      }

      // Note: Region and city filtering is done CLIENT-SIDE after fetching
      // The API doesn't properly support region/city filtering via URL params

      const url = `https://shoplocal.kinsta.cloud/wp-json/geodir/v2/places?${params.toString()}`;

      console.log("🌐 Fetching from API...");
      const response = await axios.get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 second timeout
      });

      // Store all places
      setAllPlaces(response.data);

      // Cache the response
      setCachedData(response.data, currentFilters);

      // Apply client-side filtering and pagination
      applyFiltersAndPagination(response.data, page);
    } catch (err: any) {
      console.error("❌ Error fetching places:", err);
      console.error("❌ Error details:", {
        message: err.message,
        code: err.code,
        response: err.response?.data,
        status: err.response?.status,
      });

      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch businesses";
      setError(
        `Network Error: ${errorMessage}. Please check your connection and try again.`,
      );
      setVendors([]);
      setTotalItems(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Fetch map markers from GeoDirectory API
  const fetchMapMarkers = async () => {
    try {
      const params = new URLSearchParams();
      
      // Required: GeoDirectory post type
      params.append("post_type", "gd_place");

      // Add search filter (API supports this)
      if (searchQuery) {
        params.append("search", searchQuery);
      }

      // Note: Don't add region/city to params - we'll filter client-side

      const url = `https://shoplocal.kinsta.cloud/wp-json/geodir/v2/markers?${params.toString()}`;

      const response = await fetch(url, { method: "GET" });
      let data = await response.json();

      // Ensure data is an array
      if (!Array.isArray(data)) {
        console.warn("Map markers API returned non-array data:", data);
        setMapMarkers([]);
        return;
      }

      // CLIENT-SIDE FILTERING for region/city
      if (regionFilter && regionFilter !== "all") {
        data = data.filter(
          (marker: any) => marker.region === regionFilter,
        );
      }

      if (cityFilter && cityFilter !== "all") {
        data = data.filter(
          (marker: any) => marker.city === cityFilter,
        );
      }

      setMapMarkers(data);
    } catch (err) {
      console.error("Error fetching map markers:", err);
      setMapMarkers([]);
    }
  };

  // Fetch all categories from GeoDirectory API
  const fetchCategories = async () => {
    try {
      const url =
        "https://shoplocal.kinsta.cloud/wp-json/geodir/v2/places/categories?per_page=100&hide_empty=false";
      const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        mode: "cors" as RequestMode,
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}`,
        );
      }

      const data = await response.json();

      // Extract category objects from the API response
      // The API returns an array of category objects with name, slug, id, icon, fa_icon, etc.
      const categoriesArray = data
        .filter((cat: any) => cat.name && cat.name !== "")
        .sort((a: any, b: any) => a.name.localeCompare(b.name));

      console.log(
        "📦 Categories with icons from API:",
        categoriesArray,
      );
      setCategories(categoriesArray);
    } catch (err: any) {
      console.error("Error fetching categories:", err);

      // Set fallback categories
      setCategories([
        { id: 1, name: "Sportswear", slug: "sportswear" },
        { id: 2, name: "Electronics", slug: "electronics" },
        { id: 3, name: "Fashion", slug: "fashion" },
        { id: 4, name: "Home & Garden", slug: "home-garden" },
        {
          id: 5,
          name: "Food & Beverage",
          slug: "food-beverage",
        },
      ]);
    }
  };

  // Fetch unique regions and cities from GeoDirectory API
  const fetchLocations = async () => {
    try {
      // Fetch places first to populate location pairs (region-city relationships)
      const placesUrl =
        "https://shoplocal.kinsta.cloud/wp-json/geodir/v2/places?per_page=100";
      const placesResponse = await fetch(placesUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        mode: "cors",
      });

      if (!placesResponse.ok) {
        throw new Error(
          `Failed to fetch places: ${placesResponse.status}`,
        );
      }

      const placesData = await placesResponse.json();

      // Store location pairs for city filtering
      const locationPairs = placesData
        .filter((place: Place) => place.region && place.city)
        .map((place: Place) => ({
          region: place.region!,
          city: place.city!,
        }));

      setAllLocations(locationPairs);

      // Try taxonomy endpoint first for regions, fallback to extraction
      try {
        const regionsUrl =
          "https://shoplocal.kinsta.cloud/wp-json/geodir/v2/places/regions";
        const regionsResponse = await fetch(regionsUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          mode: "cors",
        });

        if (regionsResponse.ok) {
          const regionsData = await regionsResponse.json();

          // Process regions as taxonomy objects - preserve ALL fields from API
          const regionsArray = regionsData
            .filter(
              (region: any) =>
                region.name && region.name !== "",
            )
            .sort((a: any, b: any) =>
              a.name.localeCompare(b.name),
            );

          setRegions(regionsArray);
        } else {
          throw new Error("Regions endpoint not available");
        }
      } catch (regionErr: any) {
        // Extract unique regions from places and create taxonomy objects
        const uniqueRegions = [
          ...new Set(
            placesData
              .map((place: Place) => place.region)
              .filter(
                (region: string | undefined) =>
                  region && region.trim() !== "",
              ),
          ),
        ].sort();

        const regionsArray = uniqueRegions.map(
          (region, index) => ({
            id: index + 1,
            name: region as string,
            slug: (region as string)
              .toLowerCase()
              .replace(/\s+/g, "-"),
          }),
        );

        setRegions(regionsArray);
      }

      // Try taxonomy endpoint first for cities, fallback to extraction
      try {
        const citiesUrl =
          "https://shoplocal.kinsta.cloud/wp-json/geodir/v2/places/cities";
        const citiesResponse = await fetch(citiesUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          mode: "cors",
        });

        if (citiesResponse.ok) {
          const citiesData = await citiesResponse.json();

          // Process cities as taxonomy objects - preserve ALL fields from API
          const citiesArray = citiesData
            .filter(
              (city: any) => city.name && city.name !== "",
            )
            .sort((a: any, b: any) =>
              a.name.localeCompare(b.name),
            );

          setCities(citiesArray);
        } else {
          throw new Error("Cities endpoint not available");
        }
      } catch (cityErr: any) {
        // Extract unique cities from places and create taxonomy objects
        const uniqueCities = [
          ...new Set(
            placesData
              .map((place: Place) => place.city)
              .filter(
                (city: string | undefined) =>
                  city && city.trim() !== "",
              ),
          ),
        ].sort();

        const citiesArray = uniqueCities.map((city, index) => ({
          id: index + 1000, // Start at 1000 to avoid ID conflicts with regions
          name: city as string,
          slug: (city as string)
            .toLowerCase()
            .replace(/\s+/g, "-"),
        }));

        setCities(citiesArray);
        console.log(
          "🌍 [CITIES FALLBACK] Extracted cities:",
          citiesArray,
        );
      }
    } catch (err: any) {
      console.error("❌ Error fetching locations:", err);
      console.error("❌ Location error details:", {
        message: err.message,
        stack: err.stack,
      });

      // Set fallback regions
      console.log("⚠️ Using fallback regions due to API error");
      setRegions([
        { id: 1, name: "California", slug: "california" },
        { id: 2, name: "New York", slug: "new-york" },
        { id: 3, name: "Texas", slug: "texas" },
        { id: 4, name: "Florida", slug: "florida" },
      ]);
      setAllLocations([]);
    }
  };

  // Handle user location detection
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    setLocationLoading(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        setUserLocation(newLocation);
        setLocationLoading(false);
        setLocationError(null);
        
        // Automatically sort by distance when location is detected
        setSortBy("distance");
        
        // Re-apply filters with new distance calculations
        applyFiltersAndPagination(allPlaces, currentPage);
        
        console.log("📍 User location detected:", newLocation);
      },
      (error) => {
        setLocationLoading(false);
        let errorMessage = "Unable to detect your location.";
        
        if (error.code === 1) {
          // PERMISSION_DENIED
          errorMessage = "Location access denied. This feature requires location permissions. Please enable location access in your browser settings, or try using HTTPS.";
        } else if (error.code === 2) {
          // POSITION_UNAVAILABLE
          errorMessage = "Location unavailable. Please check your device's location services.";
        } else if (error.code === 3) {
          // TIMEOUT
          errorMessage = "Location request timed out. Please try again.";
        }
        
        // Check for permissions policy error
        if (error.message && error.message.includes("permissions policy")) {
          errorMessage = "Location access is blocked by your browser. This may happen when the site is embedded or not served over HTTPS. Try opening the site directly in a new tab.";
        }
        
        setLocationError(errorMessage);
        
        // Show manual location option when geolocation fails
        setShowManualLocation(true);
        
        console.warn("📍 Geolocation blocked - manual location option enabled");
      },
      {
        enableHighAccuracy: false, // Changed to false for better compatibility
        timeout: 15000, // Increased timeout
        maximumAge: 300000, // Allow cached position up to 5 minutes
      }
    );
  };

  // Handle manual location entry (using zip code or city)
  const handleManualLocation = async () => {
    if (!manualZipCode.trim()) {
      setLocationError("Please enter a zip code or city name");
      return;
    }

    setLocationLoading(true);
    setLocationError(null);

    try {
      // Use Nominatim (OpenStreetMap) geocoding API - free and no API key needed
      const query = encodeURIComponent(manualZipCode.trim());
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=us&limit=1`;
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'ShopLocal Marketplace Directory'
        }
      });
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        const newLocation = {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon)
        };
        
        setUserLocation(newLocation);
        setLocationLoading(false);
        setLocationError(null);
        setShowManualLocation(false);
        setSortBy("distance");
        applyFiltersAndPagination(allPlaces, currentPage);
        
        console.log("📍 Manual location set:", newLocation, "for:", manualZipCode);
      } else {
        setLocationError("Location not found. Please try a valid US zip code or city name.");
        setLocationLoading(false);
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      setLocationError("Unable to find location. Please try again.");
      setLocationLoading(false);
    }
  };

  // Clear user location
  const clearUserLocation = () => {
    setUserLocation(null);
    setLocationError(null);
    setShowManualLocation(false);
    setManualZipCode("");
    setSortBy("featured");
    applyFiltersAndPagination(allPlaces, currentPage);
    console.log("📍 User location cleared");
  };

  // Fetch on component mount
  useEffect(() => {
    fetchCategories();
    fetchLocations();

    // Restore scroll position if coming back
    const savedScrollPosition = sessionStorage.getItem(
      "vendorsDirectory_scrollPosition",
    );
    const savedPage = sessionStorage.getItem(
      "vendorsDirectory_currentPage",
    );

    if (savedScrollPosition && savedPage) {
      console.log(
        "📜 Restoring scroll position:",
        savedScrollPosition,
      );
      setCurrentPage(parseInt(savedPage));
      fetchPlaces(parseInt(savedPage), true); // Use cache

      // Restore scroll after a short delay to let content render
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollPosition));
      }, 100);

      // Clear saved position after restoring
      sessionStorage.removeItem(
        "vendorsDirectory_scrollPosition",
      );
      sessionStorage.removeItem("vendorsDirectory_currentPage");
    } else {
      fetchPlaces(1, true); // Initial fetch with cache enabled
    }
  }, []); // Initial load

  // Debounced refetch when filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1); // Reset to page 1
      fetchPlaces(1, true); // Refetch with filters, cache will check if filters match
    }, 800); // 800ms debounce - gives users time to type

    return () => clearTimeout(timeoutId);
  }, [categoryFilter, searchQuery, regionFilter, cityFilter]); // Trigger when any filter changes

  // Fetch when page changes (no debounce for pagination)
  useEffect(() => {
    if (currentPage > 1) {
      // Don't fetch on initial mount (page 1 already fetched above)
      fetchPlaces(currentPage, true); // Use cache for pagination
    }
  }, [currentPage]);

  // When region changes, reset city filter
  useEffect(() => {
    if (regionFilter !== "all") {
      setCityFilter("all");
    }
  }, [regionFilter]);

  // Refetch markers when map visibility changes
  useEffect(() => {
    if (showMap) {
      fetchMapMarkers();
    }
  }, [showMap]);

  // Recalculate distances when user location changes
  useEffect(() => {
    if (userLocation && allPlaces.length > 0) {
      applyFiltersAndPagination(allPlaces, currentPage);
    }
  }, [userLocation]);

  // Handle search submit (for Enter key)
  const handleSearch = () => {
    // Search happens automatically via useEffect
    // This just ensures we're on page 1
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of results
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const filteredVendors = vendors.filter((vendor) => {
    // If a vendor is selected from map click, show only that one
    if (selectedVendorId) {
      return vendor.id === selectedVendorId;
    }

    // Apply client-side rating filter
    const matchesRating =
      ratingFilter[0] === 0 || vendor.rating >= ratingFilter[0];

    return matchesRating;
  });

  const sortedVendors = [...filteredVendors].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "distance") {
      // Sort by distance (nearest first)
      if (a.distance === undefined && b.distance === undefined) return 0;
      if (a.distance === undefined) return 1;
      if (b.distance === undefined) return -1;
      return a.distance - b.distance;
    }
    return 0; // featured
  });

  const clearAllFilters = () => {
    setSearchQuery("");
    setRegionFilter("all");
    setCityFilter("all");
    setCategoryFilter("all");
    setRatingFilter([0]);
    setOpenNow(false);
    setVerifiedOnly(false);
    setFeaturedOnly(false);
    setCurrentPage(1);
    setSelectedVendorId(null); // Reset map selection
  };

  // Compute available cities based on selected region (like categories)
  const availableCities =
    regionFilter === "all"
      ? [...new Set(allLocations.map((loc) => loc.city))].sort()
      : [
          ...new Set(
            allLocations
              .filter((loc) => loc.region === regionFilter)
              .map((loc) => loc.city),
          ),
        ].sort();

  console.log("🔍 [CITY FILTER DEBUG] ============");
  console.log(
    "🔍 [CITY FILTER] Selected region:",
    regionFilter,
  );
  console.log(
    "🔍 [CITY FILTER] Total location pairs:",
    allLocations.length,
  );
  console.log(
    "🔍 [CITY FILTER] First 10 location pairs:",
    allLocations.slice(0, 10),
  );
  console.log("🔍 [CITY FILTER] Unique regions in data:", [
    ...new Set(allLocations.map((loc) => loc.region)),
  ]);
  console.log(
    "🔍 [CITY FILTER] Available cities for region:",
    availableCities,
  );
  console.log(
    "🔍 [CITY FILTER] Total cities state:",
    cities.length,
  );
  console.log("🔍 [CITY FILTER DEBUG] ============");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header - Enhanced visual hierarchy */}
      <section className="bg-white border-b border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl text-gray-950 mb-4 tracking-tight">
              Business Directory
            </h1>
            <p className="text-lg text-gray-600">
              Discover trusted local businesses in your
              community
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters - Improved grouping and spacing */}
          <div
            className={`mb-8 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm ${showMap ? "block" : "block lg:hidden"}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
                  <FilterIcon className="w-5 h-5 text-sky-700" />
                </div>
                <h2 className="text-xl text-gray-950">
                  Filter Businesses
                </h2>
              </div>
              <Button
                variant="outline"
                onClick={clearAllFilters}
                className="rounded-lg"
                size="sm"
              >
                Clear Filters
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-gray-600" />
                  <label className="text-sm text-gray-900">
                    Search
                  </label>
                </div>
                <Input
                  type="text"
                  placeholder="Search businesses..."
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleSearch()
                  }
                  className="bg-gray-50 border-0 rounded-lg h-9"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm text-gray-900">
                  Category
                </label>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="bg-gray-50 border-0 rounded-lg h-9">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] overflow-y-auto">
                    <SelectItem value="all">
                      All Categories
                    </SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Region Filter */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <label className="text-sm text-gray-900">
                    Region
                  </label>
                </div>
                <Select
                  value={regionFilter}
                  onValueChange={setRegionFilter}
                >
                  <SelectTrigger className="bg-gray-50 border-0 rounded-lg h-9">
                    <SelectValue placeholder="All Regions" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] overflow-y-auto">
                    <SelectItem value="all">
                      All Regions
                    </SelectItem>
                    {regions.map((region) => (
                      <SelectItem
                        key={region.id}
                        value={region.name}
                      >
                        {region.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* City Filter */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <label className="text-sm text-gray-900">
                    City
                  </label>
                </div>
                <Select
                  value={cityFilter}
                  onValueChange={setCityFilter}
                >
                  <SelectTrigger className="bg-gray-50 border-0 rounded-lg h-9">
                    <SelectValue placeholder="All Cities" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] overflow-y-auto">
                    <SelectItem value="all">
                      All Cities
                    </SelectItem>
                    {availableCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-gray-600" />
                  <label className="text-sm text-gray-900">
                    Min Rating: {ratingFilter[0]}
                  </label>
                </div>
                <Slider
                  value={ratingFilter}
                  onValueChange={setRatingFilter}
                  max={5}
                  step={0.5}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Sidebar Filter - Only on desktop when map is not shown */}
            {!showMap && (
              <div className="hidden lg:block lg:w-64 flex-shrink-0">
                <div className="bg-white border border-gray-100 rounded-2xl p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="w-5 h-5 text-gray-900" />
                      <h3 className="text-lg text-gray-900">
                        Filters
                      </h3>
                    </div>
                    {(searchQuery ||
                      regionFilter !== "all" ||
                      cityFilter !== "all" ||
                      categoryFilter !== "all" ||
                      ratingFilter[0] > 0 ||
                      openNow ||
                      verifiedOnly ||
                      featuredOnly) && (
                      <button
                        onClick={clearAllFilters}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  <div className="space-y-6">
                    {/* Search */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Search className="w-4 h-4 text-gray-600" />
                        <label className="text-sm text-gray-900">
                          Search
                        </label>
                      </div>
                      <Input
                        type="text"
                        placeholder="Search businesses..."
                        value={searchQuery}
                        onChange={(e) =>
                          setSearchQuery(e.target.value)
                        }
                        className="bg-gray-50 border-0 rounded-lg h-9"
                      />
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* Category */}
                    <div className="space-y-3">
                      <label className="text-sm text-gray-900">
                        Category
                      </label>
                      <Select
                        value={categoryFilter}
                        onValueChange={setCategoryFilter}
                      >
                        <SelectTrigger className="bg-gray-50 border-0 rounded-lg h-9">
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">
                            All Categories
                          </SelectItem>
                          {categories.map((cat) => (
                            <SelectItem
                              key={cat.id}
                              value={cat.name}
                            >
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* Region */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-600" />
                        <label className="text-sm text-gray-900">
                          Region
                        </label>
                      </div>
                      <Select
                        value={regionFilter}
                        onValueChange={setRegionFilter}
                      >
                        <SelectTrigger className="bg-gray-50 border-0 rounded-lg h-9">
                          <SelectValue placeholder="All Regions" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">
                            All Regions
                          </SelectItem>
                          {regions.map((region) => (
                            <SelectItem
                              key={region.id}
                              value={region.name}
                            >
                              {region.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* City */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-600" />
                        <label className="text-sm text-gray-900">
                          City
                        </label>
                      </div>
                      <Select
                        value={cityFilter}
                        onValueChange={setCityFilter}
                      >
                        <SelectTrigger className="bg-gray-50 border-0 rounded-lg h-9">
                          <SelectValue placeholder="All Cities" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">
                            All Cities
                          </SelectItem>
                          {availableCities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* Rating */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-gray-600" />
                        <label className="text-sm text-gray-900">
                          Minimum Rating
                        </label>
                      </div>
                      <Slider
                        value={ratingFilter}
                        onValueChange={setRatingFilter}
                        max={5}
                        step={0.5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>0</span>
                        <div className="flex items-center gap-1">
                          <span>{ratingFilter[0]}</span>
                          <Star className="w-3 h-3 fill-gray-500" />
                        </div>
                        <span>5</span>
                      </div>
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* Clear Filters */}
                    <Button
                      variant="outline"
                      onClick={clearAllFilters}
                      className="w-full rounded-lg"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div
              className={
                showMap ? "flex-1 min-w-0" : "flex-1 min-w-0"
              }
            >
              {/* Top Bar */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl text-gray-950">
                      Business Directory
                    </h2>
                    <p className="text-gray-500">
                      {filteredVendors.length} businesses found
                    </p>
                    {selectedVendorId && (
                      <p className="text-sm text-sky-600 mt-1">
                        Filtered by map selection
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Use My Location Button */}
                    <Button
                      variant="outline"
                      onClick={handleUseMyLocation}
                      disabled={locationLoading}
                      className="rounded-lg"
                    >
                      {locationLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Detecting...
                        </>
                      ) : userLocation ? (
                        <>
                          <Navigation className="w-4 h-4 mr-2 text-green-600" />
                          Location Set
                        </>
                      ) : (
                        <>
                          <Navigation className="w-4 h-4 mr-2" />
                          Use My Location
                        </>
                      )}
                    </Button>

                    {/* Manual Location Toggle or Clear Location */}
                    {userLocation ? (
                      <Button
                        variant="ghost"
                        onClick={clearUserLocation}
                        className="rounded-lg text-gray-600 hover:text-red-600"
                        size="sm"
                      >
                        Clear Location
                      </Button>
                    ) : !showManualLocation ? (
                      <Button
                        variant="ghost"
                        onClick={() => setShowManualLocation(true)}
                        className="rounded-lg text-gray-600 hover:text-gray-900"
                        size="sm"
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        Enter Zip Code
                      </Button>
                    ) : null}
                    
                    <Button
                      variant={showMap ? "default" : "outline"}
                      onClick={() => setShowMap(!showMap)}
                      className={
                        showMap
                          ? "rounded-lg bg-sky-600 hover:bg-sky-700"
                          : "rounded-lg border-sky-600 text-sky-600 hover:bg-sky-50"
                      }
                    >
                      <Map className="w-4 h-4 mr-2" />
                      {showMap ? "Hide Map" : "Show Map"}
                    </Button>
                  </div>
                </div>
                
                {/* Manual Location Input - Show when geolocation fails */}
                {showManualLocation && !userLocation && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3 mb-3">
                      <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="text-sm text-blue-900 mb-1">Enter Your Location Manually</h3>
                        <p className="text-xs text-blue-700">
                          Browser location is blocked. Enter your zip code or city to see distances.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Enter zip code or city..."
                        value={manualZipCode}
                        onChange={(e) => setManualZipCode(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleManualLocation()}
                        className="flex-1 rounded-lg h-9"
                        disabled={locationLoading}
                      />
                      <Button
                        onClick={handleManualLocation}
                        disabled={locationLoading || !manualZipCode.trim()}
                        className="rounded-lg bg-sky-600 hover:bg-sky-700"
                        size="sm"
                      >
                        {locationLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "Set Location"
                        )}
                      </Button>
                    </div>
                    {locationError && (
                      <p className="text-xs text-red-600 mt-2">{locationError}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Map - Show on mobile when toggled */}
              {showMap && (
                <div className="lg:hidden mb-6">
                  <InteractiveBusinessMap
                    vendors={sortedVendors}
                    categories={categories}
                    onVendorSelect={(vendorId) =>
                      setSelectedVendorId(vendorId)
                    }
                    selectedVendorId={selectedVendorId}
                  />
                </div>
              )}

              {/* Vendor Grid with Map */}
              <div
                className={
                  showMap
                    ? "grid grid-cols-1 lg:grid-cols-2 gap-6"
                    : ""
                }
              >
                {/* Vendor Cards */}
                <div>
                  {/* Loading State */}
                  {loading && (
                    <div className="text-center py-24">
                      <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Search className="w-8 h-8 text-sky-600" />
                      </div>
                      <h3 className="text-xl text-gray-900 mb-2">
                        Loading businesses...
                      </h3>
                      <p className="text-gray-600">
                        Please wait while we fetch the latest
                        listings
                      </p>
                    </div>
                  )}

                  {/* Error State */}
                  {error && !loading && (
                    <div className="text-center py-24">
                      <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <FilterIcon className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-xl text-gray-900 mb-2">
                        Error loading businesses
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {error}
                      </p>
                      <Button
                        onClick={() => fetchPlaces(1)}
                        className="rounded-lg bg-sky-600 hover:bg-sky-700"
                      >
                        Try Again
                      </Button>
                    </div>
                  )}

                  {/* Results */}
                  {!loading &&
                    !error &&
                    sortedVendors.length > 0 && (
                      <div
                        className={
                          showMap
                            ? "grid grid-cols-1 sm:grid-cols-2 gap-6"
                            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        }
                      >
                        {sortedVendors.map((vendor) => (
                          <VendorBusinessCard
                            key={vendor.id}
                            vendor={vendor}
                            onNavigate={saveScrollPosition}
                          />
                        ))}
                      </div>
                    )}

                  {/* No Results */}
                  {!loading &&
                    !error &&
                    sortedVendors.length === 0 && (
                      <div className="text-center py-24">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <FilterIcon className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl text-gray-900 mb-2">
                          No businesses found
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Try adjusting your search or filters
                        </p>
                        <Button
                          onClick={clearAllFilters}
                          className="rounded-lg"
                        >
                          Clear Filters
                        </Button>
                      </div>
                    )}

                  {/* Load More */}
                  {!loading &&
                    !error &&
                    sortedVendors.length > 0 && (
                      <div className="mt-12">
                        {/* Pagination Controls */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-gray-100 rounded-xl p-4">
                          {/* Results Info */}
                          <div className="text-sm text-gray-600">
                            Showing{" "}
                            <span className="text-gray-900">
                              {(currentPage - 1) * 12 + 1}
                            </span>{" "}
                            to{" "}
                            <span className="text-gray-900">
                              {Math.min(
                                currentPage * 12,
                                totalItems,
                              )}
                            </span>{" "}
                            of{" "}
                            <span className="text-gray-900">
                              {totalItems}
                            </span>{" "}
                            results
                          </div>

                          {/* Pagination Buttons */}
                          <div className="flex items-center gap-2">
                            {/* Previous Button */}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handlePageChange(
                                  currentPage - 1,
                                )
                              }
                              disabled={
                                currentPage === 1 || loading
                              }
                              className="rounded-lg"
                            >
                              Previous
                            </Button>

                            {/* Page Numbers */}
                            <div className="flex items-center gap-1">
                              {/* First Page */}
                              {currentPage > 2 && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handlePageChange(1)
                                    }
                                    className="rounded-lg w-9 h-9 p-0"
                                  >
                                    1
                                  </Button>
                                  {currentPage > 3 && (
                                    <span className="text-gray-400 px-1">
                                      ...
                                    </span>
                                  )}
                                </>
                              )}

                              {/* Previous Page */}
                              {currentPage > 1 && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handlePageChange(
                                      currentPage - 1,
                                    )
                                  }
                                  className="rounded-lg w-9 h-9 p-0"
                                >
                                  {currentPage - 1}
                                </Button>
                              )}

                              {/* Current Page */}
                              <Button
                                variant="default"
                                size="sm"
                                className="rounded-lg w-9 h-9 p-0 bg-sky-600 hover:bg-sky-700 text-white"
                              >
                                {currentPage}
                              </Button>

                              {/* Next Page */}
                              {currentPage < totalPages && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handlePageChange(
                                      currentPage + 1,
                                    )
                                  }
                                  className="rounded-lg w-9 h-9 p-0"
                                >
                                  {currentPage + 1}
                                </Button>
                              )}

                              {/* Last Page */}
                              {currentPage < totalPages - 1 && (
                                <>
                                  {currentPage <
                                    totalPages - 2 && (
                                    <span className="text-gray-400 px-1">
                                      ...
                                    </span>
                                  )}
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handlePageChange(
                                        totalPages,
                                      )
                                    }
                                    className="rounded-lg w-9 h-9 p-0"
                                  >
                                    {totalPages}
                                  </Button>
                                </>
                              )}
                            </div>

                            {/* Next Button */}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handlePageChange(
                                  currentPage + 1,
                                )
                              }
                              disabled={
                                currentPage === totalPages ||
                                loading
                              }
                              className="rounded-lg"
                            >
                              Next
                            </Button>
                          </div>

                          {/* Go to Page Input (optional, for desktop) */}
                          <div className="hidden lg:flex items-center gap-2 text-sm">
                            <span className="text-gray-600">
                              Go to page:
                            </span>
                            <input
                              type="number"
                              min="1"
                              max={totalPages}
                              value={currentPage}
                              onChange={(e) => {
                                const page = parseInt(
                                  e.target.value,
                                );
                                if (
                                  page >= 1 &&
                                  page <= totalPages
                                ) {
                                  handlePageChange(page);
                                }
                              }}
                              className="w-16 px-2 py-1 border border-gray-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                </div>

                {/* Map Column */}
                {showMap && (
                  <div className="hidden lg:block">
                    <div className="sticky top-24">
                      <InteractiveBusinessMap
                        vendors={sortedVendors}
                        categories={categories}
                        onVendorSelect={(vendorId) =>
                          setSelectedVendorId(vendorId)
                        }
                        selectedVendorId={selectedVendorId}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// New Business Card Component matching the reference design
function VendorBusinessCard({
  vendor,
  onNavigate,
}: {
  vendor: Vendor;
  onNavigate: () => void;
}) {
  const navigate = useNavigate();
  const isFeatured = vendor.rating >= 4.5; // Example logic for featured
  const isClaimed = vendor.rating >= 4.5; // Mock logic - in real app would be a property

  // Generate stable review count based on vendor ID (won't change on re-render)
  const reviewCount = Math.floor(
    ((parseInt(vendor.id) * 7) % 150) + 10,
  ); // Generates 10-159 reviews consistently

  // Mock store hours
  const storeHours = [
    { day: "Mon-Fri", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ];

  return (
    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-gray-900/10 hover:border-gray-300 transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={vendor.banner}
          alt={vendor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Gradient overlay for better badge visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {isFeatured && (
          <div className="absolute top-4 right-4 bg-sky-600 text-white px-3 py-1.5 rounded-lg text-xs shadow-lg backdrop-blur-sm">
            ⭐ Featured
          </div>
        )}
        {!isClaimed && (
          <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1.5 rounded-lg text-xs shadow-lg backdrop-blur-sm">
            Unclaimed
          </div>
        )}
      </div>

      {/* Content - Enhanced spacing */}
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg text-gray-950 truncate">
                {vendor.name}
              </h3>
              {isClaimed && (
                <Check className="w-5 h-5 text-sky-600 flex-shrink-0" />
              )}
            </div>
            <div className="inline-flex items-center px-3 py-1.5 bg-sky-50 text-sky-700 rounded-lg text-xs">
              {vendor.specialty}
            </div>
          </div>
        </div>

        {/* Rating - Enhanced visual hierarchy */}
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 transition-all ${
                  i < Math.floor(vendor.rating)
                    ? "fill-amber-400 text-amber-400"
                    : i < vendor.rating
                      ? "fill-amber-400/50 text-amber-400"
                      : "fill-none text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-950">
            {vendor.rating}
          </span>
          <span className="text-sm text-gray-400">
            ({reviewCount})
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
          {vendor.tagline}
        </p>

        {/* Location & Status - Better spacing */}
        <div className="flex items-center justify-between text-sm mb-5">
          <div className="flex items-center gap-1.5 text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="truncate">{vendor.location}</span>
            {vendor.distance !== undefined && (
              <span className="text-sky-600 ml-1">
                • {formatDistance(vendor.distance)}
              </span>
            )}
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1.5 text-red-600 cursor-pointer hover:text-red-700 transition-colors">
                <Clock className="w-4 h-4" />
                <span>Closed</span>
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              align="end"
              className="w-48"
            >
              <div className="text-xs space-y-1.5">
                <div className="text-white pb-1.5 border-b border-white/20 mb-1.5">
                  Store Hours
                </div>
                {storeHours.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-gray-300">
                      {schedule.day}
                    </span>
                    <span
                      className={
                        schedule.hours === "Closed"
                          ? "text-red-400"
                          : "text-white"
                      }
                    >
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Actions - Improved touch targets */}
        <div className="flex gap-3">
          <Button
            onClick={() => {
              onNavigate();
              navigate(`/vendor-detail/${vendor.slug}/`, {
                state: { vendor },
              });
            }}
            className="flex-1 bg-sky-600 hover:bg-sky-700 text-white rounded-md h-10 text-sm shadow-sm hover:shadow-md transition-all"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Details
          </Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="rounded-md h-10 w-10 p-0 border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white transition-all"
                onClick={() => {
                  onNavigate();
                  navigate(`/vendor/${vendor.slug}/`, {
                    state: { vendor },
                  });
                }}
              >
                <Store className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Visit Store</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Claim Listing Link */}
        {!isClaimed && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <button
              onClick={() => navigate("/sell/")}
              className="text-xs text-amber-600 hover:text-amber-700 hover:underline w-full text-center transition-colors"
            >
              Is this your business? Claim it →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Interactive Business Map Component
function InteractiveBusinessMap({
  vendors,
  categories,
  onVendorSelect,
  selectedVendorId,
}: {
  vendors: Vendor[];
  categories: Array<{
    id: number;
    name: string;
    slug: string;
    icon?: { src?: string };
    fa_icon?: string;
    fa_icon_color?: string;
  }>;
  onVendorSelect: (vendorId: string) => void;
  selectedVendorId: string | null;
}) {
  // Filter vendors that have lat/long and valid coordinates
  const vendorsWithLocation = vendors.filter(
    (v) =>
      v.latitude &&
      v.longitude &&
      !isNaN(parseFloat(v.latitude)) &&
      !isNaN(parseFloat(v.longitude)),
  );

  // Debug: Log coordinates
  console.log(
    "Vendors with location:",
    vendorsWithLocation.map((v) => ({
      name: v.name,
      lat: v.latitude,
      lng: v.longitude,
    })),
  );

  if (vendorsWithLocation.length === 0) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="aspect-square flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-gray-950 mb-2">
              No Location Data
            </h3>
            <p className="text-sm text-gray-500">
              Businesses on this page don't have coordinates
              available
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Helper function to get category icon by category ID
  const getCategoryIcon = (vendor: Vendor): string | undefined => {
    console.log(
      "🔍 Looking for icon for vendor:",
      vendor.name,
      "Category ID:",
      vendor.categoryId,
      "Specialty:",
      vendor.specialty,
    );
    console.log(
      "📦 Available categories:",
      categories.map((c) => ({
        id: c.id,
        name: c.name,
        hasIcon: !!c.icon?.src,
        iconSrc: c.icon?.src,
      })),
    );

    // Find the category by ID first (most accurate)
    let category;
    if (vendor.categoryId) {
      category = categories.find((cat) => cat.id === vendor.categoryId);
      console.log(
        "🎯 Matched by ID:",
        vendor.categoryId,
        "→",
        category?.name,
      );
    }

    // Fallback: try to match by name if no ID match
    if (!category) {
      category = categories.find(
        (cat) =>
          cat.name.toLowerCase() === vendor.specialty.toLowerCase() ||
          vendor.specialty
            .toLowerCase()
            .includes(cat.name.toLowerCase()),
      );
      console.log(
        "🔤 Matched by name:",
        vendor.specialty,
        "→",
        category?.name,
      );
    }

    console.log(
      "✅ Final category:",
      category
        ? {
            id: category.id,
            name: category.name,
            iconSrc: category.icon?.src,
            hasIconObject: !!category.icon,
            iconObject: category.icon,
          }
        : "NO MATCH",
    );

    return category?.icon?.src;
  };

  // Convert vendors to map markers
  const mapMarkers = vendorsWithLocation.map((vendor, idx) => ({
    id: vendor.id,
    name: vendor.name,
    lat: parseFloat(vendor.latitude!),
    lng: parseFloat(vendor.longitude!),
    specialty: vendor.specialty,
    categoryIcon: getCategoryIcon(vendor),
    rating: vendor.rating,
    location: vendor.location,
  }));

  console.log(
    "🗺️ Map markers with icon status:",
    mapMarkers.map((m) => ({
      name: m.name,
      specialty: m.specialty,
      hasIcon: !!m.categoryIcon,
      iconUrl: m.categoryIcon,
    })),
  );

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
      <div className="aspect-square">
        <LeafletMap
          markers={mapMarkers}
          onMarkerClick={onVendorSelect}
          onVendorSelect={onVendorSelect}
          selectedVendorId={selectedVendorId}
        />
      </div>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Showing {vendorsWithLocation.length} location
            {vendorsWithLocation.length !== 1 ? "s" : ""} on map
          </span>
          <div className="flex items-center gap-1 text-gray-400">
            <MapPin className="w-4 h-4" />
            <span className="text-xs">
              Click pins to filter results
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}