/* eslint-disable no-param-reassign */
import { request } from 'umi';
import { BASE_MANGO_URL } from '@/constants';
import { toQueryString, normalizeParams } from '@/utils/utils';

export async function queryDebtList(token: any, params: Object) {
  return request(
    `${BASE_MANGO_URL}/operators/debt${toQueryString(normalizeParams(params))
      .replace(/descend/g, 'desc')
      .replace(/ascend/g, 'asc')}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}
