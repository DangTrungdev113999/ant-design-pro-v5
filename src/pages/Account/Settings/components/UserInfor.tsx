import React, { FC, useEffect, useState } from 'react';
import { Col, Form, Input, Row, Button, Divider, notification, Upload, Avatar, Spin } from 'antd';
import { useModel } from 'umi';
import { useRequest } from '@umijs/hooks';

import { InitialStateTypes } from '@/app';
import { updateMe, uploadAvatar } from '@/services/user';

import styles from '../styles.less';

const FormItem = Form.Item;

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

type FormNameTypes = 'name' | 'password' | 'repassword' | 'avatar';

const UserInfor: FC = () => {
  const [avatatPreview, setAvatarPreview] = useState<string>(''); 
  const { initialState, setInitialState } = useModel('@@initialState');
  const [form] = Form.useForm();
  const { token, user }: InitialStateTypes = initialState || {};

  useEffect(() => {
    setAvatarPreview(user?.avatar as string);
    form.setFieldsValue({
      phone: user?.phone,
      name: user?.name,
    });
  }, []);

  const updateCurrentUserSideEffect = useRequest(updateMe, {
    manual: true,
    fetchKey: (_, fields) => fields?.name || fields?.password,
    onSuccess: result => {
      if (result.status === 'ok') {
        // @ts-ignore
        setInitialState({
          ...initialState,
          user: { ...user, name: result?.data?.name || '', avatar: result?.data?.avatar || '' },
        });
        notification.success({
          message: 'Cập nhật thông tin thành công',
          description: result.description,
        });
      }
    },
    onError: (error) => {
      notification.error({
        message: 'Cập nhật thông tin thất bại',
        description: error.message,
      });
    },
  });

  const uploadAvatarSideEffect = useRequest(uploadAvatar, {
    manual: true,
    onSuccess: result => {
      if (result?.status === 'ok') {
        updateCurrentUserSideEffect.run(token as string, { avatar: result?.data?.id });
        setAvatarPreview(result?.data?.url || '');
      }
    }
  });


  const onUpdateUserInfor = async (formName: FormNameTypes[]) => {
    const fields = await form.validateFields(formName);
    updateCurrentUserSideEffect.run(token as string, fields);
  };

  return (
    <Row gutter={[50, 20]}>
      <Col xs={24} sm={20} md={8} xl={8} xxl={8}>
        <Form {...layout} form={form}>
          <FormItem name="phone" label="Số điện thoại:">
            <Input disabled />
          </FormItem>
          <FormItem
            name="name"
            label="Họ và Tên:"
            rules={[{ required: true, message: 'Vui lòng nhập tên.' }]}
          >
            <Input placeholder="Họ và Tên" />
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              onClick={() => onUpdateUserInfor(['name'])}
              loading={updateCurrentUserSideEffect.fetches[form.getFieldValue('name')]?.loading}
            >
              Cập nhật
            </Button>
          </FormItem>
          <Divider />
          <FormItem
            name="password"
            label="Mật khẩu:"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu.' }]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </FormItem>
          <FormItem
            name="repassword"
            label="Nhập lại mật khẩu:"
            rules={[
              { required: true, message: 'Xác nhận mật khẩu.' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu nhập lại không đúng'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu" />
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              loading={updateCurrentUserSideEffect.fetches[form.getFieldValue('password')]?.loading}
              onClick={() => onUpdateUserInfor(['password', 'repassword'])}
            >
              Đổi mật khẩu
            </Button>
          </FormItem>
        </Form>
      </Col>
      <Col xs={24} sm={4} md={4} xl={4} xxl={4}>
        <div className={styles.avatar_itle}>Cập nhật ảnh đại diện</div>
        <Spin spinning={uploadAvatarSideEffect.loading}>
          {/* 
        // @ts-ignore */}
          <Upload
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            onChange={(info) => uploadAvatarSideEffect.run(token as string, info.file.originFileObj as File)}
          >
            <Avatar
              src={
                avatatPreview ||
                'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
              }
              size={144}
            />
          </Upload>
        </Spin>
      </Col>
    </Row>
  );
};

export default UserInfor;
//  TODO Tìm hiểu về span trong col của ant
