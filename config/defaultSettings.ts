import { logo } from '@/assets/logo.svg';
import { Settings as LayoutSettings } from '@ant-design/pro-layout';

export default {
  navTheme: 'realDark',
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  menu: {
    locale: false,
  },
  logo: '/logo.png',
  title: 'Avy - Kế toán tài chính',
  pwa: false,
  iconfontUrl: '/logo.png',
} as LayoutSettings & {
  pwa: boolean;
};
