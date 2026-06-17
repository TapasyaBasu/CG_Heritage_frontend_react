import { useState } from "react";
import sneakersImg from "../assets/sneakers.png";
import jacketImg from "../assets/jacket.png";
import bagImg from "../assets/bag.png";
import sunglassesImg from "../assets/sunglasses.png";
import watchImg from "../assets/watch.png";
import headphonesImg from "../assets/headphones.png";
import tshirtImg from "../assets/product3.svg";
import backpackImg from "../assets/product4.svg";

const products = [
  { id: 1, title: "Classic Sneakers", price: 59, image: sneakersImg, category: "Footwear", rating: 4.8, tag: "Trending" },
  { id: 2, title: "Denim Jacket", price: 89, image: jacketImg, category: "Apparel", rating: 4.6, tag: "Best Seller" },
  { id: 3, title: "Leather Bag", price: 129, image: bagImg, category: "Accessories", rating: 4.9, tag: "New" },
  { id: 4, title: "Sunglasses", price: 29, image: sunglassesImg, category: "Accessories", rating: 4.5 },
  { id: 5, title: "Luxury Watch", price: 199, image: watchImg, category: "Wearables", rating: 4.9, tag: "Limited" },
  { id: 6, title: "Premium Headphones", price: 79, image: headphonesImg, category: "Wearables", rating: 4.7 },
  { id: 7, title: "Essential T-Shirt", price: 19, image: tshirtImg, category: "Apparel", rating: 4.4 },
  { id: 8, title: "Travel Backpack", price: 49, image: backpackImg, category: "Accessories", rating: 4.8 },
];

const categories = ["All", "Footwear", "Apparel", "Accessories", "Wearables"];

export default function ProductGrid({ 
  addToCart, 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  sortBy, 
  setSortBy 
}) {
  const [hoveredCardId, setHoveredCardId] = useState(null);

  // Filter & Sort Logic
  const filteredProducts = products
    .filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // Default sorting by ID
    });

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("default");
  };

  return (
    <section id="products" className="max-w-7xl mx-auto px-6 lg:px-8 py-16 scroll-mt-20">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-amber-700">Curated Curation</span>
          <h2 className="text-3xl font-bold font-serif text-[#1A1A1A] mt-1.5">Shop Our Popular Items</h2>
        </div>
        <p className="text-sm text-[#7A7A7A] max-w-sm">
          A careful selection of high-quality essentials designed to elevate your everyday routines.
        </p>
      </div>

      {/* Control Toolbar: Search, Category Pills, Sort Selection */}
      <div className="bg-white rounded-2xl p-4 md:p-5 border border-[#EADED2]/30 shadow-sm mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none -mx-4 px-4 lg:mx-0 lg:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-200 whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-[#1A1A1A] text-white shadow-sm"
                  : "bg-[#FAF9F6] text-[#4A4A4A] hover:bg-[#EADED2]/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sort Panel */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Search Box */}
          <div className="relative flex-grow sm:w-64">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-8 py-2 rounded-xl border border-[#EADED2] bg-[#FAF9F6] text-sm focus:outline-none focus:ring-1 focus:ring-[#B45309] focus:border-[#B45309] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-black"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Selection */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none w-full sm:w-48 pl-4 pr-10 py-2 rounded-xl border border-[#EADED2] bg-[#FAF9F6] text-sm focus:outline-none focus:ring-1 focus:ring-[#B45309] focus:border-[#B45309] transition-all font-medium text-[#4A4A4A] cursor-pointer"
              aria-label="Sort products"
            >
              <option value="default">Sort: Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>

      </div>

      {/* Product Count / Summary */}
      <div className="flex justify-between items-center mb-6 text-xs text-[#7A7A7A] uppercase tracking-wider font-semibold">
        <span>Showing {filteredProducts.length} of {products.length} Products</span>
        {selectedCategory !== "All" && (
          <span className="text-amber-800">Filtered by: {selectedCategory}</span>
        )}
      </div>

      {/* Grid List */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#EADED2]/30 p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-12 h-12 rounded-full bg-[#FAF9F6] flex items-center justify-center text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold font-serif text-[#1A1A1A]">No items found</h3>
          <p className="text-sm text-gray-500 mt-1.5 max-w-xs">We couldn't find any products matching your current filters. Try resetting them.</p>
          <button
            onClick={handleResetFilters}
            className="mt-6 bg-[#1A1A1A] hover:bg-[#B45309] text-white text-xs font-semibold tracking-wider uppercase px-5 py-3 rounded-lg transition-colors duration-300"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#EADED2]/30 hover:border-amber-700/20 hover:shadow-xl transition-all duration-300 group flex flex-col relative"
              onMouseEnter={() => setHoveredCardId(p.id)}
              onMouseLeave={() => setHoveredCardId(null)}
            >
              
              {/* Product Badge Labels */}
              {p.tag && (
                <span className="absolute top-3.5 left-3.5 bg-[#1A1A1A] text-white text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full z-10 shadow-sm">
                  {p.tag}
                </span>
              )}

              {/* Rating badge */}
              <div className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full border border-gray-100 flex items-center gap-1 z-10 shadow-sm text-[10px] font-bold text-[#1A1A1A]">
                <span className="text-amber-500 font-sans">★</span>
                <span>{p.rating}</span>
              </div>

              {/* Image Frame */}
              <div className="h-56 bg-[#FAF9F6] flex items-center justify-center p-6 relative overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full max-h-[160px] object-contain transition-transform duration-500 group-hover:scale-108"
                />
              </div>

              {/* Card Details */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-amber-700 font-bold mb-1">
                    {p.category}
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#1A1A1A] group-hover:text-[#B45309] transition-colors duration-300 line-clamp-1">
                    {p.title}
                  </h3>
                  <div className="mt-1.5 text-sm font-semibold text-[#4A4A4A]">${p.price}</div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  {/* Action Buy Button */}
                  <button
                    onClick={() => addToCart(p)}
                    className="flex-grow bg-[#1A1A1A] hover:bg-[#B45309] text-white px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add
                  </button>

                  {/* View details */}
                  <button
                    onClick={() => alert(`Reviewing details for "${p.title}"`)}
                    className="text-xs font-semibold text-gray-400 hover:text-black transition-colors px-2 py-1"
                  >
                    View
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </section>
  );
}
