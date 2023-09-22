import http from "k6/http";
import { sleep, check } from "k6";
import { scenario, vu } from "k6/execution";

export const options = {
  vus: 10,
  duration: "50s",
};
export function setup() {}
export default function (data) {
  http.get(`http://localhost:9090/api/v1/apiWithPathData/${vu.idInTest}`);
  sleep(2);
}
export function teardown(data) {}
