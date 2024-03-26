import { atom } from "jotai";

const pullData = atom<string | any>("");
const realtimeLocation = atom<object | any>({});
const dataFlag = atom<boolean | any>(false);

export { pullData, realtimeLocation, dataFlag };
