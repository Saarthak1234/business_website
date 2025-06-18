import prisma from '../../../lib/prisma';
import ProductCard from "../../components/ProductCard";

// Helper function to validate URLs
function isValidUrl(string) {
  if (!string) return false;
  if (string.startsWith('/')) return true; // Local paths are valid
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

export default async function Home() {
  const rawProducts = await prisma.product.findMany();
  
  // Clean up products with invalid image URLs
  const Products = rawProducts.map(product => ({
    ...product,
    image: isValidUrl(product.imageUrl) ? product.imageUrl : null
  }));
  
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Welcome to SuperMarket
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Products.map((product, index) => (
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
      </div>
    </main>
  );
}