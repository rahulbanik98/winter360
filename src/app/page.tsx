'use client'
import React, { FC, useEffect, useState } from 'react';
import { Dynamicbodycontainer, Dynamicforecastweatherdetails, Dynamicnavbar, DynamicweatherDetails, Dynamicweathericon } from '@/components';
import { getLiveData } from '@/utils/getData';
import { convertToAMPM, convertToCelcius, convertWindSpeed, getDayOrNightIcon, metersToKilometers } from '@/utils/Utilstempfunctions';
import { fromUnixTime } from 'date-fns';

const Home: FC = () => {
  const [weatherDataState, setWeatherDataState] = useState<undefined | any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const liveWeatherData = await getLiveData("kolkata");
        setWeatherDataState(liveWeatherData);
      } catch (error) {
        console.log('API not working', error);
      }
    };

    fetchData();

  }, []);

  const todayData: string | undefined = weatherDataState?.data?.list[0]?.dt_txt;
  const feelLikeTemp = weatherDataState?.data?.list[0]?.main?.feels_like;
  const temprature = weatherDataState?.data?.list[0]?.main?.temp;
  const maxTodayTemp = weatherDataState?.data?.list[0]?.main?.temp_max;
  const minTodayTemp = weatherDataState?.data?.list[0]?.main?.temp_min;
  // console.log(weatherDataState?.data?.list[0]?.weather[0]?.icon);
  const loveIcons = weatherDataState?.data?.list[0]?.weather[0]?.icon
  console.log("weatherDataState", weatherDataState?.data);


  const uniqueDates = [
    ...new Set(
      weatherDataState?.data?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    )
  ];
  console.log('uniqueDates', uniqueDates);

  // Filtering data to get the first entry after 6 AM for each unique date
  const firstDataForEachDate = uniqueDates.map((date) => {
    return weatherDataState?.data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });
  console.log("firstDataForEachDate", firstDataForEachDate);

  return (
    <>
      <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
        <Dynamicnavbar />
        <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="flex gap-1 text-2xl items-end">
                <p>{todayData}</p>
              </h2>
            </div>
            <Dynamicbodycontainer className="gap-10 px-6 items-center">
              <div className="flex flex-col px-4">
                <span className="text-5xl">
                  {parseInt(convertToCelcius(temprature || '0'))}°
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>Feels like</span>
                  <span>{parseInt(convertToCelcius(feelLikeTemp || '0'))}°</span>
                </p>
                <div className="flex gap-4">
                  <p className="text-xs space-x-2">
                    {parseInt(convertToCelcius(maxTodayTemp || '0'))}°↑
                  </p>
                  <p className="text-xs space-x-2">
                    {parseInt(convertToCelcius(minTodayTemp || '0'))}°↓
                  </p>
                </div>
              </div>
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {weatherDataState?.data?.list?.map((value: any, key: any) => (
                  <div
                    key={key}
                    className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                  >
                    <p className='whitespace-nowrap'>{value.dt_txt}</p>
                    <Dynamicweathericon iconName={getDayOrNightIcon(weatherDataState?.data?.list[0]?.weather[0]?.icon, weatherDataState?.data?.list[0]?.dt_txt
                    )} />
                    <p>{parseInt(convertToCelcius(temprature || '0'))}°</p>
                  </div>
                ))}
              </div>

            </Dynamicbodycontainer>

            <div className='flex gap-4'>
              {/* LEFT */}
              <Dynamicbodycontainer className='w-fit justify-center flex-col px-4 items-center'>
                <p className='capitalize text-center'>{
                  weatherDataState?.data?.list[0]?.weather[0]?.description}</p>
                <Dynamicweathericon iconName={getDayOrNightIcon(weatherDataState?.data?.list[0]?.weather[0]?.icon ?? "", weatherDataState?.data?.list[0]?.dt_txt ?? ""
                )} />
              </Dynamicbodycontainer>
              <Dynamicbodycontainer className='bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto'>
                <DynamicweatherDetails
                  visability={metersToKilometers(weatherDataState?.data?.list[0]?.visibility)}
                  airPressure={`${weatherDataState?.data?.list[0]?.main?.pressure}`}
                  humidity={`${weatherDataState?.data?.list[0]?.main?.humidity}%`}
                  sunrise={convertToAMPM(weatherDataState?.data?.city?.sunrise) ?? 1702949452}
                  sunset={convertToAMPM(weatherDataState?.data?.city.sunset) ?? 170251765}
                  windSpeed={convertWindSpeed(weatherDataState?.data?.list[0]?.wind?.speed ?? 1.64)}
                />
              </Dynamicbodycontainer>
            </div>
          </section>



          <section className='flex w-full flex-col gap-4'>
            <p className='text-2xl'>Forecast (7 Days)</p>
            {
              firstDataForEachDate.map((value, key: string | number) => (
                <Dynamicforecastweatherdetails
                  key={key}
                  visability={metersToKilometers(weatherDataState?.data?.list[0]?.visibility)}
                  airPressure={`${weatherDataState?.data?.list[0]?.main?.pressure}`}
                  humidity={`${weatherDataState?.data?.list[0]?.main?.humidity}%`}
                  sunrise={convertToAMPM(weatherDataState?.data?.city?.sunrise) ?? 1702949452}
                  sunset={convertToAMPM(weatherDataState?.data?.city.sunset) ?? 170251765}
                  windSpeed={convertWindSpeed(weatherDataState?.data?.list[0]?.wind?.speed ?? 1.64)}
                />
              ))
            }


          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
