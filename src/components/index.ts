import dynamic from "next/dynamic";

const Dynamicnavbar = dynamic(() => import("./Navbar"));
const Dynamicbodycontainer = dynamic(() => import("./Bodycontainer"));
const Dynamicweathericon = dynamic(() => import("./Weathericon"));

export { Dynamicnavbar, Dynamicbodycontainer, Dynamicweathericon };
