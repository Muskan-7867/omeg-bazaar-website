import { z } from "zod";
export const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  pincode: z
    .string()
    .min(1, "Pincode is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Pincode must be a valid number"
    }),
  phone: z
    .string()
    .min(1, "Phone is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Phone must be a valid number"
    }),
  address: z.string().min(1, "Address is required"),
  address1: z.string().optional()
});

export type AddressType = z.infer<typeof addressSchema>;

