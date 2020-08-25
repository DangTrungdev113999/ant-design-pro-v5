import { request } from 'umi';

import { API_URL } from '@/constants';

export async function queryMe(token: string) {
  return request(`${API_URL}/operators/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function query() {
  return request<API.CurrentUser[]>('/api/users');
}

export async function queryCurrent() {
  return request<API.CurrentUser>('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}
