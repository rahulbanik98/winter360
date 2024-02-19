"use client";

import React, { useState } from "react";
import { MdOutlineMyLocation } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import axios from "axios";
import { useAtom } from "jotai";
import { lightDark, placeAtom } from "@/app/atom";

const Navbar = () => {
  const [modeOfColor, setModeOfColor] = useAtom(lightDark);
  const [place, setPlace] = useAtom(placeAtom);
  const [searchLocation, setSearchLocation] = useState<
    string | number | readonly string[] | undefined | any
  >("Kolkata");

  const [error, setError] = useState<string>();
  const [suggestions, setSuggestions] = useState<string[]>();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const API_KEY = process.env.KEY;

  const searchLocationFunction = async (value: string) => {
    setSearchLocation(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${API_KEY}`
        );
        const suggestions = response?.data?.list?.map(
          (item: any) => item.name
        );
        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
      } catch (error) {
        console.log("face error in search api call function", error);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSubmitLocation = (event: string | any) => {
    event.preventDefault();
  };

  const handleSuggestionClick = (value: string) => {
    setSearchLocation(value);
    setShowSuggestions(false);
  };
  setPlace(searchLocation);

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
          );
        } catch (error) {
          console.log("error in click and get live location", error);
        }
      });
    }
  };
  return (
    <>
      <div className={`navbar ${modeOfColor} border-[1px] border-b-slate-900`}>
        <div className="flex-1">
          <p className="btn btn-ghost text-xl">Winter360°</p>
        </div>
        <div className="flex-none lg:gap-5 md:lg:gap-5">
          <MdOutlineMyLocation
            onClick={() => handleCurrentLocation()}
            className="cursor-pointer tooltip tooltip-open tooltip-bottom"
            data-tip="hello"
          />
          <IoLocation className="cursor-pointer " />
          <h1>{searchLocation}</h1>
          <div className="form-control">
            <form onSubmit={(event) => handleSubmitLocation(event)}>
              <input
                type="text"
                placeholder="Enter location"
                className={`input input-bordered w-24 md:w-auto ${modeOfColor}`}
                onChange={(event) => searchLocationFunction(event.target.value)}
                value={searchLocation}
              />
              <button className="btn btn-outline btn-info ml-1">Search</button>
              <Suggestionbox
                {...{
                  showSuggestions,
                  suggestions,
                  handleSuggestionClick,
                  error,
                }}
              />
            </form>
          </div>
          <div className="w-5 rounded-full">
            {/* ----------Dark mode start-------------- */}

            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                className="theme-controller"
                value="synthwave"
              />

              {/* sun icon */}
              <svg
                onClick={() => setModeOfColor("base-content")}
                className="swap-on fill-current w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                onClick={() => setModeOfColor("bg-base-100")}
                className="swap-off fill-current w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>

            {/* ----------Dark mode end-------------- */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

export function Suggestionbox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error,
}: {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
}) {
  return (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul
          className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px]
    flex flex-col gap-1 py-2 px-2"
        >
          <li className="coursor-pointer p-1 rounded hover:bg-gray-200">
            {error}
          </li>
          {suggestions?.map((item: string, key: string | number) => (
            <li
              key={key}
              onClick={() => handleSuggestionClick(item)}
              className="cursor-pointer p-1 rounded hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
