import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 200,
  duration: '30s',
};

const BASE_URL = 'http://staging-alb-1145366645.ap-northeast-2.elb.amazonaws.com/user';

export default function () {
  // GET 전체 조회만 반복
  const res = http.get(BASE_URL);
  check(res, { 'GET 성공': (r) => r.status === 200 });
  sleep(1);
}
