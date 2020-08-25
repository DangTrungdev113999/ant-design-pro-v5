import React, { useState } from 'react';
import { Checkbox } from 'antd';
import { Link, SelectLang, useModel } from 'umi';

import logo from '@/assets/logo.png';
import Footer from '@/components/Footer';
import { LoginParamsType } from '@/services/auth';
import LoginFrom from './components';
import styles from './style.less';


const {  Username, Password,  Submit } = LoginFrom;


const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [autoLogin, setAutoLogin] = useState(true);
  const { login } = useModel('auth', model => ({  login: model.login }));

  const handleSubmit = async (values: LoginParamsType) => {
    setSubmitting(true);
    await login(values)
    setSubmitting(false);
  };


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
          <LoginFrom onSubmit={handleSubmit}>

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
            <Submit loading={submitting}>Đăng nhập</Submit>
          </LoginFrom>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
