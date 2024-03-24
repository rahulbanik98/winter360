import React from "react";


const Bodycontainer = (props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <>
      <div
        {...props}
        className="md:w-full bg-white border rounded-xl flex py-4 shadow-sm sm:w-4 gap-10 sm:gap-16 overflow-x-auto"
      ></div>
    </>
  );
};

export default Bodycontainer;
