import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import ProductGrid from "./Components/ProductGrid";
import Footer from "./Components/Footer";

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  
  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Auto-dismiss toast
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // Cart action handlers
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    // Trigger toast
    setToast({
      show: true,
      message: `Added "${product.title}" to your cart.`,
      type: "success",
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    const item = cart.find((i) => i.id === id);
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    if (item) {
      setToast({
        show: true,
        message: `Removed "${item.title}" from your cart.`,
        type: "info",
      });
    }
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      {/* Navigation bar with shopping cart drawer capabilities */}
      <Navbar
        cart={cart}
        cartCount={totalItems}
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />

      <main className="flex-1">
        {/* Hero Banner Showcase */}
        <Hero />

        {/* Interactive Product Grid & Filtering Toolbar */}
        <ProductGrid
          addToCart={addToCart}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </main>

      {/* Styled Brand Footer */}
      <Footer />

      {/* Elegant Toast Notifications */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#1A1A1A] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-white/10 animate-slide-in-right">
          <div className={`w-2 h-2 rounded-full ${toast.type === 'success' ? 'bg-amber-500' : 'bg-red-400'}`}></div>
          <p className="text-sm font-medium">{toast.message}</p>
          <button 
            onClick={() => setToast((prev) => ({ ...prev, show: false }))} 
            className="ml-2 text-white/50 hover:text-white transition text-xs"
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default App;