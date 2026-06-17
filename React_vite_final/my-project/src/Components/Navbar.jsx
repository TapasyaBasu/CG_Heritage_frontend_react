import { useState } from "react";

function Navbar({ cart, cartCount, isOpen, setIsOpen, updateQuantity, removeFromCart }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Cart calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingThreshold = 150;
  const shippingCost = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 15;
  const total = subtotal + shippingCost;

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#EADED2]/30 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo Brand */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-full bg-[#B45309] flex items-center justify-center text-white font-bold text-base transition-transform group-hover:scale-105">
                S
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-[#1A1A1A] font-serif">ShopEase</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-amber-700/80 -mt-1">Curated Goods</span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm font-medium text-[#4A4A4A] hover:text-[#B45309] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#B45309] hover:after:w-full after:transition-all after:duration-350">
                Home
              </a>
              <a href="#products" className="text-sm font-medium text-[#4A4A4A] hover:text-[#B45309] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#B45309] hover:after:w-full after:transition-all after:duration-350">
                Shop
              </a>
              <a href="#" className="text-sm font-medium text-[#4A4A4A] hover:text-[#B45309] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#B45309] hover:after:w-full after:transition-all after:duration-350">
                Categories
              </a>
              <a href="#" className="text-sm font-medium text-[#4A4A4A] hover:text-[#B45309] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#B45309] hover:after:w-full after:transition-all after:duration-350">
                Journal
              </a>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-4">
              {/* Shopping Cart Trigger */}
              <button 
                onClick={() => setIsOpen(true)}
                className="relative p-2.5 text-[#1A1A1A] hover:text-[#B45309] transition-colors rounded-full hover:bg-[#FAF9F6]"
                aria-label="Open cart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#B45309] text-[10px] font-bold text-white w-5 h-5 rounded-full flex items-center justify-center animate-bounce-short">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu trigger */}
              <button
                className="md:hidden p-2 text-[#1A1A1A] hover:text-[#B45309] transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-[#EADED2]/30 px-6 py-4 flex flex-col gap-4 animate-fade-in">
            <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-[#1A1A1A] hover:text-[#B45309]">
              Home
            </a>
            <a href="#products" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-[#1A1A1A] hover:text-[#B45309]">
              Shop
            </a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-[#1A1A1A] hover:text-[#B45309]">
              Categories
            </a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-[#1A1A1A] hover:text-[#B45309]">
              Journal
            </a>
          </div>
        )}
      </nav>

      {/* Cart Drawer Slide-out Container */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 overflow-hidden">
            {/* Backdrop filter */}
            <div 
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#1A1A1A]/40 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
            ></div>

            {/* Sliding Panel */}
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right border-l border-[#EADED2]/30">
                
                {/* Drawer Header */}
                <div className="px-6 py-5 border-b border-[#EADED2]/30 flex items-center justify-between bg-[#FAF9F6]">
                  <h2 className="text-lg font-bold text-[#1A1A1A] font-serif flex items-center gap-2">
                    Shopping Cart
                    <span className="text-xs font-sans font-normal px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      {cartCount} {cartCount === 1 ? 'item' : 'items'}
                    </span>
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 hover:text-black transition-colors"
                    aria-label="Close cart drawer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Drawer Body */}
                <div className="flex-1 py-6 overflow-y-auto px-6">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col justify-center items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-[#FAF9F6] flex items-center justify-center mb-4 text-[#C4C2BC]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                      <h3 className="text-base font-semibold text-[#1A1A1A] font-serif">Your cart is empty</h3>
                      <p className="mt-1.5 text-sm text-[#7A7A7A] max-w-[240px]">Explore our collection and discover curated items for your modern life.</p>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="mt-6 bg-[#B45309] hover:bg-[#92400e] text-white text-xs font-semibold tracking-wider uppercase px-5 py-3 rounded-lg transition-all"
                      >
                        Start Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {cart.map((item) => (
                        <div key={item.id} className="flex py-2 border-b border-[#FAF9F6] last:border-0">
                          {/* Image container */}
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 border border-[#EADED2]/30 flex items-center justify-center p-1">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="h-full w-full object-contain"
                            />
                          </div>

                          {/* Details */}
                          <div className="ml-4 flex-1 flex flex-col">
                            <div>
                              <div className="flex justify-between text-sm font-semibold text-[#1A1A1A] font-serif">
                                <h3>{item.title}</h3>
                                <p className="ml-4">${item.price * item.quantity}</p>
                              </div>
                              <p className="mt-1 text-xs text-gray-500">${item.price} each</p>
                            </div>
                            
                            <div className="flex-1 flex items-end justify-between text-sm">
                              {/* Quantity adjustments */}
                              <div className="flex items-center border border-[#EADED2] rounded-lg overflow-hidden h-8">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="px-2.5 text-gray-500 hover:bg-[#FAF9F6] hover:text-black transition-colors"
                                >
                                  -
                                </button>
                                <span className="px-2 text-xs font-medium w-6 text-center text-[#1A1A1A]">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="px-2.5 text-gray-500 hover:bg-[#FAF9F6] hover:text-black transition-colors"
                                >
                                  +
                                </button>
                              </div>

                              {/* Remove button */}
                              <div className="flex">
                                <button
                                  type="button"
                                  onClick={() => removeFromCart(item.id)}
                                  className="font-medium text-[#B45309] hover:text-[#92400e] text-xs transition-colors flex items-center gap-1"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Drawer Footer */}
                {cart.length > 0 && (
                  <div className="border-t border-[#EADED2]/30 px-6 py-6 bg-[#FAF9F6]">
                    {/* Free shipping banner */}
                    {subtotal < shippingThreshold ? (
                      <div className="mb-4 text-xs text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200/50 flex justify-between">
                        <span>Spend <strong>${shippingThreshold - subtotal}</strong> more for free shipping!</span>
                        <span className="font-bold font-serif">${subtotal}/${shippingThreshold}</span>
                      </div>
                    ) : (
                      <div className="mb-4 text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200/50 flex items-center gap-1.5 font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Congrats! You qualify for Free Shipping.
                      </div>
                    )}

                    <div className="space-y-2.5">
                      <div className="flex justify-between text-sm text-[#4A4A4A]">
                        <p>Subtotal</p>
                        <p className="font-semibold text-[#1A1A1A] font-serif">${subtotal}</p>
                      </div>
                      <div className="flex justify-between text-sm text-[#4A4A4A]">
                        <p>Shipping</p>
                        <p className="font-semibold text-[#1A1A1A] font-serif">
                          {shippingCost === 0 ? (
                            <span className="text-emerald-600 uppercase text-xs font-bold font-sans">Free</span>
                          ) : (
                            `$${shippingCost}`
                          )}
                        </p>
                      </div>
                      <div className="border-t border-[#EADED2]/40 my-3"></div>
                      <div className="flex justify-between text-base font-bold text-[#1A1A1A] font-serif">
                        <p>Total Estimated</p>
                        <p>${total}</p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <button
                        onClick={() => alert("Checkout flow is a demo simulation.")}
                        className="w-full bg-[#1A1A1A] hover:bg-[#3A3A3A] text-white text-sm font-semibold tracking-wider uppercase py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                      >
                        Proceed to Checkout
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                        SECURE PAYMENTS · 30-DAY EASY RETURNS
                      </p>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;