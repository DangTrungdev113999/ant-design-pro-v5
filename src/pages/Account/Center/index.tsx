import React from 'react';
import { Avatar, Row, Col, Card, Divider } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import { useModel } from 'umi';

import { InitialStateTypes } from '@/app';

import styles from './style.less';

const Center = () => {
  const { initialState } = useModel('@@initialState');
  const { user }: InitialStateTypes = initialState || {};

  return (
    <GridContent>
      <Row gutter={24}>
        <Col md={24}>
          <Card
            bordered={false}
            style={{
              marginBottom: 24,
            }}
          >
            <div>
              <div className={styles.avatarHolder}>
                <Avatar
                  size={100}
                  src={
                    user?.avatar ||
                    'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
                  }
                  className={styles.avatar}
                />
                <div className={styles.name}>{user?.name}</div>
                <div className={styles.name}>{user?.phone}</div>
              </div>
              <div className={styles.detail}>
                <p>
                  <i className={styles.group} />
                  {user?.role?.replace(/^\w/, (c) => c.toUpperCase())}
                </p>
              </div>
              <Divider dashed />
            </div>
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};

export default Center;
