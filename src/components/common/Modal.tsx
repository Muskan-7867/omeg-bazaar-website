import React from "react";

const Modal = ({
  children,
  isOpen,
  onClose
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl">
      <div className="bg-gray-100 max-w-[40rem] w-full p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
