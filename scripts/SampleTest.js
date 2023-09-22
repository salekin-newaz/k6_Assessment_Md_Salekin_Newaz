import http from "k6/http";
import { sleep, check } from "k6";
import { envdata, csvdata } from "../utils/helper.js";
import { UserAgentApplication, AuthenticationParameters, Configuration } from "@azure/msal";

const env = envdata();
const csv = csvdata();

export const options = {
  vus: 1,
  duration: "1s",
};

export function setup() {
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${env.token}` };
  const user = http.get(`${env.baseUrl}/user/me`, { headers: headers });

  return {
    headers: headers,
    user: JSON.parse(user.body),
  };
}

export default function (data) {
  const port = http.get(`${env.baseUrl}/port`);
  check(port, { "check port api status 200": (r) => r.status === 200 });

  const review = http.get(`${env.baseUrl}/port/${data.user.sub}/review?pageSize=100`, { headers: data.headers });
  check(review, { "check review api status 204": (r) => r.status === 204 });

  sleep(1);
}
