"use client"
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import TermsContent from "./TermsContent";
import { PrivacyContent } from "./PrivacyContent";
import { ContactUs } from "./ContactUs";
import { Cancelation } from "./Cancelation";
import { useQueryState } from "nuqs";

type AccordionProps = {
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
};

const sections = [
  {
    title: "Privacy Policy",
    content: <PrivacyContent />,
    param: "privacyandpolicy",
  },
  {
    title: "Terms & Conditions",
    content: <TermsContent />,
    param: "termsandconditions",
  },
  {
    title: "Contact Us",
    content: <ContactUs />,
    param: "contactus",
  },
  {
    title: "Cancel & Return Policy",
    content: <Cancelation />,
    param: "cancelationandreturnpolicy",
  },
];

const AccordionItem: React.FC<AccordionProps> = ({
  title,
  content,
  isOpen,
  onClick,
}) => (
  <div className="border-b border-primary">
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
    >
      <span className="text-lg font-light text-gray-700">{title}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronDown  />
      </motion.div>
    </button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="pb-4 text-gray-600"
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const PrivacyPolicyPage = () => {
  const [activeSections, setActiveSections] = useQueryState<string[]>(
    "sections",
    {
      defaultValue: [],
      parse: (value) => value.split(",").filter(Boolean),
      serialize: (value) => value.join(","),
    }
  );

  const handleToggle = (param: string) => {
    setActiveSections((prev = []) =>
      prev.includes(param)
        ? prev.filter((p) => p !== param)
        : [...prev, param]
    );
  };

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Scroll to the first active section
    if (activeSections && activeSections.length > 0) {
      const index = sections.findIndex((s) => s.param === activeSections[0]);
      if (index !== -1 && sectionRefs.current[index]) {
        sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [activeSections]);

  return (
    <div className="max-w-full mx-auto p-6 mt-20 lg:mt-4 bg-white">
      <h1 className="text-3xl font-light mb-6 text-center text-primary">
        Policy & Information
      </h1>
      <div className="space-y-4 text-black">
        {sections.map((section, index) => (
          <div 
            key={index}
            ref={(el) => {
              if (el) {
                sectionRefs.current[index] = el;
              }
            }}
          >
            <AccordionItem
              title={section.title}
              content={section.content}
              isOpen={activeSections?.includes(section.param) ?? false}
              onClick={() => handleToggle(section.param)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;