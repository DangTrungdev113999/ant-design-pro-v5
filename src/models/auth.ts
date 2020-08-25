/* eslint-disable consistent-return */
import { useState, useCallback } from 'react';
import { getPageQuery } from '@/utils/utils';
import { useModel } from 'umi';
import { login } from '@/services/auth';

const replaceGoto = () => {
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

export default function useAuthModel() {
  // const { refresh } = useModel('@@initialState');
  const [token, setToken] = useState('');

  const loginDispatch = useCallback(async (params) => {
    try {
      const response = await login(params);
      if (response.status === 'ok') {
        setToken(response.data.token);
        localStorage.setItem('avy-token', response.data.token);
        replaceGoto();
        // setTimeout(() => {
        //   refresh();
        // }, 0);
        return response.data.token;
      }
      return token;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, []);

  return {
    token,
    login: loginDispatch,
  };
}
