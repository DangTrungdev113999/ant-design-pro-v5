import React, { useState } from 'react';
import { Checkbox } from 'antd';
import { Link, SelectLang } from 'umi';
import { useRequest } from '@umijs/hooks';

import logo from '@/assets/logo.png';
import Footer from '@/components/Footer';
import { login } from '@/services/auth';
import { replaceGoto } from '@/utils/utils';
import LoginFrom from './components';
import styles from './style.less';

const { Username, Password, Submit } = LoginFrom;

const Login: React.FC = () => {
  const [autoLogin, setAutoLogin] = useState(true);

  const { loading, run } = useRequest(login, {
    manual: true,
    onSuccess: (result) => {
      if (result.status === 'ok') {
        localStorage.setItem('avy-token', result.data.token);
        replaceGoto();
      }
    },
  });

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
              <span className={styles.title}>Avy - Hành chính kế toán </span>
            </Link>
          </div>
          <div className={styles.desc}>FinX group</div>
        </div>

        <div className={styles.main}>
          <LoginFrom onSubmit={run}>
            <Username
              name="phone"
              placeholder="Số điện thoại"
              defaultValue="+84378345621"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số điện thoại',
                },
              ]}
            />

            <Password
              name="password"
              placeholder=" Mật khẩu"
              defaultValue="123456"
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
            <Submit loading={loading}>Đăng nhập</Submit>
          </LoginFrom>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
