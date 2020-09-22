import { sampleData } from "./sampleData";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const fetchData = () => {
  return delay(2000).then(() => {
    return new Promise((res) => {
      res(sampleData.events);
    });
  });
};
