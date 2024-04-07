// import React, { useState, useEffect } from "react";
// import { MdOutlineMyLocation } from "react-icons/md";
// import { IoLocation } from "react-icons/io5";
// import { useAtom } from "jotai";
// import { pullData, realtimeLocation } from "@/app/atom";
// import { getLiveData } from "@/utils/getData";
// import axios from "axios";


// const Navbar = () => {
//   const [place, setPlace] = useState("kolkata");
//   const [navData, setNavData] = useAtom(pullData);
//   const [liveLocation, setLiveLocation] = useAtom(realtimeLocation)

//   const submitLiveLocation = async () => {
//     const response = await getLiveData(place);
//     setNavData(response);
//   };

//   const API_KEY = "c7c2019001c1b2b74632c8200ad139e5&cnt=56";

//   const getLiverealtimeLocationData = async () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         const { latitude, longitude } = position.coords;
//         try {
//           const response: object = await axios.get(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
//           );
//           setLiveLocation(response)
//         } catch (error) {
//           console.log("error in click and get live location || ", error);
//         }
//       });
//     }
//   }

//   const temp = () => {
//     getLiverealtimeLocationData()
//   }

//   useEffect(() => {
//     submitLiveLocation();
//   }, []);

//   console.log("liveLocation", liveLocation);

//   return (
//     <>
//       <div className={`navbar border-[1px] border-b-slate-900 bg-white`}>
//         <div className="flex-1">
//           <p className="btn btn-ghost text-xl">Winter360°</p>
//         </div>
//         <div className="flex-none lg:gap-5 md:lg:gap-5">
//           <MdOutlineMyLocation
//             className="cursor-pointer tooltip tooltip-open tooltip-bottom"
//             data-tip="hello"
//             onClick={() => temp()}
//           />
//           <IoLocation className="" />
//           {navData?.data?.city?.country ? (
//             <h1>{`${navData?.data?.city?.country}, ${navData?.data?.city?.name
//               }`}</h1>
//           ) : null}
//           <div className="form-control">
//             <form onSubmit={(event) => event.preventDefault()}>
//               <input
//                 type="text"
//                 placeholder="Enter location"
//                 className={`input input-bordered w-24 md:w-auto }`}
//                 onChange={(event) => setPlace(event.target.value)}
//                 value={place}
//               />
//               <button
//                 className="btn btn-outline btn-info ml-1"
//                 onClick={() => submitLiveLocation()}
//               >
//                 Search
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;