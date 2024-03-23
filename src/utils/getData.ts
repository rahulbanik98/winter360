import axios, { AxiosResponse } from "axios";

// const API_URL = process.env.KEY;
const DEV_API_URL = "https://api.openweathermap.org/data/2.5/forecast?q=";

const getLiveData = async (inputData:string="kolklata"):Promise<AxiosResponse> => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${inputData ? inputData : "kolkata"}&appid=c7c2019001c1b2b74632c8200ad139e5&cnt=56`
  );
  return response;
};

export { getLiveData };
