import http from "k6/http";
import { sleep } from "k6";
import { scenario, vu } from "k6/execution";
import { envdata, csvdata } from "../utils/helper.js";

const env = envdata();
const csv = csvdata();

export const options = {
  vus: csv.length,
  iterations: csv.length,
};

export function setup() {
  return {};
}

export default function (data) {
  http.request("GET", `http://localhost:9090/api/v1/apiWithPathData/${scenario.iterationInTest}`);
  sleep(2);
}
