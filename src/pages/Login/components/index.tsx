import { LoginParamsType } from '@/services/auth';
import { Form } from 'antd';
import { FormInstance } from 'antd/es/form';
import classNames from 'classnames';
import React from 'react';
import styles from './index.less';
import LoginItem, { LoginItemProps } from './LoginItem';
import LoginSubmit from './LoginSubmit';


export interface LoginProps {
  style?: React.CSSProperties;
  onSubmit?: (values: LoginParamsType) => void;
  className?: string;
  from?: FormInstance;
}

interface LoginType extends React.FC<LoginProps> {
  Submit: typeof LoginSubmit;
  Username: React.FunctionComponent<LoginItemProps>;
  Password: React.FunctionComponent<LoginItemProps>;
}

const Login: LoginType = (props) => {
  const { className } = props;
  const [form] = Form.useForm();
  return (
    // <LoginContext.Provider>
      <div className={classNames(className, styles.login)}>
        <Form
          form={props.from || form}
          onFinish={(values) => {
            if (props.onSubmit) {
              props.onSubmit(values as LoginParamsType);
            }
          }}
        >
          {props.children}
        </Form>
      </div>
    // </LoginContext.Provider>
  );
};

Login.Submit = LoginSubmit;
Login.Username = LoginItem.Username;
Login.Password = LoginItem.Password;

export default Login;
