import { useState, useEffect } from "react";
import heroImg from "../assets/hero.png";

const slides = [
  {
    id: 1,
    tag: "LIFESTYLE ESSENTIALS",
    title: "The Summer Collection",
    subtitle: "Up to 50% off curated goods designed for modern utility and clean aesthetics.",
    ctaPrimary: "Shop the Sale",
    ctaSecondary: "View Lookbook",
    bgClass: "from-[#FDFBF7] via-[#F5EBE0] to-[#E3D5CA]",
    accentColor: "text-amber-800",
    badgeColor: "bg-amber-100 text-amber-800",
    image: heroImg,
  },
  {
    id: 2,
    tag: "JUST RELEASED",
    title: "Elevated New Arrivals",
    subtitle: "Explore our latest curation of premium products focusing on minimalist design.",
    ctaPrimary: "Explore Now",
    ctaSecondary: "Read Journal",
    bgClass: "from-[#F7F9FA] via-[#EAEFF2] to-[#D5E1E8]",
    accentColor: "text-blue-800",
    badgeColor: "bg-blue-100 text-blue-800",
    image: heroImg,
  },
  {
    id: 3,
    tag: "COMPLIMENTARY SHIPPING",
    title: "Timeless Quality, Delivered",
    subtitle: "Enjoy free standard shipping worldwide on all orders exceeding $150.",
    ctaPrimary: "Browse Shop",
    ctaSecondary: "Shipping Details",
    bgClass: "from-[#FAF9F5] via-[#EFEFEA] to-[#DFDFD3]",
    accentColor: "text-emerald-800",
    badgeColor: "bg-emerald-100 text-emerald-800",
    image: heroImg,
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIndex((i) => (i - 1 + slides.length) % slides.length);
      setIsAnimating(false);
    }, 300);
  };

  const selectSlide = (i) => {
    if (i === index) return;
    setIsAnimating(true);
    setTimeout(() => {
      setIndex(i);
      setIsAnimating(false);
    }, 300);
  };

  const slide = slides[index];

  return (
    <section className="relative overflow-hidden border-b border-[#EADED2]/30">
      {/* Background slide wrapper */}
      <div className={`w-full min-h-[460px] md:min-h-[580px] bg-gradient-to-br ${slide.bgClass} transition-all duration-700 flex items-center py-12 md:py-0`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-center">
            
            {/* Left Column: Hero Text Content */}
            <div className={`col-span-1 md:col-span-7 flex flex-col justify-center transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              <div className="inline-flex items-center">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase ${slide.badgeColor} shadow-sm`}>
                  {slide.tag}
                </span>
              </div>
              
              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1A1A1A] font-serif leading-[1.1]">
                {slide.title}
              </h1>
              
              <p className="mt-4 text-base sm:text-lg text-[#4A4A4A] max-w-xl leading-relaxed font-sans">
                {slide.subtitle}
              </p>
              
              <div className="mt-8 flex flex-wrap gap-3.5">
                <a
                  href="#products"
                  className="bg-[#1A1A1A] hover:bg-[#B45309] text-white font-semibold text-sm tracking-wider uppercase px-7 py-3.5 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg active:scale-98"
                >
                  {slide.ctaPrimary}
                </a>
                <a
                  href="#products"
                  className="border border-[#1A1A1A]/20 hover:border-[#1A1A1A] text-[#1A1A1A] font-semibold text-sm tracking-wider uppercase px-7 py-3.5 rounded-xl transition-colors duration-300 bg-transparent hover:bg-white/40"
                >
                  {slide.ctaSecondary}
                </a>
              </div>
            </div>

            {/* Right Column: Premium Mockup/Art frame */}
            <div className={`col-span-1 md:col-span-5 flex justify-center items-center transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              <div className="relative w-full max-w-[340px] aspect-[4/5] md:aspect-[3/4] bg-white/40 backdrop-blur-md rounded-2xl p-4 border border-white/60 shadow-xl flex items-center justify-center group overflow-hidden">
                {/* Decorative glowing gradient blur */}
                <div className="absolute -inset-10 bg-gradient-to-tr from-amber-400/20 via-rose-300/10 to-blue-400/10 rounded-full blur-2xl group-hover:scale-105 transition-transform duration-700"></div>

                <div className="relative w-full h-full bg-white/70 rounded-xl border border-white/80 shadow-inner overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                  <div className="absolute top-4 left-4 bg-[#1A1A1A] text-white text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full">
                    ShopEase Curated
                  </div>
                  
                  {/* Image container with scale overlay */}
                  <div className="relative w-full flex-1 flex items-center justify-center mt-6">
                    <img 
                      src={slide.image} 
                      alt="Featured Collection" 
                      className="max-h-[220px] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        // Safe fallback icon if hero.png is not found or empty
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    {/* SVG fallback for missing assets */}
                    <div className="hidden w-28 h-28 rounded-full bg-gradient-to-tr from-amber-100 to-amber-50 items-center justify-center text-amber-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-4 w-full">
                    <div className="text-xs uppercase tracking-widest font-bold text-amber-700">Premium Materials</div>
                    <div className="text-sm font-semibold text-[#1A1A1A] mt-1 font-serif">Handcrafted Excellence</div>
                    <div className="mt-2 text-xs text-[#7A7A7A] line-clamp-2">Each item is sourced responsibly, focusing on longevity and classic silhouettes.</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Slide Navigation Arrows (Desktop) */}
      <button
        onClick={handlePrev}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/60 hover:bg-white text-[#1A1A1A] border border-white/80 shadow-md hover:shadow-lg rounded-full items-center justify-center transition-all z-10"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={handleNext}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/60 hover:bg-white text-[#1A1A1A] border border-white/80 shadow-md hover:shadow-lg rounded-full items-center justify-center transition-all z-10"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => selectSlide(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-[#B45309]' : 'w-2.5 bg-black/15 hover:bg-black/30'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
