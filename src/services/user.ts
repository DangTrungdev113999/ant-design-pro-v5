import { createImageFormData } from '@/utils/utils';
import { request } from 'umi';

import { API_URL } from '@/constants';

export async function queryMe(token: string) {
  return request(`${API_URL}/operators/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateMe(token: string, params: any) {
  return request(`${API_URL}/operators/me`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { ...params },
  });
}

export async function uploadAvatar(token: string, file: File) {
  return request(`${API_URL}/operators/me/files`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: createImageFormData(file, { type: 'operatorAvatar' }),
  });
}

// export async function query() {
//   return request<API.CurrentUser[]>('/api/users');
// }

// export async function queryCurrent() {
//   return request<API.CurrentUser>('/api/currentUser');
// }

// export async function queryNotices(): Promise<any> {
//   return request<{ data: API.NoticeIconData[] }>('/api/notices');
// }
