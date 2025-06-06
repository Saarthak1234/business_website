"use client";

import { useState } from "react";
import { deleteProduct } from "./deleteProduct";

export default function DeleteProduct() {
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!id.trim()) {
      alert("Please enter a product ID");
      return;
    }

    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    setIsLoading(true);
    
    try {
      await deleteProduct(id);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Delete Product</h1>
      
      <div className="mb-4">
        <label htmlFor="productId" className="block text-sm font-medium mb-2">
          Product ID
        </label>
        <input
          id="productId"
          type="text"
          placeholder="Enter product ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          disabled={isLoading}
        />
      </div>
      
      <button
        onClick={handleDelete}
        disabled={isLoading || !id.trim()}
        className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors"
      >
        {isLoading ? "Deleting..." : "Delete Product"}
      </button>
    </div>
  );
}