import { FaQuestionCircle } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import ContactInfo from "./components/ContactInfo";
import ContactForm from "./components/ContactForm";
import ContactMap from "./components/ContactMap";
import { MdOutlineSupportAgent } from "react-icons/md";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className=" bg-gradient-to-t from-[#131921] to-[#232F3E] py-10 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            We&apos;re Here to Help
          </h1>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Have questions about our products or services? Our friendly team is
            here to help you.
          </p>
        </div>
      </div>

      {/* Support Options */}
      <div className="w-full mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <MdOutlineSupportAgent className="text-blue-600 text-2xl" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Customer Support</h3>
            <p className="text-gray-600 mb-4">
              Our dedicated team is here to help you with any questions
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <FaQuestionCircle className="text-green-600 text-2xl" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">FAQs</h3>
            <p className="text-gray-600 mb-4">
              Find quick answers to common questions in our FAQ section
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <BsChatDots className="text-purple-600 text-2xl" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Feedback</h3>
            <p className="text-gray-600 mb-4">
              We&apos;d love to hear your thoughts and suggestions
            </p>
          </div>
        </div>

        {/* Main Content */}
        {/* Main Content */}
        <div className="w-full bg-white border border-gray-200 overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="p-6 md:p-8 border-r border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Send us a message
              </h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="p-6 md:p-8">
              <ContactInfo />
            </div>
          </div>
        </div>

        {/* Map Section */}
        <ContactMap />
      </div>
    </div>
  );
};

export default Contact;
