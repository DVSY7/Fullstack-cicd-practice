import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 200,
  duration: '30s',
};

const BASE_URL = 'http://43.201.96.175:3000/user';

export default function () {
  // GET 전체 조회만 반복
  const res = http.get(BASE_URL);
  check(res, { 'GET 성공': (r) => r.status === 200 });
  sleep(1);
}
