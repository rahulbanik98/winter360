import React from "react";


const Bodycontainer = (props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <>
      <div
        {...props}
        className="w-full bg-white border rounded-xl flex py-4 shadow-sm"
      ></div>
    </>
  );
};

export default Bodycontainer;
