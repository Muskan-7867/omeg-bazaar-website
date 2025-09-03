import { cn } from "@/lib/utills/cn";
import Link from "next/link";

interface ButtonProps {
  className: string;
}
const Button = ({ className }: ButtonProps) => {
  return (
    <button
      className={cn(
        "bg-black px-2 lg:px-4 py-2 relative rounded-full lg:w-24 md:w-22 sm:w-18 group overflow-hidden",
        className
      )}
    >
      <Link href="/products" className=" text-white">
        View All
      </Link>
      <div className="absolute left-0 -top-16 w-12 h-[12rem] bg-gradient-to-r from-transparent via-white/20 to-transparent  -translate-x-16 -rotate-45 group-hover:translate-x-[10rem] transition-all duration-500" />
    </button>
  );
};

export default Button;
