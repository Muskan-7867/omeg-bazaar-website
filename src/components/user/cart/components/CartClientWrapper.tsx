"use client";
import { useEffect, useState } from "react";


interface CartClientWrapperProps {
  children: React.ReactNode;
}

const CartClientWrapper = ({ children }: CartClientWrapperProps) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        {/* You can add a loading spinner here */}
      </div>
    );
  }

  return <>{children}</>;
};

export default CartClientWrapper;