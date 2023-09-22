import { sleep } from "k6";
import { envdata, csvdata } from "../utils/helper.js";

const env = envdata();
const csv = csvdata();

export const options = {
  vus: 1,
  duration: "1s",
};

export function setup() {
  return {};
}

export default function (data) {
  console.log(env.baseUrl);
  console.log(csv[0].id);
  sleep(1);
}
