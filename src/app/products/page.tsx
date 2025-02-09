"use client";

import { useCreateProductMutation, useGetProductsQuery } from "@/state/api";
import React, { useState } from "react";
import LoadingModal from "@/app/(components)/LoadingModal";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import Header from "@/app/(components)/Header/Header";
import Rating from "@/app/(components)/Rating/Rating";
import CreateProductModal from "./CreateProductModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ProductFormDataProps = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

const Products = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    data: products,
    isError,
    isLoading,
  } = useGetProductsQuery(searchValue);

  const [createProduct] = useCreateProductMutation();

  const handleCreateProduct = async (productData: ProductFormDataProps) => {
    try {
      await createProduct(productData).unwrap();
      toast.success("Product Created Successfully!", {
        position: "top-center",
      });
    } catch (error: any) {
      toast.error(`Error: ${error.message || "Failed to create product"}`, {
        position: "top-center",
      });
    }
  };

  if (isLoading) {
    return <LoadingModal />;
  }
  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch Products
      </div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full">
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Search Products..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" /> Create
          Product
        </button>
      </div>

      {/* Body Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <LoadingModal />
        ) : (
          products?.map((product) => (
            <div
              key={product.productId}
              className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
            >
              <div className="flex flex-col items-center">
                img
                <h3 className="text-lg text-gray-900 font-semibold">
                  {product.name}
                </h3>
                <p className="text-gray-800">${product.price.toFixed(2)}</p>
                <div className="text-sm text-gray-600 mt-1">
                  Stock: {product.stockQuantity}
                </div>
                {product.rating && (
                  <div className="flex items-center mt-2">
                    <Rating rating={product.rating} />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}

      <CreateProductModal
        isOpen={isModalOpen}
        isLoading={isLoading}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;
