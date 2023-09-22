import http from "k6/http";
import { sleep } from "k6";

export function setup() {
  return {};
}

export default function (data) {
  // parallel api call
  const req1 = { method: "GET", url: "http://localhost:9090/api/v1/api1" };
  const req2 = { method: "GET", url: "http://localhost:9090/api/v1/api2" };
  const req3 = { method: "GET", url: "http://localhost:9090/api/v1/api3" };
  const req4 = { method: "GET", url: "http://localhost:9090/api/v1/api4" };
  const req5 = { method: "GET", url: "http://localhost:9090/api/v1/api5" };
  const req6 = { method: "GET", url: "http://localhost:9090/api/v1/api1" };
  const req7 = { method: "GET", url: "http://localhost:9090/api/v1/api2" };
  const req8 = { method: "GET", url: "http://localhost:9090/api/v1/api3" };
  const req9 = { method: "GET", url: "http://localhost:9090/api/v1/api4" };
  const req10 = { method: "GET", url: "http://localhost:9090/api/v1/api5" };
  http.batch([req1, req2, req3, req4, req5, req6, req7, req8, req9, req10]);
  sleep(2);

  // sequencial api call
  http.request("GET", "http://localhost:9090/api/v1/api1");
  http.request("GET", "http://localhost:9090/api/v1/api2");
  http.request("GET", "http://localhost:9090/api/v1/api3");
  http.request("GET", "http://localhost:9090/api/v1/api4");
  http.request("GET", "http://localhost:9090/api/v1/api5");
  http.request("GET", "http://localhost:9090/api/v1/api1");
  http.request("GET", "http://localhost:9090/api/v1/api2");
  http.request("GET", "http://localhost:9090/api/v1/api3");
  http.request("GET", "http://localhost:9090/api/v1/api4");
  http.request("GET", "http://localhost:9090/api/v1/api5");
  sleep(2);
}
