import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {  FaUser } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";

interface Props {
  isDropdownVisible: boolean;
  setIsDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>;
  userEmail: string;
  handleLogOut: () => void;
}

const ProfileDropdown = ({
  isDropdownVisible,
  setIsDropdownVisible,
  handleLogOut
}: Props) => {
  const handleClick = () => {
    setIsDropdownVisible(false);
  }
  return (
    <AnimatePresence>
      {isDropdownVisible && (
        <>
          {/* Background overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-20 bg-transparent backdrop-blur-sm top-14"
            onClick={() => setIsDropdownVisible(false)}
          />

          {/* Dropdown */}
          <motion.div
            initial={{ scale: 0.5, x: 5, y: -50, height: 0, width: 0 }}
            animate={{
              scale: 1,
              x: 0,
              y: 0,
              height: "auto",
              width: "200px",
              transition: { duration: 0.3 }
            }}
            exit={{
              scale: 0.9,
              x: 10,
              y: -50,
              height: 0,
              width: 0,
              opacity: 0,
              transition: { duration: 0.3 }
            }}
            className="bg-primary text-white p-2 rounded-2xl fixed top-15 right-12 z-[110] shadow-lg border-white/20 border "
          >
           

            {/* Links */}
            <div className="mt-4 ">
              <ul className="flex gap-4 flex-col" >
                <li onClick={handleClick} className="hover:bg-white/10 rounded-md p-2 flex justify-start gap-2">
                 <FaUser size={20} />
                  <Link to="/profile">Go To Profile</Link>
                </li>
             
                <li onClick={handleLogOut} className="hover:bg-white/10 rounded-md p-2 flex justify-start gap-2">
                <PiSignOutBold size={20} />
                  <button>Log Out</button>
                </li>
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileDropdown;
