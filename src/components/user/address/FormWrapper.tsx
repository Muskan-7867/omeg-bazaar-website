"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AddressFormData } from "@/lib/types/auth";
import { ZodIssue } from "zod";
import Form from "./Form";

interface SubmitResult {
  success: boolean;
  errors?: ZodIssue[];
}
interface FormWrapperProps {
  handleSubmit: (formData: AddressFormData) => Promise<SubmitResult>;
  initialData: AddressFormData;
  isEditing: boolean;
}

const FormWrapper = ({
  handleSubmit,
  initialData,
  isEditing
}: FormWrapperProps) => {
  const [formData, setFormData] = useState<AddressFormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  console.log(errors);
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await handleSubmit(formData);

      if (result && !result.success) {
        // Handle validation errors
        if (result.errors) {
          const newErrors: Record<string, string> = {};
          result.errors.forEach((err: ZodIssue) => {
            const path = err.path[0] as string;
            newErrors[path] = err.message;
          });
          setErrors(newErrors);
        }
      } else {
        // Success → show message and go back
        alert("Address added successfully!");
        router.back(); // navigate to previous page
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrors({ submit: "Failed to submit form" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      handleSubmit={handleFormSubmit}
      formData={formData}
      setFormData={setFormData}
      isSubmitting={isSubmitting}
      isEditing={isEditing}
    />
  );
};

export default FormWrapper;
