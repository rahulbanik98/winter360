import { atom } from "jotai";

const pullData = atom<string | any>("");
const realtimeLocation = atom<object | any>({});
const dataFlag = atom<boolean>(false);

export { pullData, realtimeLocation, dataFlag };
