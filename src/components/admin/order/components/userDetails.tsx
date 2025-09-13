import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { AddressFormData } from "@/lib/types/auth";
import { getClientQuery } from "@/lib/services/api/queries";

interface UserData {
  order: {
    client: {
      username: string;
      email: string;
      contact: string;
    };
    address: {
      address: AddressFormData;
      address1?: string;
      street: string;
      city: string;
      state: string;
      country: string;
      pincode: string;
    };
  };
}

interface UserDetailsProps {
  orderId: string;
  showUserDetails: boolean;
}

const UserDetails = ({ orderId, showUserDetails }: UserDetailsProps) => {
  const { data: userData, isLoading, error } = useQuery<UserData>(getClientQuery(orderId));

  useEffect(() => {
    if (userData) {
      console.log("User details loaded:", userData);
    }
  }, [userData]);

  if (isLoading) return <div className="p-4 text-gray-500">Loading user details...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading user details</div>;
  if (!showUserDetails || !userData) return null;

  const { client, address } = userData.order;

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-medium">{client.username}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{client.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-medium">{client.contact || "Not provided"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Address</p>
          <p className="font-medium">
            {[
              address?.address,
              address?.address1,
              address?.street,
              address?.city,
              address?.state,
              address?.country,
              address?.pincode
            ]
              .filter(Boolean) // Remove empty/undefined parts
              .join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;