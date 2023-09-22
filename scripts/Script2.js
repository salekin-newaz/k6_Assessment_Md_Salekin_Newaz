import http from "k6/http";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { sleep, check } from "k6";
import { envdata, csvdata } from "../utils/helper.js";


const env = envdata();
const csv = csvdata();

export const options = {
  scenarios: {
    constant_vus: {
      executor: 'constant-vus',
      vus: 30,      
      duration: '2m',
    },
  },
thresholds: {

      http_req_duration: ['p(95)<500'],
      http_req_failed: ['rate<0.05'],
      http_reqs: ['rate<25'],
  },

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
  const classroomCourse = http.get(`${env.baseUrl}/classroom?onlyPublished=true&dateFilter=2023-05-27&pageSize=1000&onlyWithAvailableSlot=true`, { headers: data.headers });
  check(classroomCourse, { "check class room course api status 200": (r) => r.status === 200 });

  const boatInfo = http.get(`${env.baseUrl}/boat`, { headers: data.headers });
  check(boatInfo, { "check boat info api status 200": (r) => r.status === 200 });

  const appVersion = http.get(`${env.baseUrl}/customer/appVersion`);
  check(appVersion, { "check app version api status 200": (r) => r.status === 200 });

  const bunkers = http.get(`${env.baseUrl}/port/bunkers?pageSize=1000`);
  check(bunkers, { "check bunkers api status 200": (r) => r.status === 200 });

  const attractions = http.get(`${env.baseUrl}/port/attractions?pageSize=9000`);
  check(attractions, { "check attractions api status 200": (r) => r.status === 200 });

  const partner = http.get(`${env.baseUrl}/partner?onlyPublished=true&pageSize=1000`);
  check(partner, { "check partner api status 200": (r) => r.status === 200 });
  sleep(1);

}
export function handleSummary(data) {
  return {
    "Script2Result.html": htmlReport(data),
  };
}