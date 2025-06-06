import { PrismaClient, Prisma } from "../app/generated/prisma";

const prisma = new PrismaClient();

const productData: Prisma.ProductCreateInput[] = [
    {
        name:"Product 1",
        description: "Description for Product 1",
        price: 100.5,
        imageUrl: "https://example.com/product1.jpg",
    }
]

export async function main(){
    for (const product of productData) {
        await prisma.product.create({
            data: product,
        })
    }
}

main();
