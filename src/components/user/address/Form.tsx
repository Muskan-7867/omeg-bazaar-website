import { AddressFormData } from "@/lib/types/auth";
import React from "react";

interface FormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formData: AddressFormData;
  setFormData: React.Dispatch<React.SetStateAction<AddressFormData>>;
  
  isSubmitting: boolean;
  isEditing: boolean;
}

const Form = ({
  handleSubmit,
  formData,
  setFormData,
 
  isSubmitting,
  isEditing
}: FormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
    

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-black">Street</label>
        <input
          type="text"
          name="street"
          placeholder="123 Main St"
          value={formData.street}
          onChange={handleChange}
          className="py-2 border-b-2 border-primary focus:outline-none"
        />
      
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-black">Address Line 1</label>
        <input
          type="text"
          name="address"
          placeholder="Type Your Address"
          value={formData.address}
          onChange={handleChange}
          className="py-2 border-b-2  border-primary focus:outline-none"
        />
        
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-black">Address Line 2</label>
        <input
          type="text"
          name="address1"
          placeholder="Another Address"
          value={formData.address1}
          onChange={handleChange}
          className="py-2 border-b-2 border-primary focus:outline-none"
        />
      
      </div>

        <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-black">Phone</label>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="py-2 border-b-2 border-primary focus:outline-none"
        />
       
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-black">City</label>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="py-2 border-b-2 border-primary focus:outline-none" 
        />
       
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-black">State</label>
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          className="py-2 border-b-2 border-primary focus:outline-none"
        />
       
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-black">Country</label>
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          className="py-2 border-b-2 border-primary focus:outline-none"
        />
      
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-black">Pincode</label>
        <input
          type="text"
          name="pincode"
          placeholder="Postal Code"
          value={formData.pincode}
          onChange={handleChange}
          className="py-2 border-b-2 border-primary focus:outline-none"
        />
       
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`mt-4 bg-primary text-white font-semibold py-2 rounded shadow-sm transition ${
          isSubmitting
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-primary-dark"
        }`}
      >
        {isEditing
          ? isSubmitting
            ? "Adding..."
            : "Add Address"
          : isSubmitting
          ? "Submitting..."
          : "Update Address"}
      </button>
    </form>
  );
};

export default Form;
