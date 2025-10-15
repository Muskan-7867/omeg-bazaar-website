"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TermsContent from "./TermsContent";
import { PrivacyContent } from "./PrivacyContent";
import { ContactUs } from "./ContactUs";
import { Cancelation } from "./Cancelation";

type Section = {
  title: string;
  content: React.ReactNode;
  param: string;
};

interface PrivacyPolicyPageProps {
  searchParams?: { sections?: string };
}

const sections: Section[] = [
  {
    title: "Privacy Policy",
    content: <PrivacyContent />,
    param: "privacyandpolicy"
  },
  {
    title: "Terms & Conditions",
    content: <TermsContent />,
    param: "termsandconditions"
  },
  { title: "Contact Us", content: <ContactUs />, param: "contactus" },
  {
    title: "Cancel & Return Policy",
    content: <Cancelation />,
    param: "cancelationandreturnpolicy"
  }
];

export default function PrivacyPolicyPage({
  searchParams
}: PrivacyPolicyPageProps) {
  const [activeSections, setActiveSections] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Initialize active sections from URL params on component mount
    const initialSections = searchParams?.sections?.split(",").filter(Boolean) || [];
    setActiveSections(initialSections);
  }, [searchParams]);

  // Update URL when active sections change
  useEffect(() => {
    if (activeSections.length > 0) {
      const sectionsParam = activeSections.join(",");
      const newUrl = `?sections=${sectionsParam}`;
      router.replace(newUrl, { scroll: false });
    } else {
      // If no sections are active, remove the parameter
      router.replace("?", { scroll: false });
    }
  }, [activeSections, router]);

  // Toggle section visibility and update URL
  const toggleSection = (param: string) => {
    setActiveSections(prev => {
      if (prev.includes(param)) {
        return prev.filter(s => s !== param);
      } else {
        return [...prev, param];
      }
    });
  };

  return (
    <div className="max-w-full mx-auto p-6 mt-20 lg:mt-4 bg-white h-[60rem]">
      <h1 className="text-3xl font-light mb-6 text-center text-primary">
        Policy & Information
      </h1>
      <div className="space-y-4 text-black">
        {sections.map((section) => {
          const isOpen = activeSections.includes(section.param);
          return (
            <div key={section.param} className="border-b border-primary">
              <button
                onClick={() => toggleSection(section.param)}
                className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-gray-700">
                  {section.title}
                </span>
                <span
                  className="transition-transform duration-300"
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
                  }}
                >
                  ▼
                </span>
              </button>

              {isOpen && (
                <div className="pb-4 text-gray-600">{section.content}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}