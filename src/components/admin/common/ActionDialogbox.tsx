
import React, { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { useSingleOrderStore, useSingleProductStore } from "@/lib/store/product/Table.store";
import { deleteOrder, deleteProduct } from "@/lib/services/api/fetchers";

interface DialogBoxProps<T extends { _id: string }> {
  onDeleteSuccess?: () => void;
  onEditSuccess?: () => void;
  setOpenDialog: React.Dispatch<React.SetStateAction<number | null>>;
  row: T;
}

function DialogBox<T extends { _id: string }>({ 
  onDeleteSuccess, 
  setOpenDialog, 
  row 
}: DialogBoxProps<T>) {
  const { setShowSingleProduct } = useSingleProductStore();
  const { setShowSingleOrder } = useSingleOrderStore();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useRouter();
  const route = window.location.pathname;

  const handleViewClick = () => {
    setShowSingleProduct(true);
    setShowSingleOrder(true);
  };

  const handleEdit = () => {
    navigate.push(`/admin/products/edit/${row._id}`);
  };

  const handleDelete = async () => {
    try {
      if (route === "/admin/products") {
        await deleteProduct(row._id);
        queryClient.invalidateQueries({ queryKey: ["filteredproducts"] });
      } else if (route === "/admin/order") {
        await deleteOrder(row._id); // Using the row prop's _id instead of selectedRow
        queryClient.invalidateQueries({ queryKey: ["orders"] });
      }
      setMessage("Deleted successfully.");
      setError(null);
      setOpenDialog(null);
      if (onDeleteSuccess) onDeleteSuccess();
    } catch (err) {
      console.error("Failed to delete", err);
      setError(`Failed to delete: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setMessage(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-[10rem] ms-auto mr-6">
        <ul className="divide-y text-black">
          <li
            className="px-4 py-4 hover:bg-gray-200 cursor-pointer"
            onClick={handleViewClick}
          >
            View
          </li>
          {route === "/admin/products" && (
            <li
              className="px-4 py-4 hover:bg-gray-200 cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </li>
          )}
          <li
            className="px-4 py-4 hover:bg-gray-200 cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </li>
        </ul>
      </div>
      {message && <p className="mt-2 text-green-600 text-sm">{message}</p>}
      {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
    </div>
  );
}

export default DialogBox;