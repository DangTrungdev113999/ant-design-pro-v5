import { request } from 'umi';
import { API_URL } from '@/constants';

export interface LoginParamsType {
  phone?: string;
  password: string;
}

export async function login({ phone, password }: LoginParamsType) {
  return request(`${API_URL}/operators/login`, {
    method: 'POST',
    data: {
      phone,
      password,
    },
  });
}
