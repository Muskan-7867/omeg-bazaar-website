import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  isCardVisible: boolean;
  setIsCardVisible: (value: boolean) => void;
}
const MobileMenu: React.FC<MobileMenuProps> = ({
  isCardVisible,
  setIsCardVisible
}) => {
  const handleClick = () => {
    setIsCardVisible(false);
  };
  return (
    <AnimatePresence>
      {isCardVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-20 bg-transparent backdrop-blur-md mt-8 "
            onClick={() => setIsCardVisible(false)}
          />

          {/* Sliding mobile menu */}
          <motion.div
            initial={{ scale: 0.5, x: 50, y: -50, height: 0, width: 0 }}
            animate={{
              scale: 1,
              x: 0,
              y: 0,
              height: "auto",
              width: "80vw",
              transition: { duration: 0.3 }
            }}
            exit={{
              scale: 0.9,
              x: 50,
              y: -50,
              height: 0,
              width: 0,
              transition: { duration: 0.3 }
            }}
            className="bg-primary text-white p-6 rounded-4xl fixed top-16 right-5 z-[110] shadow-lg border-white/20 border-[1px] "
          >
            <motion.button
              exit={{ height: 0, width: 0 }}
              onClick={() => setIsCardVisible(false)}
              className="absolute top-5 right-5 bg-white text-[#ca8888] w-8 h-8 rounded-full flex justify-center items-center opacity-80 hover:opacity-100 transition-opacity"
            >
              <RxCross2 size={18} />
            </motion.button>

            <div className="mt-10" onClick={handleClick}>
              <ul className="flex gap-4 flex-col ">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/products">Products</Link>
                <Link to="/contact">Contact</Link>
              </ul>
              <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
                <div className="flex gap-2">
                  <motion.button
                    animate={{
                      scale: 1,
                      x: 0,
                      y: 0,
                      height: "28px",
                      width: "28px",
                      transition: { duration: 0.3 }
                    }}
                    exit={{
                      height: 0,
                      width: 0,
                      opacity: 0,
                      scale: 0,
                      transition: { duration: 0.1 }
                    }}
                    className="bg-white text-primary w-8 h-8 rounded-full flex justify-center items-center hover:opacity-80 transition-opacity"
                  >
                    <FaFacebook size={16} />
                  </motion.button>
                  <motion.button
                    animate={{
                      scale: 1,
                      x: 0,
                      y: 0,
                      height: "28px",
                      width: "28px",
                      transition: { duration: 0.3 }
                    }}
                    exit={{ height: 0, width: 0, opacity: 0 }}
                    className="bg-white text-primary w-8 h-8 rounded-full flex justify-center items-center hover:opacity-80 transition-opacity"
                  >
                    <FaInstagram size={16} />
                  </motion.button>
                </div>

                <h3 className="text-sm sm:text-base break-words text-center sm:text-right">
                  omegbazaarofficial@gmail.com
                </h3>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
