"use client"
import { useState } from "react";
import Cookies from "js-cookie";
import { AddressFormData } from "@/lib/types/auth";
import { CreateUserAddress } from "@/lib/services/api/fetchers";
import { useParams, useRouter } from "next/navigation";
import Form from "./Form";
import { addressSchema } from "./addressSchema";
import { ZodIssue } from "zod";

type FormErrors = {
  [key in keyof FormData]?: string;
};

const FORM_DATA: AddressFormData = {
  street: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
  phone: "",
  address: "",
  address1: ""
};

const AddressForm = () => {
  const { userId } = useParams<{ userId: string }>();
  const token = Cookies.get("authToken");

  // Remove usePathname usage
  const existingAddress: Partial<AddressFormData> | undefined = undefined;

  const [formData, setFormData] = useState<AddressFormData>({
    ...FORM_DATA,
    ...(existingAddress || {})
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [gotoAddressForm, setGoToAddressForm] = useState(true);

  const navigate = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);

    const result = addressSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: FormErrors = {};
      result.error.issues.forEach((err: ZodIssue) => {
        const path = err.path[0] as keyof FormData;
        newErrors[path] = err.message;
      });

      setIsSubmitting(false);
      return;
    }

    const Data = { ...formData, userId };

    try {
      const response = await CreateUserAddress(Data, token || "");
      console.log("Address added successfully", response);
      setSubmitSuccess(true);
      setFormData(FORM_DATA);
      navigate.back(); // Fixed navigation
      setGoToAddressForm(false);
    } catch (error) {
      console.error("Error adding address", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-6  px-4">
      <div className="w-full max-w-2xl bg-white  rounded-md">
        <h1 className="text-2xl font-semibold text-black mb-4 text-center font-serif">
          {existingAddress ? "Update Shipping Address" : "Add a Shipping Address"}
        </h1>

        {submitSuccess && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
            {existingAddress
              ? "Address updated successfully"
              : "Address added successfully"}
          </div>
        )}
        <Form
          handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          isSubmitting={isSubmitting}
          isEditing={!existingAddress}
        />
      </div>
    </div>
  );
};

export default AddressForm;
