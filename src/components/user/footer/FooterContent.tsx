import Link from "next/link";
import { Button } from "./FooterBtn";
import { MdLocalPhone, MdLocationOn } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { AnimatedContainer } from "./StickyFooter";
import Image from "next/image";
import { logo } from "@/constants/imagePath";
import { FacebookIcon, InstagramIcon } from "lucide-react";

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}
interface FooterLinkGroup {
  label: string;
  links: FooterLink[];
}

const FooterContent = () => {
  const footerLinkGroups: FooterLinkGroup[] = [
    {
      label: "Links",
      links: [
        { title: "Home", href: "/" },
        { title: "Products", href: "/products" },
        { title: "About Us", href: "/about" },
        { title: "Contact Us", href: "/contact" }
      ]
    },
    {
      label: "Products",
      links: [
        { title: "Home & Office Storage", href: "/products" },
        { title: "Home Essentials", href: "/products" },
        { title: "Electronics", href: "/products" },
        { title: "Fashion", href: "/products" }
      ]
    }
  ];

  const socialLinks = [
    { title: "Facebook", href: "#", icon: FacebookIcon },
    {
      title: "Instagram",
      href: "https://www.instagram.com/omegbazaar?igsh=MWdhNjc4djJ3aDdxYg==",
      icon: InstagramIcon
    }
  ];

  return (
    <div className="mt-10 flex flex-col gap-8 md:flex-row xl:mt-0">
      <AnimatedContainer className="w-full max-w-sm min-w-2xs space-y-4">
        <Image
          src={logo}
          alt="Omeg Bazaar Logo"
          width={40}
          height={40}
          className="size-10 object-contain"
          priority
        />
        <h2 className="text-2xl font-bold text-gray-800">Omeg Bazaar</h2>

        <p className="text-muted-foreground mt-8 text-sm md:mt-0">
          Your one-stop destination for quality products. We provide the best
          shopping experience with a wide range of items to choose from.
        </p>
        <div className="flex gap-2">
          {socialLinks.map((link) => (
            <Button
              key={link.title}
              size="icon"
              variant="outline"
              className="size-8"
            >
              <Link href={link.href} target="_blank" rel="noopener noreferrer">
                <link.icon className="size-4" />
              </Link>
            </Button>
          ))}
        </div>
      </AnimatedContainer>

      {footerLinkGroups.map((group, index) => (
        <AnimatedContainer
          key={group.label}
          delay={0.1 + index * 0.1}
          className="w-full"
        >
          <div className="mb-10 md:mb-0">
            <h3 className="text-lg  text-gray-800">{group.label}</h3>
            <ul className="text-muted-foreground mt-4 space-y-2  text-sm md:text-xs lg:text-sm">
              {group.links.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    className="hover:text-foreground inline-flex items-center transition-all duration-300"
                  >
                    {link.icon && <link.icon className="me-1 size-4" />}
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedContainer>
      ))}

      <AnimatedContainer delay={0.3} className="w-full">
        <div className="mb-10 md:mb-0">
          <h3 className="text-lg text-gray-800">Contact Us</h3>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed max-w-xs">
            Have questions or need help? Reach out to our customer support team
            anytime.
          </p>
          <ul className="mt-4 space-y-3 text-sm md:text-xs lg:text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MdLocationOn className="size-4 flex-shrink-0 mt-1" />
              <span>
                23-A, near Lal Chand Shoe Maker, <br /> Shankar Garden Colony,{" "}
                <br /> Prakash Nagar,
                <br /> Model Town, Jalandhar, <br /> Punjab 144003
              </span>
            </li>
            <li className="flex items-center gap-2">
              <MdLocalPhone className="size-4" />
              <Link
                href="tel:+919501755756"
                className="hover:text-foreground transition"
              >
                9501755756
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <IoIosMail className="size-4" />
              <Link
                href="mailto:omegbazaarofficial@gmail.com"
                className="hover:text-foreground transition"
              >
                omegbazaarofficial@gmail.com
              </Link>
            </li>
          </ul>
        </div>
      </AnimatedContainer>
    </div>
  );
};


export default FooterContent