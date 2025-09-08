import { RazorpayOptions } from "./razorpay";

interface Window {
  Razorpay: new (options: RazorpayOptions) => {
    open: () => void;
  };
}
