import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { BasicLayoutProps, Settings as LayoutSettings } from '@ant-design/pro-layout';
import { notification } from 'antd';
import React from 'react';
import { history, RequestConfig } from 'umi';
import { ResponseError } from 'umi-request';
import defaultSettings from '../config/defaultSettings';
import { queryMe } from './services/user';

export interface InitialStateTypes {
  token?: string;
  user?: API.CurrentUser;
  settings?: LayoutSettings;
}

const resetInitialState = () => {
  localStorage.removeItem('avy-token');
  return {
    token: '',
    settings: defaultSettings,
  };
};

export async function getInitialState(): Promise<InitialStateTypes> {
  const token = localStorage.getItem('avy-token');
  if (history.location.pathname !== '/login' && token) {
    const response = await queryMe(token);
    if (response?.data?.id) {
      return {
        token,
        user: response.data,
        settings: defaultSettings,
      };
    }
    return resetInitialState();
  }
  return resetInitialState();
}

export const layout = ({
  initialState,
}: {
  initialState: { token: string; user?: API.CurrentUser; settings: LayoutSettings };
}): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      if (!initialState?.token && history.location.pathname !== '/login') {
        history.push('/login');
      }
    },
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};

const codeMessage = {
  200: 'The server successfully returned the requested data. ',
  201: 'New or modified data is successful. ',
  202: 'A request has entered the background queue (asynchronous task). ',
  204: 'Delete data successfully. ',
  400: 'The request was sent with an error. The server did not perform any operations to create or modify data. ',
  401: 'The user does not have permission (token, username, password is incorrect). ',
  403: 'User is authorized, but access is forbidden. ',
  404: 'The request sent is for a record that does not exist and the server is not operating. ',
  406: 'The format of the request is not available. ',
  410: 'The requested resource is permanently deleted and will not be obtained again. ',
  422: 'When creating an object, a validation error occurred. ',
  500: 'The server has an error. Please check the server. ',
  502: 'Gateway error. ',
  503: 'The service is unavailable, the server is temporarily overloaded or maintained. ',
  504: 'The gateway timed out. ',
};

const errorHandler = (error: ResponseError) => {
  const { response, data } = error;

  if (response && response.status) {
    const errorText =
      data.description || data.message || codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `error ${status}: ${url}`,
      description: errorText,
    });
  }

  if (!response) {
    notification.error({
      message: error.toString(),
      description: error.toString(),
    });
  }
  throw error;
};

export const request: RequestConfig = {
  errorHandler,
};
