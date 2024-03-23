import React, { useState, useCallback, useEffect } from "react";
import { MdOutlineMyLocation } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import axios from "axios";
import { useAtom } from "jotai";
import { lightDark, placeAtom, pullData } from "@/app/atom";
import { getLiveData } from "@/utils/getData";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const [place, setPlace] = useAtom(placeAtom);
  const [modeOfColor, setModeOfColor] = useAtom(lightDark);
  const [navData, setNavData] = useAtom(pullData);
  const [error, setError] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [temp, setTemp] = useState<any>(); // Adjust the type accordingly
  const API_KEY: string = process.env.KEY || "";

  const handleSubmitLocation = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    },
    []
  );

  const handleSuggestionClick = useCallback((value: string) => {
    setPlace(value);
    setShowSuggestions(false);
  }, []);

  const handleCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response: any = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c7c2019001c1b2b74632c8200ad139e5&cnt=56`
          );
          setTemp(response);
        } catch (error) {
          console.log("error in click and get live location || ", error);
        }
      });
    }
  }, []);

  const submitLiveLocation = async () => {
    const response = await getLiveData(place);
    setNavData(response);
  };
  
  useEffect(() => {
    submitLiveLocation();
  }, []);

  // console.log("navData", navData);
  // console.log("temp", temp);
  
  return (
    <>
      <div className={`navbar ${modeOfColor} border-[1px] border-b-slate-900`}>
        <div className="flex-1">
          <p className="btn btn-ghost text-xl">Winter360°</p>
        </div>
        <div className="flex-none lg:gap-5 md:lg:gap-5">
          <MdOutlineMyLocation
            onClick={handleCurrentLocation}
            className="cursor-pointer tooltip tooltip-open tooltip-bottom"
            data-tip="hello"
          />
          <IoLocation className="" />
          {navData?.data?.city?.country ? (
            <h1>{`${navData?.data?.city?.country}, ${
              navData?.data?.city?.name || temp?.data?.name
            }`}</h1>
          ) : null}
          <div className="form-control">
            <form onSubmit={handleSubmitLocation}>
              <input
                type="text"
                placeholder="Enter location"
                className={`input input-bordered w-24 md:w-auto ${modeOfColor}`}
                onChange={(event) => setPlace(event.target.value)}
                value={place}
              />
              <button
                className="btn btn-outline btn-info ml-1"
                onClick={() => submitLiveLocation()}
              >
                Search
              </button>
              {showSuggestions && (
                <Suggestionbox
                  suggestions={suggestions}
                  handleSuggestionClick={handleSuggestionClick}
                  error={error}
                />
              )}
            </form>
          </div>
          <div className="w-5 rounded-full">{/* Dark mode components */}</div>
        </div>
      </div>
    </>
  );
};

interface SuggestionboxProps {
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
}

const Suggestionbox: React.FC<SuggestionboxProps> = ({
  suggestions,
  handleSuggestionClick,
  error,
}) => (
  <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2">
    <li className="cursor-pointer p-1 rounded hover:bg-gray-200">{error}</li>
    {suggestions.map((item: string, index: number) => (
      <li
        key={index}
        onClick={() => handleSuggestionClick(item)}
        className="cursor-pointer p-1 rounded hover:bg-gray-200"
      >
        {item}
      </li>
    ))}
  </ul>
);

export default Navbar;
