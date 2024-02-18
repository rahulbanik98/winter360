import dynamic from "next/dynamic";

const Dynamicnavbar = dynamic(() => import("./Navbar"));
const Dynamicbodycontainer = dynamic(() => import("./Bodycontainer"));
const Dynamicweathericon = dynamic(() => import("./Weathericon"));
const DynamicweatherDetails = dynamic(() => import('./Weatherdetails'))
const Dynamicforecastweatherdetails = dynamic(() => import('./Forcustweatherdetails'))

export {
    Dynamicnavbar, 
    Dynamicbodycontainer, 
    Dynamicweathericon, 
    DynamicweatherDetails, 
    Dynamicforecastweatherdetails
};
