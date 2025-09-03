import { IoIosMail } from "react-icons/io";
import { MdLocalPhone, MdLocationOn } from "react-icons/md";
import { BsClock } from "react-icons/bs";
import Link from "next/link";

const ContactInfo = () => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>

      <div className="space-y-6">
        <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition">
          <div className=" p-3 rounded-full">
            <MdLocationOn className="text-gray-800" size={20} />
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Our Location</h4>
            <p className="text-gray-600 mt-1">
              23-A, near Lal Chand Shoe Maker,
              <br />
              Prakash Nagar, Shankar Garden Colony,
              <br /> Model Town, Jalandhar, Punjab 144003
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition">
          <div className=" p-3 rounded-full">
            <MdLocalPhone className="text-gray-800" size={20} />
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Phone Number</h4>
            <Link
              href="tel:09872144408"
              className="text-gray-600 hover:text-primary transition mt-1 block"
            >
              09872144408
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition">
          <div className=" p-3 rounded-full">
            <IoIosMail className="text-gray-800" size={20} />
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Email Address</h4>
            <Link
              href="mailto:omegbazaar@gmail.com"
              className="text-gray-600 hover:text-primary transition mt-1 block"
            >
              omegbazaar@gmail.com
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition">
          <div className=" p-3 rounded-full">
            <BsClock className="text-gray-800" size={20} />
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Working Hours</h4>
            <p className="text-gray-600 mt-1">
              Mon-Sat: 9:30 AM - 6:30 PM
              <br />
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
