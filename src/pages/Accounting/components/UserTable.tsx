import { useHandleTableData } from '@/hoocks';
import { QueryParamsType } from '@/hoocks/useHandleTableData';
import { queryBorrowers, queryLenders } from '@/services/accounting';
import { Col, Input, Row, Table } from 'antd';
import React, { FC, useState } from 'react';

type UserTablePropsType = {
  type: string;
  target: string;
  data: any;
  setData: any;
};

const UserTable: FC<UserTablePropsType> = ({ type = 'lender', target, data, setData }) => {
  const [query, setQueryParams] = useState<QueryParamsType>({
    q: '',
  });
  const { tableProps, fetchData, handleFilterTable } = useHandleTableData(
    {
      fetchData: type === 'lender' ? queryLenders : queryBorrowers,
    },
    { query, setQueryParams, refreshDeps: [type] },
  );

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: 'Tỉnh/Thành phố',
      dataIndex: 'currentProvince.name',
      align: 'center',
    },
  ];
  const tablePropsConfig = {
    ...tableProps,
    rowKey: 'id',
    columns,
    rowSelection: {
      type: 'radio',
      columnTitle: 'Chọn',
      onChange: (_: unknown, fields: any) => {
        setData(target)({
          ...data[target],
          info: fields[0].phone,
        });
      },
    },
    pagination: {
      ...tableProps.pagination,
    },
  };

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col md={12} />
        <Col md={12}>
          <Input.Search
            placeholder="Tìm kiếm"
            value={query.q}
            allowClear
            onChange={handleFilterTable('q')}
            size="large"
            // @ts-ignore
            onSearch={fetchData}
          />
        </Col>
        <Col md={24}>
          {/* 
          //@ts-ignore */}
          <Table {...tablePropsConfig} />
        </Col>
      </Row>
    </>
  );
};

export default UserTable;
