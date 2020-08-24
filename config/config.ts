// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    name: 'Ant Design Pro',
    locale: true,
    siderWidth: 250,
  },
  locale: {
    default: 'en-US',
    antd: false,
    baseNavigator: false,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/1',
      name: 'Hoạch toán giao dịch',
      icon: 'dashboard',
      component: './Welcome',
    },
    {
      path: '/2',
      name: 'Lệnh chuyển tiền',
      icon: 'dashboard',
      component: './Welcome',
    },
    {
      path: '/3',
      name: 'Đối soát',
      icon: 'dashboard',
      component: './Welcome',
    },
    {
      path: '/4 ',
      name: 'Báo cáo kế toán',
      icon: 'smile',
      component: './Welcome',
    },
    {
      path: '/5',
      name: 'Báo cáo rủi ro ',
      icon: 'dashboard',
      component: './Welcome',
    },
    {
      path: '/6',
      name: 'B/c dữ liệu khoản vay',
      icon: 'dashboard',
      component: './Welcome',
      routes: [
        {
          path: '/6/1',
          name: 'Báo cáo thanh toán',
          icon: 'smile',
          component: './Welcome',
        },
        {
          path: '/6/2',
          name: 'Báo cáo trả chậm',
          icon: 'smile',
          component: './Welcome',
        },
        {
          path: '/6/3',
          name: 'Báo cáo nợ xấu',
          icon: 'smile',
          component: './Welcome',
        },
      ],
    },
    {
      path: '/7',
      name: 'Báo cáo tài khoản',
      icon: 'dashboard',
      component: './Welcome',
    },
    {
      path: '/8',
      name: 'Báo cáo giao dịch',
      icon: 'dashboard',
      component: './Welcome',
    },
    {
      path: '/9',
      name: 'B/c dữ liệu khách hàng',
      icon: 'dashboard',
      component: './Welcome',
      routes: [
        {
          path: '/9/1',
          name: 'B/c dữ liệu người vay',
          icon: 'smile',
          component: './Welcome',
        },
        {
          path: '/9/2',
          name: 'B/c dữ liệu nhà đầu tư',
          icon: 'smile',
          component: './Welcome',
        },
      ],
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      icon: 'dashboard',
      component: './Welcome',
    },
    {
      path: '/welcome',
      name: 'welcome',
      icon: 'smile',
      component: './Welcome',
    },
    {
      path: '/admin',
      name: 'admin',
      icon: 'crown',
      access: 'canAdmin',
      component: './Admin',
      routes: [
        {
          path: '/admin/sub-page',
          name: 'sub-page',
          icon: 'smile',
          component: './Welcome',
        },
      ],
    },
    {
      name: 'list.table-list',
      icon: 'table',
      path: '/list',
      component: './ListTableList',
    },
    {
      path: '/',
      redirect: '/welcome',
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
