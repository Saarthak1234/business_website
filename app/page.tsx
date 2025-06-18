import prisma from '../lib/prisma'

export default async function Home() {
  const Products = await prisma.product.findMany();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Welcome to SuperMarket
      </h1>
    </div>
  );
}