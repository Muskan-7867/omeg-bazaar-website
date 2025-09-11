import { CurrentUser } from "@/lib/types/auth";

const UserAddress = ({
  currentUserFromStore
}: {
  currentUserFromStore: CurrentUser;
}) => {
  const address = currentUserFromStore?.address;
  const isAddressValid = address && typeof address !== 'string';

  if (!isAddressValid) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Shipping Address</h2>
        </div>
        <div className="text-gray-500 italic">No address saved</div>
      </div>
    );
  }

  return (
    <div className=" p-6 rounded-lg ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">Shipping Address</h2>
      </div>
      
      <div className="space-y-3 text-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {address.address1 && (
            <div className="col-span-2">
              <p className="text-sm text-gray-500">Address line 1</p>
              <p className="font-medium">{address.address1}</p>
            </div>
          )}
          
          {address.address && (
            <div className="col-span-2">
              <p className="text-sm text-gray-500">Address line 2</p>
              <p className="font-medium">{address.address}</p>
            </div>
          )}
          
          <div>
            <p className="text-sm text-gray-500">Street</p>
            <p className="font-medium">{address.street}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">City</p>
            <p className="font-medium">{address.city}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">State</p>
            <p className="font-medium">{address.state}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Country</p>
            <p className="font-medium">{address.country}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Postal Code</p>
            <p className="font-medium">{address.pincode}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{address.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAddress;