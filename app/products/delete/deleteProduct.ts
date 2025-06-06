'use server';
import prisma from "../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteProduct(id: string) {
    "use server";
    await prisma.product.delete({
        where: {
            id: parseInt(id),
        },
    });
    revalidatePath("/");
    redirect("/");
}