'use client'
import React, { FC, useEffect, useState } from 'react';
import { Dynamicbodycontainer, Dynamicnavbar } from '@/components';
import { getLiveData } from '@/utils/getData';
import { convertToCelcius } from '@/utils/Utilstempfunctions';

interface WeatherData {
  data: {
    list: {
      dt_txt: string;
      main: {
        feels_like: string;
        temp: string;
        temp_max: string;
        temp_min: string;
      };
    }[];
  };
}

const Home: FC = () => {
  const [weatherDataState, setWeatherDataState] = useState<WeatherData>();

  useEffect(() => {
    (async () => {
      try {
        const liveWeatherData = await getLiveData();
        setWeatherDataState(liveWeatherData);
      } catch (error) {
        console.log('API not working', error);
      }
    })();
  }, []);

  console.log('weatherDataState', weatherDataState);

  const todayData: string | undefined = weatherDataState?.data?.list[0]?.dt_txt;

  const feelLikeTemp = weatherDataState?.data?.list[0]?.main?.feels_like;

  const temprature = weatherDataState?.data?.list[0]?.main?.temp;

  const maxTodayTemp = weatherDataState?.data?.list[0]?.main?.temp_max;

  const minTodayTemp = weatherDataState?.data?.list[0]?.main?.temp_min;

  // console.log('temprature', temprature);

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
                  {parseInt(convertToCelcius(temprature))}°
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>Feels like</span>
                  <span>{parseInt(convertToCelcius(feelLikeTemp))}°</span>
                </p>
                <div className="flex gap-4">
                  <p className="text-xs space-x-2">
                    {parseInt(convertToCelcius(maxTodayTemp))}°↑
                  </p>
                  <p className="text-xs space-x-2">
                    {parseInt(convertToCelcius(minTodayTemp))}°↓
                  </p>
                </div>
              </div>
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {weatherDataState?.data?.list?.map(
                  (value: string | object, key: number) => (
                    <div
                      key={key}
                      className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                    >
                      <p>{value.dt_txt}</p>
                    </div>
                  )
                )}
              </div>
            </Dynamicbodycontainer>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;