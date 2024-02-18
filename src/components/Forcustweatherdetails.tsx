import { metersToKilometers } from "@/utils/Utilstempfunctions";
import { Dynamicbodycontainer, DynamicweatherDetails, Dynamicweathericon } from ".";


export interface ForecastWeatherDetailProps {
  weatehrIcon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
}

export default function ForecastWeatherDetail(
  props: ForecastWeatherDetailProps | any
) {
  const {
    weatehrIcon = "02d",
    date = "19.09",
    day = "Tuesday",
    temp,
    feels_like,
    description
  } = props;
  return (
    <Dynamicbodycontainer className="gap-4">
      {/* left */}
      <section className=" flex gap-4 items-center px-4  ">
        <div className=" flex flex-col gap-1 items-center">
          <Dynamicweathericon iconName={weatehrIcon} />
          <p>{date}</p>
          <p className="text-sm">{day} </p>
        </div>

        {/*  */}
        <div className="flex flex-col px-4">
          <span className="text-5xl">{metersToKilometers(temp ?? 0)}°</span>
          <p className="text-xs space-x-1 whitespace-nowrap">
            <span> Feels like</span>
            <span>{metersToKilometers(feels_like ?? 0)}°</span>
          </p>
          <p className="capitalize"> {description}</p>
        </div>
      </section>
      {/* right */}
      <section className=" overflow-x-auto flex justify-between gap-4 px-4  w-full pr-10">
        <DynamicweatherDetails {...props} />
      </section>
    </Dynamicbodycontainer>
  );
}