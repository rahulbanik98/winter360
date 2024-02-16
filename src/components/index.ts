import dynamic from "next/dynamic";

const Dynamicnavbar = dynamic(() => import("./Navbar"));
const Dynamicbodycontainer = dynamic(() => import("./Bodycontainer"));

export { Dynamicnavbar, Dynamicbodycontainer };
