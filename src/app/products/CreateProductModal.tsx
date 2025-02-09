import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import Header from "@/app/(components)/Header/Header";
import { CircleLoader } from "react-spinners";

type ProductFormData = {
  name: string;
  price: number;
  rating: number;
  stockQuantity: number;
};

type CreateProductModalProps = {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
};

const CreateProductModal: React.FC<CreateProductModalProps> = ({
  isOpen,
  onClose,
  isLoading,
  onCreate,
}) => {
  const [formData, setFormData] = useState({
    productId: uuid(),
    name: "",
    price: 0,
    rating: 0,
    stockQuantity: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stockQuantity" || name === "rating"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Create New Product" />
        <form onSubmit={handleSubmit} className="mt-5">
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            className="block w-full p-2 mb-2 border-2 border-gray-500  rounded-md"
          />

          <label
            htmlFor="ProductPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Product Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Product Price"
            onChange={handleChange}
            value={formData.price}
            className="block w-full p-2 mb-2 border-2 border-gray-500  rounded-md"
          />

          <label
            htmlFor="stockQuantity"
            className="block text-sm font-medium text-gray-700"
          >
            Stock Quantity
          </label>
          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            onChange={handleChange}
            value={formData.stockQuantity}
            className="block w-full p-2 mb-2 border-2 border-gray-500  rounded-md"
          />

          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700"
          >
            Rating
          </label>
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            onChange={handleChange}
            value={formData.rating}
            className="block w-full p-2 mb-2 border-2 border-gray-500  rounded-md"
          />
          <button
            type="submit"
            className="px-4 mt-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Create
            <CircleLoader size={24} loading={isLoading} />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            Cancel
            <CircleLoader size={24} loading={isLoading} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
