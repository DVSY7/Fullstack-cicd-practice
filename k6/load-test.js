import { check, sleep } from 'k6';
import http from 'k6/http';

export const options = {
  vus: 10,
  duration: '30s',
};

const BASE_URL = 'http://43.201.96.175:3000/user';

export default function () {
  // 생성
  const createRes = http.post(BASE_URL, JSON.stringify({ name: 'testuser' }), {
    headers: { 'Content-Type': 'application/json' },
  });
  check(createRes, { 'POST 성공': (r) => r.status === 201 });

  const id = createRes.json('id');

  // 전체조회
  const getAllRes = http.get(BASE_URL);
  check(getAllRes, { 'GET 전체 성공': (r) => r.status === 200 });

  // 단일조회
  const getOneRes = http.get(`${BASE_URL}/${id}`);
  check(getOneRes, { 'GET 단일 성공': (r) => r.status === 200 });

  // 수정
  const updateRes = http.patch(
    `${BASE_URL}/${id}`,
    JSON.stringify({ name: 'updated' }),
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
  check(updateRes, { 'PATCH 성공': (r) => r.status === 200 });

  // 삭제
  const deleteRes = http.request('DELETE', `${BASE_URL}/${id}`);
  check(deleteRes, { 'DELETE 성공': (r) => r.status === 200 });

  sleep(1);
}
