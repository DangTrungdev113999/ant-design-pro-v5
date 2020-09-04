/* eslint-disable no-param-reassign */
import { parse } from 'querystring';
import moment from 'moment';
import { QueryParamsType } from '@/hoocks/useHandleTableData';
/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getPageQuery = () => {
  const { href } = window.location;
  const qsIndex = href.indexOf('?');
  const sharpIndex = href.indexOf('#');

  if (qsIndex !== -1) {
    if (qsIndex > sharpIndex) {
      return parse(href.split('?')[1]);
    }

    return parse(href.slice(qsIndex + 1, sharpIndex));
  }

  return {};
};

export const replaceGoto = () => {
  const urlParams = new URL(window.location.href);
  const params = getPageQuery();

  let { redirect } = params as { redirect: string };
  if (redirect) {
    const redirectUrlParams = new URL(redirect);
    if (redirectUrlParams.origin === urlParams.origin) {
      redirect = redirect.substr(urlParams.origin.length);
      if (redirect.match(/^\/.*#/)) {
        redirect = redirect.substr(redirect.indexOf('#'));
      }
    } else {
      window.location.href = '/';
      return;
    }
  }
  window.location.href = urlParams.href.split(urlParams.pathname)[0] + (redirect || '/');
};

export const createImageFormData = (image: File, body: Record<string, string>) => {
  const data = new FormData();

  data.append('file', image);

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

export function toQueryString(params: QueryParamsType) {
  return Object.keys(params)
    .reduce((mem, key) => {
      if (params[key]) {
        return `${mem}${key}=${encodeURIComponent(params[key])}&`;
      }
      return mem;
    }, '?')
    .slice(0, -1);
}

export function timeFormatter(time: string, format = 'DD/MM/YYYY') {
  return moment(time).format(format);
}

export function updateLocationWithQuery(history: any, queryPrams: QueryParamsType) {
  history?.push({
    pathname: window.location.pathname,
    search: toQueryString(queryPrams),
  });
}

export function showTotal(pagination: Object | any) {
  const pageSize = pagination?.pageSize || 10;
  const current = pagination?.current || 1;
  return () =>
    `${pageSize * current - pageSize + 1} - ${pageSize * current} trên tổng ${pagination?.total}`;
}

export const normalizeParams = (params: QueryParamsType, type = '') => {
  if (type === 'mongo') {
    const queryParams: QueryParamsType = {
      ...params,
      num_page: params.current,
      page_size: params.pageSize,
    };
    delete queryParams.filters;
    delete queryParams.current;
    delete queryParams.pageSize;
    return queryParams;
  }
  const queryParams: QueryParamsType = {
    ...params,
    currentPage: params.current,
  };
  delete queryParams.filters;
  delete queryParams.current;
  return queryParams;
};

// TODO findout
export function parseNumberWithDot(value = 0) {
  if (!value) {
    return '0';
  }
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
