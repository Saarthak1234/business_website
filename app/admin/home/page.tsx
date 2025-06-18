import prisma from '../../../lib/prisma';

export default async function Home() {
  const Products = await prisma.product.findMany();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Welcome to SuperMarket
      </h1>
      <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
        {Products.map((product) => (
          <li key={product.id} className="mb-4">
            <h2 className="text-2xl font-semibold text-[#333333]">{product.name}</h2>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-lg font-bold text-[#0070f3]">${product.price.toFixed(2)}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}