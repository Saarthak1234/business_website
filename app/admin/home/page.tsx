// app/page.tsx (Server Component)
import prisma from '../../../lib/prisma';
import ClientWrapper from './ClientWrapper';



// Helper function to validate URLs
function isValidUrl(string: string) {
  if (!string) return false;
  if (string.startsWith('/')) return true;
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

export default async function Home() {
  // Server-side data fetching with Prisma
  const rawProducts = await prisma.product.findMany();
  
  // Clean up products with invalid image URLs
  const products = rawProducts.map(product => ({
    ...product,
    id: product.id.toString(), // Ensure id is a string
    name: product.name || 'Unnamed Product',
    price: product.price || 0,
    description: product.description || 'No description available',
    imageUrl: isValidUrl(product.imageUrl) ? product.imageUrl : '/default-image.png', // Fallback image URL
  }));
  
  // Pass the fetched data to the client component
  return <ClientWrapper products={products} />;
}