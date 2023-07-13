import React from "react";
import { useMediaQuery } from "usehooks-ts";

const Body = ({ children }: { children: React.ReactNode }) => {
  const phone = useMediaQuery("(min-width:768px)");
  return (
    <main
      className={`relative z-[999] min-h-[200vh] overflow-clip bg-base-100 md:ml-20 lg:max-w-2xl xl:ml-80
       ${phone ? "border-x border-base-300" : null} `}
    >
      {children}
    </main>
  );
};

export default Body;
