import React, { useEffect, useState } from "react";

import { atom, useAtom } from "jotai";
import { dataFlag, pullData, realtimeLocation } from "@/app/atom";
import { getLiveData } from "@/utils/getData";
import axios from "axios";
import { IoLocation } from "react-icons/io5";
import { MdOutlineMyLocation } from "react-icons/md";

export default function Basicnav() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [place, setPlace] = useState("kolkata");
  const [navData, setNavData] = useAtom(pullData);
  const [liveLocation, setLiveLocation] = useAtom(realtimeLocation);
  const [onTimeDataFlag, setOnTimeDataFlag] = useAtom(dataFlag);

  const submitLiveLocation = async () => {
    const response = await getLiveData(place);
    setNavData(response);
  };

  const API_KEY = "c7c2019001c1b2b74632c8200ad139e5&cnt=56";

  const getLiverealtimeLocationData = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response: object = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
          );
          setLiveLocation(response);
        } catch (error) {
          console.log("error in click and get live location || ", error);
        }
      });
    }
  };

  const getOnTimeLocationData = () => {
    setOnTimeDataFlag(true);
    getLiverealtimeLocationData();
    submitLiveLocation();
  };

  useEffect(() => {
    submitLiveLocation();
  }, []);

  console.log("place::--", place);
  console.log("liveLocation?.data?.name", liveLocation?.data?.name);

  return (
    <>
      {/*<!-- Component: Basic Navbar --> */}
      <header className="sticky top-0 border-b-1 z-20 w-full border-b border-slate-200 bg-white/90 shadow-lg shadow-slate-700/5 after:absolute after:top-full after:left-0 after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
        <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
          <nav
            aria-label="main navigation"
            className="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700"
            role="navigation"
          >
            {/*      <!-- Brand logo --> */}
            <p
              id="WindUI"
              aria-label="WindUI logo"
              aria-current="page"
              className="flex items-center gap-2 whitespace-nowrap py-3 focus:outline-none lg:flex-1 text-xl"
            >
              Winter360° ||
              <MdOutlineMyLocation
                className="cursor-pointer tooltip tooltip-open tooltip-bottom"
                data-tip="hello"
                onClick={() => getOnTimeLocationData()}
              />
              {onTimeDataFlag == true ? (
                liveLocation?.data ? (
                  <>{`${liveLocation?.data?.sys?.country}, ${liveLocation?.data?.name}`}</>
                ) : null
              ) : navData?.data?.city?.country ? (
                <>{`${navData?.data?.city?.country}, ${navData?.data?.city?.name}`}</>
              ) : null}
            </p>
            {/*      <!-- Mobile trigger --> */}
            <button
              className={`relative order-10 block h-10 w-10 self-center lg:hidden
                ${
                  isToggleOpen
                    ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
                    : ""
                }
              `}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
              </div>
            </button>
            {/*      <!-- Navigation links --> */}
            <ul
              role="menubar"
              aria-label="Select page"
              className={`absolute top-0 left-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden  overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${
                isToggleOpen
                  ? "visible opacity-100 backdrop-blur-sm"
                  : "invisible opacity-0"
              }`}
            >
              {/* <li role="none" className="flex items-stretch">
                <a
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="javascript:void(0)"
                >
                  <span>Home</span>
                </a>
              </li> */}
              {/* <li role="none" className="flex items-stretch">
                <a
                  role="menuitem"
                  aria-current="page"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 text-emerald-500 transition-colors duration-300 hover:text-emerald-600 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="javascript:void(0)"
                >
                  <span>Features</span>
                </a>
              </li> */}
              {/* <li role="none" className="flex items-stretch">
                <a
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="javascript:void(0)"
                >
                  <span>Pricing</span>
                </a>
              </li> */}
              <li role="none" className="flex items-stretch">
                <div className="relative my-6">
                  <div className="form-control">
                    <form onSubmit={(event) => event.preventDefault()}>
                      {onTimeDataFlag == true ? (
                        <input
                          type="text"
                          placeholder="Enter location"
                          className={`input input-bordered w-full md:w-auto bg-slate-50`}
                          onChange={() => setPlace(liveLocation?.data?.name)}
                          value={liveLocation?.data?.name}
                        />
                      ) : (
                        <input
                          type="text"
                          placeholder="Enter location"
                          className={`input input-bordered w-full md:w-auto bg-slate-50`}
                          onChange={(event) => setPlace(event?.target?.value)}
                          value={place}
                        />
                      )}
                    </form>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-4 top-2.5 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                    aria-label="Search icon"
                    role="graphics-symbol"
                    onClick={() => submitLiveLocation()}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      {/*<!-- End Basic Navbar--> */}
    </>
  );
}
