import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AddressFormData } from "@/lib/types/auth";
import { CreateUserAddress } from "@/lib/services/api/fetchers";
import FormWrapper from "./FormWrapper";
import { addressSchema } from "./addressSchema";

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

interface AddressFormProps {
  params: string;
}

const AddressForm = async ({ params }: AddressFormProps) => {
  
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  // Redirect if no token (unauthorized)
  if (!token) {
    redirect("/login");
  }

  // Check if we're editing an existing address
  const existingAddress: Partial<AddressFormData> | undefined = undefined;

  // Server action for form submission
 const handleSubmit = async (formData: AddressFormData) => {
  "use server";

  const result = addressSchema.safeParse(formData);
  if (!result.success) {
    return { success: false, errors: result.error.issues };
  }

  try {
    const Data = { ...formData, params };
    await CreateUserAddress(Data, token);

    // Instead of redirecting immediately, return success
    return { success: true, message: "Address added successfully" };
  } catch (error) {
    console.error("Error adding address", error);
    return { success: false, error: "Failed to add address" };
  }
};


  return (
    <div className="flex justify-center items-center mt-6 px-4">
      <div className="w-full max-w-2xl bg-white rounded-md p-6">
        <h1 className="text-2xl font-semibold text-black mb-4 text-center font-serif">
          {existingAddress ? "Update Shipping Address" : "Add a Shipping Address"}
        </h1>

        <FormWrapper 
          handleSubmit={handleSubmit}
          initialData={{
            ...FORM_DATA,
            ...(existingAddress || {})
          }}
          isEditing={!existingAddress}
        />
      </div>
    </div>
  );
};

export default AddressForm;