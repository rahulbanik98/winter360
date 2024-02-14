import dynamic from "next/dynamic";

const Dynamicnavbar = dynamic(() => import("./Navbar"));

export { Dynamicnavbar };
