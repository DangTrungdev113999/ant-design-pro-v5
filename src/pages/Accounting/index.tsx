import React, { FC, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Tabs } from 'antd';
import MergeTransction from './components/MergeTransction';

const { TabPane } = Tabs;

const Accounting: FC = () => {
  const [data, setData] = useState({
    transctionContent: '',
    transctionType: '',
    receiver: {
      type: '',
      info: '',
    },
    sender: {
      type: '',
      info: '',
    },
  });

  const onHandleChangeData = (key: string) => (val: any) => {
    setData({
      ...data,
      [key]: val?.target?.value || val,
    });
  };

  return (
    <PageContainer>
      <Card>
        <Tabs defaultActiveKey="1" size="large">
          <TabPane tab="Mapping đơn vay" key="1">
            <MergeTransction data={data} setData={onHandleChangeData} />
          </TabPane>
          <TabPane tab="Xử lý thủ công" key="2">
            <MergeTransction data={data} setData={onHandleChangeData} />
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default Accounting;
