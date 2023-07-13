import { useMobileDrawer } from "lib/zustand";
import React from "react";
import { FaToggleOff } from "react-icons/fa";

const MobileDrawerToggle = () => {
  const { setDrawer } = useMobileDrawer();

  return (
    <button onClick={() => setDrawer(true)}>
      <div className="grid h-12 w-12 place-items-center rounded-full transition-all hover:bg-slate-300">
        <FaToggleOff className="text-xl text-primary md:text-2xl lg:text-3xl" />
      </div>
    </button>
  );
};

export default MobileDrawerToggle;
