/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { FC, useEffect, useState, Fragment } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Form, Input, Row, Col, Typography, Button, Modal, notification } from 'antd';
import {
  parseNumberWithDot,
  timeFormatter,
  updateLocationWithQuery,
  showTotal,
} from '@/utils/utils';
import { BORROW_METHOD_TYPES, DEBT_STATUS_NAME } from '@/constants';
import { queryDebtList, queryProducts, updateProduct, removeProduct } from '@/services/accounting';
import { useHandleTableData } from '@/hoocks';
import DropdownPicker from '@/components/DropdownPiicker';
import { FilterOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';

const dateFormat = 'YYYY-MM-DD';

const FormItem = Form.Item;
const { Title } = Typography;

export interface QueryParamsDebtListTypes {
  pageSize?: 10;
  current?: 1;
  q?: string;
  sorter?: string;
  from_date?: string;
  to_date?: string;
  categories?: string;
  borrow_method?: string;
  status?: string;
  num_day_late?: string;
}

const defaultQuery: QueryParamsDebtListTypes = {
  pageSize: 10,
  current: 1,
  q: '',
  sorter: '',
  from_date: timeFormatter('2019-11-20', dateFormat),
  to_date: timeFormatter(new Date(), dateFormat),
  categories: 'name,code,phone',
  borrow_method: 'salary,insurance,flash',
  status: 'fullPaid,partlyPaid,unpaid',
  num_day_late: 'undueDebt,dueDebt,1-3,4-10,11-30,over-90',
};

const TABLE_FILTER_OPTION = {
  borrow_method: {
    label: 'Hình thức vay:',
    block: true,
    borrowMethod: true,
    m: '0px 0px 0 0',
  },
  status: {
    label: 'Tình trạng ',
    block: true,
    latestStatus: true,
    m: '0px 0px 0 0',
  },
  num_day_late: {
    label: 'Số ngày muộn',
    block: true,
    responsesCustomer: true,
    m: '0px 0px 0 0',
  },
};

interface AccountingPropsType {
  location: unknown;
  history: unknown;
  form: any;
}

const Accounting: FC<AccountingPropsType> = ({ location, history }) => {
  const { query: locationQuery }: any = location;

  const [form] = Form.useForm();
  const [query, setQueryParams] = useState({
    current: locationQuery.current || defaultQuery.current,
    pageSize: locationQuery.pageSize || defaultQuery.pageSize,
    q: locationQuery.q || defaultQuery.q,
    sorter: locationQuery.sorter || defaultQuery.sorter,
    borrow_method: locationQuery.borrow_method || defaultQuery.borrow_method,
    status: locationQuery.status || defaultQuery.status,
    num_day_late: locationQuery.num_day_late || defaultQuery.num_day_late,
    to_date: locationQuery.to_date || defaultQuery.to_date,
    from_date: locationQuery.from_date || defaultQuery.from_date,
  });

  const { tableProps, fetchData, handleFilterTable, handleRemoveItem } = useHandleTableData({
    fetchData: queryProducts,
    updateItem: updateProduct,
    removeItem: removeProduct,
  });

  const searchFormTable = (
    <Form form={form}>
      <FormItem noStyle shouldUpdate>
        <Input.Search
          placeholder="Tìm kiếm"
          value={query.q}
          onChange={handleFilterTable('q')}
          // @ts-ignore
          onSearch={fetchData}
          style={{ width: 500 }}
        />
        ,
      </FormItem>
    </Form>
  );

  const handleRemvoeProduct = (productId: string) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa sản phẩm vay này ?',
      okText: 'Đồng ý',
      cancelText: 'Huỷ',
      onOk: async () => {
        await handleRemoveItem({ productId });
        notification.success({
          message: 'Xóa sản phẩm thành công',
        });
      },
    });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
    },
    {
      title: 'TÊN SẢN PHẨM',
      dataIndex: 'name',
    },
    {
      title: 'ẢNH ĐẠI DIỆN',
      dataIndex: 'imageUrl',
      render: () => 'a',
    },
    {
      title: 'MÔ TẢ',
      dataIndex: 'description',
    },
    {
      title: 'TRẠNG THÁI HIỂN THỊ',
      dataIndex: 'status',
    },
    {
      title: 'NHÃN DÁN',
      dataIndex: 'label',
    },
    {
      title: 'THỨ TỰ HIỂN THỊ',
      dataIndex: 'displayOrder',
    },
    {
      title: 'THAO TÁC',
      key: 'action',
      render: (_, record) => (
        <Fragment>
          <Button
            type="primary"
            // onClick={() => handleOpenModal(record)}
          >
            <EyeOutlined />
          </Button>
          <Button type="danger" onClick={() => handleRemvoeProduct(record.ID)}>
            <DeleteOutlined />
          </Button>
        </Fragment>
      ),
    },
  ];

  const tablePropsConfig = {
    ...tableProps,
    rowKey: 'debt_id',
    columns,
    pagination: false,
  };

  return (
    <PageContainer>
      <Card>
        {searchFormTable}
        <br />
        <Row>
          <Col md={11} span={4}>
            <Title level={4}>
              Khoản phải thu từ ngày {timeFormatter(query.from_date, 'DD-MM-YYYY')} đến{' '}
              {timeFormatter(query.to_date, 'DD-MM-YYYY')}
            </Title>
          </Col>
          {Object.keys(TABLE_FILTER_OPTION).map((key) => (
            <Col md={4} span={4} key={key}>
              <DropdownPicker
                {...TABLE_FILTER_OPTION[key]}
                defaultValues={defaultQuery[key]}
                values={query[key]}
                setValues={handleFilterTable(key)}
              />
            </Col>
          ))}
          <Col md={1} span={1}>
            {/* 
            // @ts-ignore */}
            <Button type="primary" onClick={fetchData}>
              <FilterOutlined />
            </Button>
          </Col>
        </Row>
      </Card>
      <br />
      <Card>
        {/* 
        //@ts-ignore */}
        <Table {...tablePropsConfig} />
      </Card>
    </PageContainer>
  );
};

export default Accounting;
