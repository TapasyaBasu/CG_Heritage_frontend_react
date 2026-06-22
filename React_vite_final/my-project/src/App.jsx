import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import ProductGrid from "./Components/ProductGrid";
import Footer from "./Components/Footer";
import FormDemo from "./FormDemo";

function App() {
  const [currentView, setCurrentView] = useState("ecommerce"); // 'ecommerce' or 'forms'

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

  const TogglerButton = () => (
    <div className="fixed bottom-6 left-6 z-[9999]">
      <button
        onClick={() => setCurrentView(currentView === "ecommerce" ? "forms" : "ecommerce")}
        className="px-5 py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold rounded-2xl shadow-2xl shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer border border-indigo-400/30"
      >
        {currentView === "ecommerce" ? "📋 View Form Tasks" : "🛒 Back to E-Commerce"}
      </button>
    </div>
  );

  if (currentView === "forms") {
    return (
      <>
        <FormDemo />
        <TogglerButton />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] relative">
      <Navbar
        cart={cart}
        cartCount={totalItems}
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />

      <main className="flex-1">
        <Hero />
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

      <Footer />

      {toast.show && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#1A1A1A] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-white/10 animate-slide-in-right">
          <div className={`w-2 h-2 rounded-full ${toast.type === 'success' ? 'bg-amber-500' : 'bg-red-400'}`}></div>
          <p className="text-sm font-medium">{toast.message}</p>
          <button 
            onClick={() => setToast((prev) => ({ ...prev, show: false }))} 
            className="ml-2 text-white/50 hover:text-white transition text-xs cursor-pointer"
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      )}

      <TogglerButton />
    </div>
  );
}

export default App;