import React from "react";
import { motion } from "framer-motion";

const Backdrop = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute z-[99999] min-h-[200vh] w-full bg-[#00000080] py-16 backdrop-blur-sm"
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
