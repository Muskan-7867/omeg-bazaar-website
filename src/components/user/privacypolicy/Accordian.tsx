import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Section = {
  title: string;
  content: React.ReactNode;
  param: string;
};

interface AccordionProps {
  sections: Section[];
  searchParams?: { sections?: string };
}

const Accordion: React.FC<AccordionProps> = ({ sections, searchParams }) => {
  const activeSections = searchParams?.sections?.split(",").filter(Boolean) || [];

  // Generates a link that toggles this section
  const toggleLink = (param: string) => {
    const isOpen = activeSections.includes(param);
    const newSections = isOpen
      ? activeSections.filter((s) => s !== param)
      : [...activeSections, param];
    return `?sections=${newSections.join(",")}`;
  };

  return (
    <div className="space-y-4 text-black">
      {sections.map((section, index) => {
        const isOpen = activeSections.includes(section.param);
        
        return (
          <div key={index}>
            <div className="border-b border-primary">
              <Link
                href={toggleLink(section.param)}
                className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
              >
                <span className="text-lg font-light text-gray-700">
                  {section.title}
                </span>
                <motion.div
                  animate={{
                    rotate: isOpen ? 180 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown />
                </motion.div>
              </Link>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pb-4 text-gray-600"
                  >
                    {section.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;