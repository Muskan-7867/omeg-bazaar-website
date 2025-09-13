import { PaymentType } from "./CartSummary";

interface PaymentSummaryProps {
  paymentMethod: PaymentType;
  setPaymentMethod: (method: PaymentType) => void;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  paymentMethod,
  setPaymentMethod
}) => {
  return (
    <>
      <h1 className="text-lg font-bold font-serif text-primary mt-4">
        Payment
      </h1>
      <div className=" rounded-lg mt-2">
        <div className="flex flex-col px-4 py-2 gap-2">
          <div className="flex flex-col gap-4">
            {[
              { label: "Cash On Delivery", value: "cash_on_delivery" },
              { label: "Online Payment", value: "online_payment" }
            ].map(({ label, value }) => (
              <label
                key={value}
                className="flex items-center gap-2 border-b border-gray-200 py-2"
              >
                <input
                  type="radio"
                  name="paymentStatus"
                  value={value}
                  checked={paymentMethod === value}
                  onChange={() => setPaymentMethod(value as PaymentType)}
                  className="accent-primary w-4 h-4 rounded-full cursor-pointer"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSummary;
