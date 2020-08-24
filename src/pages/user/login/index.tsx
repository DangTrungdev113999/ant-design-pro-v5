import { Alert, Checkbox, message } from 'antd';
import React, { useState } from 'react';
import { Link, SelectLang, useModel } from 'umi';
import { getPageQuery } from '@/utils/utils';
import logo from '@/assets/logo.png';
import { LoginParamsType, fakeAccountLogin } from '@/services/login';
import Footer from '@/components/Footer';
import LoginFrom from './components/Login';
import styles from './style.less';

const {  Username, Password,  Submit } = LoginFrom;

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

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

const Login: React.FC<{}> = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginStateType>({});
  const [submitting, setSubmitting] = useState(false);

  const { refresh } = useModel('@@initialState');
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('account');

  const handleSubmit = async (values: LoginParamsType) => {
    setSubmitting(true);
    try {
      const msg = await fakeAccountLogin({ ...values, type });
      if (msg.status === 'ok') {
        message.success('Đăng nhập thành công!');
        replaceGoto();
        setTimeout(() => {
          refresh();
        }, 0);
        return;
      }
      setUserLoginState(msg);
    } catch (error) {
      message.error('Đăng nhập thất bại！');
    }
    setSubmitting(false);
  };

  const { status, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.lang}>
        <SelectLang />
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>Avy - Hành chính kế toán</span>
            </Link>
          </div>
          <div className={styles.desc}>FinX group</div>
        </div>

        <div className={styles.main}>
          <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
              {status === 'error' && loginType === 'account' && !submitting ? (
                <LoginMessage content="Sai tài khoản hoặc mật khẩu" />
              ) : null}

              <Username
                name="username"
                placeholder="admin or user"
                defaultValue="admin"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập số điện thoại',
                  },
                ]}
              />
              <Password
                name="password"
                placeholder=" ant.design"
                defaultValue="ant.design"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu！',
                  },
                ]}
              />

            <div>
              <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
                Nhớ tài khoản
              </Checkbox>
            </div>
            <Submit loading={submitting}>Đăng nhập</Submit>
          </LoginFrom>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
