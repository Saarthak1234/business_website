// app/ClientWrapper.tsx (Client Component)
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductCard from "../../components/ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  // Add other product properties as needed based on your Prisma schema
}

interface ClientWrapperProps {
  products: Product[];
}

export default function ClientWrapper({ products }: ClientWrapperProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setLogoutError(null);
    
    try {
      // Call your existing logout API endpoint
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies if using cookie-based auth
      });

      if (response.ok) {
        // Optional: Clear any client-side storage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          sessionStorage.clear();
        }
        
        // Redirect to login page or home page
        router.push('/');
        // Alternative: router.replace('/login') to prevent going back
      } else {
        const errorData = await response.json();
        setLogoutError(errorData.message || 'Logout failed');
        setIsLoggingOut(false);
      }
    } catch (error) {
      console.error('Logout error:', error);
      setLogoutError('Network error during logout');
      setIsLoggingOut(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with logout button */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome to SuperMarket
          </h1>
          
          <div className="flex flex-col items-end">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              {isLoggingOut ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Logging out...
                </>
              ) : (
                'Logout'
              )}
            </button>
            
            {/* Error message */}
            {logoutError && (
              <p className="text-red-600 text-sm mt-2">{logoutError}</p>
            )}
          </div>
        </div>

        {/* Products grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: "both",
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products available</p>
          </div>
        )}
      </div>
    </main>
  );
}