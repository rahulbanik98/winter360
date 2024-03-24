import { atom } from "jotai";

export const pullData = atom<string | any>("");
export const realtimeLocation = atom<object>({});