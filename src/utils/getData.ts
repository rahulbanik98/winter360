import axios, { AxiosResponse } from "axios";

// const API_URL = process.env.KEY;
const DEV_API_URL = "https://api.openweathermap.org/data/2.5/forecast?q=";
const API_KEY = "c7c2019001c1b2b74632c8200ad139e5&cnt=56";

const getLiveData = async (inputData: string = "kolklata"): Promise<AxiosResponse> => {
  const response = await axios.get(
    `${DEV_API_URL}${inputData ? inputData : "kolkata"}&appid=${API_KEY}`
  );
  return response;
};


const getLiverealtimeLocationData = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response: object = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
        );
        return response;

      } catch (error) {
        console.log("error in click and get live location || ", error);
      }
    });
  }
}

export { getLiveData, getLiverealtimeLocationData };

