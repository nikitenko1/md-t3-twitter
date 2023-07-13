import React from "react";
import { Ring } from "@uiball/loaders";

const Loader = () => {
  return (
    <div className="flex justify-center md:pt-4">
      <Ring size={40} lineWeight={5} speed={2} color="#1D9BF0" />
    </div>
  );
};

export default Loader;
