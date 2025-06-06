import Form from 'next/form';
import prisma from '../../../lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default async function NewProduct() {
    async function createProduct(formData: FormData) {
        "use server";

        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const price = formData.get("price") as string;
        const imageUrl = formData.get("imageUrl") as string;

        await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                imageUrl,
            },
        });

        revalidatePath("/");
        redirect("/");
    }

    return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <Form action={createProduct} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-lg mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your product name..."
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Write your product description..."
            rows={6}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-lg mb-2">
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            placeholder="Enter your product's price..."
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-lg mb-2">
            Upload Image
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            placeholder="Enter your image URL"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
        >
          Create Product
        </button>
      </Form>
    </div>
  );
}
