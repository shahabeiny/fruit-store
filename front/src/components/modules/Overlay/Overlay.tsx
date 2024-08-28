import React from "react";

const Overlay = ({ className,onClick }: { className?: string,onClick?:()=>void }) => {
  return (
    <div
      className={`md:hidden fixed inset-0 w-full h-full bg-black/40 z-10 ${
        className || ""
      }`}
      onClick={()=>onClick?.()}
    ></div>
  );
};

export default Overlay;
