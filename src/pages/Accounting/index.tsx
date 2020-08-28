import React, { FC, useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Form, Input, Row, Col, Typography, Button } from 'antd';
import {
  parseNumberWithDot,
  timeFormatter,
  updateLocationWithQuery,
  showTotal,
} from '@/utils/utils';
import { BORROW_METHOD_TYPES, DEBT_STATUS_NAME } from '@/constants';
import { queryDebtList } from '@/services/accounting';
import { useFetchTableData } from '@/hoocks';
import DropdownPicker from '@/components/DropdownPiicker';
import { FilterOutlined } from '@ant-design/icons';

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

const FILTER_OPTION = {
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

  const { tableProps, fetchData, handleFilterTable } = useFetchTableData(queryDebtList, {
    query,
    setQueryParams,
    history
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

  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'debt_id',
      align: 'center',
    },
    {
      title: 'MÃ ĐƠN VAY',
      dataIndex: 'loan_id',
      align: 'center',
    },
    {
      title: 'NGƯỜI VAY',
      dataIndex: 'name',
      render: (val: string, record: any) => (
        <>
          <div>{val}</div>
          <div>{record.phone}</div>
        </>
      ),
    },
    {
      title: 'HÌNH THỨC VAY',
      dataIndex: 'borrow_method',
      render: (val: string) => BORROW_METHOD_TYPES[val],
    },
    {
      title: 'TÌNH TRẠNG',
      dataIndex: 'status_debt',
      render: (val: string) => DEBT_STATUS_NAME[val],
    },
    {
      title: 'CẦN THANH TOÁN',
      dataIndex: 'amount',
      render: (val: number) => `${parseNumberWithDot(val)} VND`,
    },
    {
      title: 'ĐÃ THANH TOÁN',
      dataIndex: 'paid_amount',
      render: (val: number) => `${parseNumberWithDot(val)} VND`,
    },
    {
      title: 'SỐ NGÀY MUỘN',
      dataIndex: 'num_day_late',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'NGÀY ĐẾN HẠN',
      dataIndex: 'payment_date',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'NGÀY HẸN TRẢ',
      dataIndex: 'appointment_date',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
    },
  ];

  const tablePropsConfig = {
    ...tableProps,
    rowKey: 'debt_id',
    columns,
    pagination: {
      ...tableProps.pagination,
      showSizeChanger: true,
      showQuickJumper: true,
      pageSizeOptions: ['20', '50', '100'],
      showTotal: showTotal(tableProps.pagination),
    },
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
          {Object.keys(FILTER_OPTION).map((key) => (
            <Col md={4} span={4} key={key}>
              <DropdownPicker
                {...FILTER_OPTION[key]}
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
        <Table {...tablePropsConfig} />
      </Card>
    </PageContainer>
  );
};

export default Accounting;
