import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#1A1A1A] text-[#FAF9F6] pt-16 pb-8 border-t border-[#FAF9F6]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 pb-12">
        
        {/* Brand Information Column */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#B45309] flex items-center justify-center text-white font-bold text-sm">
              S
            </div>
            <span className="text-xl font-bold font-serif tracking-tight text-white">ShopEase</span>
          </div>
          <p className="text-xs text-[#C4C2BC] max-w-sm leading-relaxed">
            Your premier destination for curated lifestyle goods. We focus on clean silhouettes, sustainable sourcing, and lasting craftsmanship.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-3 mt-2">
            <a 
              href="#" 
              className="w-8 h-8 rounded-full border border-white/10 hover:border-[#B45309] hover:bg-[#B45309]/10 flex items-center justify-center text-[#C4C2BC] hover:text-white transition-all duration-300"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </a>
            <a 
              href="#" 
              className="w-8 h-8 rounded-full border border-white/10 hover:border-[#B45309] hover:bg-[#B45309]/10 flex items-center justify-center text-[#C4C2BC] hover:text-white transition-all duration-300"
              aria-label="Twitter"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a 
              href="#" 
              className="w-8 h-8 rounded-full border border-white/10 hover:border-[#B45309] hover:bg-[#B45309]/10 flex items-center justify-center text-[#C4C2BC] hover:text-white transition-all duration-300"
              aria-label="Pinterest"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </a>
          </div>
        </div>

        {/* Collections Directory Column */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-white font-sans">Collections</h4>
          <ul className="text-xs text-[#C4C2BC] space-y-2 mt-1">
            <li><a href="#products" className="hover:text-amber-500 transition-colors">All Products</a></li>
            <li><a href="#products" className="hover:text-amber-500 transition-colors">Apparel & Coats</a></li>
            <li><a href="#products" className="hover:text-amber-500 transition-colors">Leather Accessories</a></li>
            <li><a href="#products" className="hover:text-amber-500 transition-colors">Everyday Wearables</a></li>
          </ul>
        </div>

        {/* Help Directory Column */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-white font-sans">Customer Care</h4>
          <ul className="text-xs text-[#C4C2BC] space-y-2 mt-1">
            <li><a href="#" className="hover:text-amber-500 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-amber-500 transition-colors">Shipping & Delivery</a></li>
            <li><a href="#" className="hover:text-amber-500 transition-colors">Returns & Exchanges</a></li>
            <li><a href="#" className="hover:text-amber-500 transition-colors">Product Care & Sizing</a></li>
          </ul>
        </div>

        {/* Newsletter Signup Column */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-white font-sans">Stay Curated</h4>
          <p className="text-xs text-[#C4C2BC] leading-relaxed">
            Subscribe to our seasonal journal for new product updates, styling advice, and early arrivals access.
          </p>

          {isSubscribed ? (
            <div className="bg-amber-900/40 border border-amber-800/40 rounded-xl p-3.5 mt-2 animate-fade-in">
              <p className="text-xs text-amber-300 font-medium leading-relaxed">
                Thank you for subscribing! Keep an eye on your inbox for our next curated brief.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 mt-2 w-full">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#B45309] focus:border-[#B45309] flex-grow transition-all"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="bg-white hover:bg-amber-500 hover:text-white text-[#1A1A1A] font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all duration-300 shadow-sm"
              >
                Join
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Copyright & Pay Partners Footer */}
      <div className="mt-8 pt-8 border-t border-white/5 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-[11px] text-[#7A7A7A] tracking-wider uppercase">
          © {new Date().getFullYear()} ShopEase. Crafted for modern lifestyle and clean spaces.
        </div>
        
        {/* Payment symbols */}
        <div className="flex items-center gap-3.5 opacity-40 hover:opacity-75 transition-opacity duration-300">
          <span className="text-[10px] tracking-widest font-bold font-sans">AMEX</span>
          <span className="text-[10px] tracking-widest font-bold font-sans">VISA</span>
          <span className="text-[10px] tracking-widest font-bold font-sans">MASTERCARD</span>
          <span className="text-[10px] tracking-widest font-bold font-sans">APPLE PAY</span>
        </div>
      </div>
    </footer>
  );
}
