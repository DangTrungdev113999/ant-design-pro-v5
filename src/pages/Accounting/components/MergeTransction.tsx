import React, { FC, useState } from 'react';
import { Button, Col, Divider, Form, Input, Row, Select, Modal } from 'antd';
import { TRANSACTION_TYPE } from '@/constants';
import { useToggle, useUpdate } from '@umijs/hooks';

import UserTable from './UserTable';

const { Option } = Select;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const layoutInline = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};

const TYPES = ['Công target Cổ phần FinX ', 'Lender', 'Borrower'];

interface TargetUserType {
  target: string;
  data: any;
  setData: any;
}
const TargetUser: FC<TargetUserType> = ({ target, data, setData }) => {
  const { state: visible, toggle } = useToggle();
  const [targetType, setTargetType] = useState('');

  const onHandType = (type: string) => {
    if (type === 'Lender' || type === 'Borrower') {
      setTargetType(type.toLowerCase());
      setData(target.toLowerCase())({
        type: type.toLowerCase(),
        info: '',
      });
      toggle(true);
    }
  };

  return (
    <>
      <Form.Item
        {...layoutInline}
        name={target}
        label={target === 'sender' ? 'Đối tượng gửi' : 'Đối tượng nhận'}
        initialValue={data[target].type}
        extra={target === 'sender' ? `${data.sender.info}` : `${data.receiver.info}`}
        rules={[{ required: true }]}
      >
        <Select
          allowClear
          onChange={onHandType}
          placeholder={target === 'sender' ? 'Chọn đối tượng gửi' : 'Chọn đối tượng nhận'}
        >
          {TYPES.map((type) => (
            <Option value={type} key={type}>
              {type}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Modal
        title={`Chọn ${targetType}`}
        visible={visible}
        width="80%"
        onCancel={() => toggle(false)}
      >
        <UserTable type={targetType} target={target} data={data} setData={setData} />
      </Modal>
    </>
  );
};
// =============================================================

interface UpdateLoanTypes {
  data?: any;
  setData?: any;
}
const UpdateLoan: FC<UpdateLoanTypes> = ({ data, setData }) => {
  const [form] = Form.useForm();
  const update = useUpdate();
  return (
    <div>
      <Form {...layout} form={form}>
        <Row>
          <Col md={12}>
            <Form.Item
              {...layoutInline}
              label="Nội dung giao dịch"
              name="transctionContent"
              initialValue={data.transctionContent}
              rules={[{ required: true, message: 'Nhập nội dung giao dịch!' }]}
            >
              <Input
                placeholder="Nhập nội dung giao dịch"
                onChange={setData('transctionContent')}
              />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item
              {...layoutInline}
              name="transactionType"
              initialValue={data.transctionType}
              label="Kiểu giao dịch"
              rules={[
                {
                  required: true,
                  message: 'Chọn kiểu giao dịch!',
                },
              ]}
            >
              <Select placeholder="Nhập kiểu giao dịch" onChange={setData('transactionType')}>
                {TRANSACTION_TYPE.map((type) => (
                  <Option value={type} key={type}>
                    {type}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Divider style={{ marginTop: 0 }} />
          <Col md={12}>
            <TargetUser target="receiver" data={data} setData={setData} />
          </Col>
          <Col md={12}>
            <TargetUser target="sender" data={data} setData={setData} />
          </Col>
        </Row>

        <Form.Item {...tailLayout}>
          <Button type="primary" size="large" onClick={update}>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateLoan;
