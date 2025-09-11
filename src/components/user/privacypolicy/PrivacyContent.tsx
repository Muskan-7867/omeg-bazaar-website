import { FC } from "react";

export const PrivacyContent: FC = () => {
  return (
    <div className="w-full text-justify text-md flex flex-col gap-3">
   <p>
        This privacy policy outlines how <strong>OmegBazaar</strong> collects, uses, and protects your personal
        information when you visit our website or make a purchase.
      </p>

      <p>
        We are committed to protecting your data. Any information we collect will only be used in accordance
        with this policy.
      </p>

      <h2 className="font-semibold text-gray-900">Information We Collect</h2>
      <ul className="list-disc list-inside ml-2">
        <li>Name and contact details</li>
        <li>Email address</li>
        <li>Shipping and billing address</li>
        <li>Preferences and feedback</li>
      </ul>

      <h2 className="font-semibold text-gray-900">Why We Collect It</h2>
      <ul className="list-disc list-inside ml-2">
        <li>To process your orders</li>
        <li>To improve our products and services</li>
        <li>To send order updates, offers, or feedback forms</li>
      </ul>

      <h2 className="font-semibold text-gray-900">Security</h2>
      <p>
        We use appropriate measures to prevent unauthorized access or disclosure of your data.
      </p>

      <h2 className="font-semibold text-gray-900">Cookies</h2>
      <p>
        We use cookies to enhance user experience. You can control cookie usage through your browser settings.
      </p>

      <h2 className="font-semibold text-gray-900">Your Rights</h2>
      <p>
        You may update or request deletion of your personal data by contacting us at
        <strong>  omegbazaarofficial@gmail.com</strong>.
      </p>

      <p>
        We do not share your data with third parties without your consent, unless required by law.
      </p>
    </div>
  );
};
