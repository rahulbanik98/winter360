"use client";

import React, { FC } from "react";
import Head from "next/head";
import {
  Dynamicbodycontainer,
  Dynamicforecastweatherdetails,
  DynamicweatherDetails,
  Dynamicweathericon,
} from "@/components";
import {
  convertToAMPM,
  convertToCelcius,
  convertWindSpeed,
  getDayOrNightIcon,
  metersToKilometers,
} from "@/utils/Utilstempfunctions";
import { pullData } from "./atom";
import { useAtom } from "jotai";
import Basicnav from "../components/Basicnav";

interface WeatherEntry {
  dt: number;
  // Add other properties as needed
}

const Home = () => {
  const [navData] = useAtom<any>(pullData);

  const feelLikeTemp = navData?.data?.list[0]?.main?.feels_like;
  const temprature = navData?.data?.list[0]?.main?.temp;
  const maxTodayTemp = navData?.data?.list[0]?.main?.temp_max;
  const minTodayTemp = navData?.data?.list[0]?.main?.temp_min;
  const loveIcons = navData?.data?.list[0]?.weather[0]?.icon;
  console.log("temprature", navData?.data?.list[0]?.main?.temp);

  const uniqueDates: string[] | unknown[] | any = [
    ...new Set(
      navData?.data?.list.map(
        (entry: WeatherEntry) =>
          new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  // Filtering data to get the first entry after 6 AM for each unique date
  const firstDataForEachDate: (WeatherEntry | undefined)[] = uniqueDates.map(
    (date: string) => {
      return navData?.data?.list.find((entry: WeatherEntry) => {
        const entryDate: string = new Date(entry.dt * 1000)
          .toISOString()
          .split("T")[0];
        const entryTime: number = new Date(entry.dt * 1000).getHours();
        return entryDate === date && entryTime >= 6;
      });
    }
  );
  console.log(navData);

  return (
    <>
      <Head>
        <meta
          property="og:https://ucarecdn.com/05f649bf-b70b-4cf8-90f7-2588ce404a08/-/quality/lightest/"
          content="URL_of_your_image"
        />
      </Head>
      <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
        <Basicnav />
        {/* <Dynamicnavbar /> */}
        <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
          <section className="space-y-4">
            {navData?.data?.list[0]?.dt_txt ? (
              <div className="space-y-2">
                <h2 className="flex gap-1 text-2xl items-end">
                  <p>{navData?.data?.list[0]?.dt_txt}</p>
                </h2>
              </div>
            ) : (
              <div className="lg:w-[20%] md:w-[20%] sm:w-2/3 h-8 bg-gray-300 rounded" />
            )}
            <Dynamicbodycontainer className="gap-10 px-6 items-center">
              <div className="flex flex-col px-6">
                {temprature ? (
                  <div className="mb-4">
                    <div className="w-full h-20 rounded flex items-center content-center">
                      <span className="text-5xl">
                        {parseInt(convertToCelcius(temprature))}°
                      </span>
                    </div>
                    <div className="w-full h-4 rounded mb-2">
                      <p className="text-xs space-x-1 whitespace-nowrap">
                        <span>Feels like</span>
                        <span>
                          {parseInt(convertToCelcius(feelLikeTemp || "0"))}°
                        </span>
                      </p>
                    </div>
                    <div className="flex gap-6">
                      <div className="h-4 rounded mb-2">
                        <p className="text-xs space-x-2">
                          {parseInt(convertToCelcius(maxTodayTemp || "0"))}°↑
                        </p>
                      </div>
                      <div className="h-4 rounded mb-2">
                        <p className="text-xs space-x-2">
                          {parseInt(convertToCelcius(minTodayTemp || "0"))}°↓
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white animate-pulse mb-4">
                    <div className="w-full h-20 bg-gray-300 rounded px-10 mb-2"></div>
                    <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="flex gap-2">
                      <div className="w-2/3 h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="w-2/3 h-4 bg-gray-300 rounded mb-2"></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {navData?.data?.list?.map((value: any, key: any) => (
                  <div
                    key={key}
                    className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                  >
                    <p className="whitespace-nowrap">{value.dt_txt}</p>
                    <Dynamicweathericon
                      iconname={getDayOrNightIcon(
                        navData?.data?.list[0]?.weather[0]?.icon,
                        navData?.data?.list[0]?.dt_txt
                      )}
                    />
                    <p>{parseInt(convertToCelcius(temprature || "0"))}°</p>
                  </div>
                ))}
              </div>
            </Dynamicbodycontainer>
            <div className="flex gap-4">
              {/* LEFT */}
              <Dynamicbodycontainer className="w-fit justify-center flex-col px-4 items-center">
                <p className="capitalize text-center">
                  {navData?.data?.list[0]?.weather[0]?.description}
                </p>
                <Dynamicweathericon
                  iconname={getDayOrNightIcon(
                    navData?.data?.list[0]?.weather[0]?.icon ?? "",
                    navData?.data?.list[0]?.dt_txt ?? ""
                  )}
                />
              </Dynamicbodycontainer>
              <Dynamicbodycontainer className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto">
                <DynamicweatherDetails
                  visability={metersToKilometers(
                    navData?.data?.list[0]?.visibility
                  )}
                  airPressure={`${navData?.data?.list[0]?.main?.pressure}`}
                  humidity={`${navData?.data?.list[0]?.main?.humidity}%`}
                  sunrise={
                    convertToAMPM(navData?.data?.city?.sunrise) ?? 1702949452
                  }
                  sunset={
                    convertToAMPM(navData?.data?.city.sunset) ?? 170251765
                  }
                  windSpeed={convertWindSpeed(
                    navData?.data?.list[0]?.wind?.speed ?? 1.64
                  )}
                />
              </Dynamicbodycontainer>
            </div>
          </section>

          <section className="flex w-full flex-col gap-4">
            <p className="text-2xl">Forecast (7 Days)</p>
            {firstDataForEachDate.map((value: any, key: string | number) => (
              <Dynamicforecastweatherdetails
                key={key}
                weatehrIcon={value?.weather[0]?.icon}
                temprature={value?.main?.temp === undefined ? 304.53 : value?.main?.temp}
                feels_like={value?.main?.feels_like}
                date={value?.dt_txt}
                visability={metersToKilometers(value?.visibility === "NaN" ? "10km" : value?.visibility)}
                humidity={`${value?.main?.humidity}%`}
                windSpeed={convertWindSpeed(value?.main?.speed ?? 1.64)}
                airPressure={`${value?.main?.pressure}`}
                sunrise={
                  convertToAMPM(navData?.data?.city?.sunrise) ?? 1702949452
                }
                sunset={convertToAMPM(navData?.data?.city.sunset) ?? 170251765}
              />
            ))}
          </section>
        </main>
      </div>
      <div className="bg-gray-300 items-center text-center">
        {/* pre-alpha, alpha, beta */}
        <p>Beta 1.5.3| &copy; 2024 Rahul Banik</p>
      </div>
    </>
  );
};

export default Home;
