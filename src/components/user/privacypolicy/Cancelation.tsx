import { FC } from "react";

export const Cancelation: FC = () => {
  return (
    <div className="text-justify text-sm flex flex-col gap-3">
      <p>
        At <strong>OmegBazaar</strong>, we strive to provide a smooth and fair
        shopping experience. Below is our cancellation and return policy:
      </p>

      <ul className="list-disc list-inside ml-3 flex flex-col gap-2">
        <li>
          Orders can be cancelled within the same day of placing them, unless
          they have already been processed or shipped.
        </li>
        <li>
          Returns are accepted only for damaged, defective, or incorrect items.
          These must be reported within 24 hours of delivery.
        </li>
        <li>
          For any product-related issues, especially those with manufacturer
          warranties, please contact the brand’s support directly.
        </li>
        <li>
          If a return is approved, refunds will be processed within 3–5 business
          days to the original payment method.
        </li>
      </ul>

      <p>
        If you believe you’ve received an incorrect or unsatisfactory item,
        please reach out to our customer support team at{" "}
        <strong> omegbazaarofficial@gmail.com</strong> with your order details and
        concern.
      </p>
    </div>
  );
};
