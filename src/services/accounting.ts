/* eslint-disable no-param-reassign */
import { request } from 'umi';
import { BASE_MANGO_URL, API_URL } from '@/constants';
import { toQueryString, normalizeParams } from '@/utils/utils';
// ======================  Test =================================
export async function queryDebtList(token: object, params: Object) {
  return request(
    `${BASE_MANGO_URL}/operators/debt${toQueryString(normalizeParams(params, 'mongo'))
      .replace(/descend/g, 'desc')
      .replace(/ascend/g, 'asc')}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).then((res: any) => ({
    list: res?.data?.list || {},
    total: res?.data?.pagination?.total || 0,
  }));
}

export async function queryProducts(token: string) {
  return request(`${API_URL}/operators/loan_products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res: any) => ({
    list: res?.data || {},
    total: res?.data?.length || 0,
  }));
}

export async function updateProduct(token: string, params: any) {
  return request(`${API_URL}/operators/loan_products/${params.productId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: params.data,
  });
}

export async function removeProduct(token: string, params: any) {
  return request(`${API_URL}/operators/loan_products/${params.productId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
// ====================== End Test =================================
export async function queryLenders(token: string, params = {}) {
  return request(
    `${API_URL}/operators/lenders${toQueryString(normalizeParams(params))
      .replace(/_descend/g, ' desc')
      .replace(/_ascend/g, ' asc')}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).then((res: any) => ({
    list: res?.data?.list || {},
    total: res?.data?.pagination?.total || 0,
  }));
}

export async function queryBorrowers(token: string, params = {}) {
  return request(
    `${API_URL}/operators/borrowers${toQueryString(normalizeParams(params))
      .replace(/_descend/g, ' desc')
      .replace(/_ascend/g, ' asc')}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).then((res: any) => ({
    list: res?.data?.list || {},
    total: res?.data?.pagination?.total || 0,
  }));
}
