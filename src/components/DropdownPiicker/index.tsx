/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
import React, { useState, FC } from 'react';
import { Menu, Checkbox, Dropdown, Button, Radio } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {
  BLACKLIST_REASONS_NAME,
  BORROW_METHOD_TYPES,
  LOAN_STATUS_NAME,
  DEBT_STATUS_NAME,
  NUMBER_OF_DAYS_LATE,
  RESULT_THE_CALL,
  IMPACT_TYPE,
} from '@/constants';

import styled from 'styled-components';

interface WrapperProps {
  m: string;
}
interface WrapperConentProps {
  width?: string;
  block?: any;
}

const Wrapper = styled.div<WrapperProps>`
  ${({ m }) => m && `margin: ${m}`}
`;

const WrapperConent = styled.div<WrapperConentProps>`
  display: flex;
  width: ${({ width }) => width || 200}px;
  ${({ block }) => block && 'width: 100%'}
  justify-content: space-between;
  align-items: center;
  padding: 5px 8px;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  border-radius: 4px;
  > div {
    :first-child {
      font-weight: bold;
      font-size: 12px;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.45);
    }
    :nth-child(2) {
      font-size: 12px;
      font-weight: bold;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.65);
    }
  }
`;

const blackListStatusMap = {
  normal: 'Bình thường',
  white: 'Cần chú ý',
  warning: 'Đề phòng (khóa 7 ngày)',
  underwriting: 'Nguy cơ (khóa 30 ngày)',
  reject: 'Chặn (không tạo được đơn nữa)',
};

const categoryMap = {
  id: 'User ID',
  phone: 'Số điện thoại',
  name: 'Họ tên',
  code: 'Mã đơn vay',
  idCardNumber: 'Số CMT/CCCD',
  medicalInsuranceCode: 'Số thẻ BHYT',
  device: 'IP Address',
  ip: 'DeviceID',
};

const commonFieledsMap = {
  commonIPs: 'Địa chỉ IP',
  commonDevices: 'ID thiết bị',
  commonRelatives: 'Người thân',
  commonIdCardNumber: 'Số CMMD/CCCD',
  commonMedicalInsuranceCode: 'Thẻ BHYT',
};

const isReturnedMap = {
  false: 'Đơn vay mới',
  true: 'Đơn vay lại',
  all: 'Tất cả',
};

const bannerTypeMap = {
  borrowers: 'Người vay',
  lenders: 'Nhà đầu tư',
};

const statisticalMap = {
  amounts: 'Số tiền(VND)',
  loans: 'Số đơn',
};

interface DropdownPickerTypes {
  defaultValues: string;
  values: string;
  label: string;
  m?: string;
  button?: boolean;
  width?: string;
  block?: boolean;
  radio?: boolean;
  setValues?: any;
  blacklistReasons?: boolean;
  blackListStatus?: boolean;
  borrowMethod?: boolean;
  responsesCustomer?: boolean;
  commonFieleds?: boolean;
  loanStatus?: boolean;
  category?: boolean;
  isReturned?: boolean;
  latestStatus?: boolean;
  bannerType?: boolean;
  statistical?: boolean;
  impactTypes?: boolean;
  debtCallStatus?: boolean;
}

const DropdownPicker: FC<DropdownPickerTypes> = ({
  defaultValues = '',
  values = '',
  label = '',
  m,
  button,
  width,
  block,
  radio,
  setValues,
  blacklistReasons,
  blackListStatus,
  borrowMethod,
  responsesCustomer,
  commonFieleds,
  loanStatus,
  category,
  isReturned,
  latestStatus,
  bannerType,
  statistical,
  impactTypes,
  debtCallStatus,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const [reset, setReset] = useState(false);

  const handleDropdownVisibleChange = (flag: any) => setDropdown(flag);

  const handlePick = (e: any) => {
    const { value } = e.target;
    if (radio) return setValues(value);

    const valuesArr = values.length ? values.split(',') : [];
    setReset(false);
    if (valuesArr.indexOf(value) !== -1) {
      const index = valuesArr.indexOf(value);
      valuesArr.splice(index, 1);
      setValues(valuesArr.join(','));
    } else {
      valuesArr.push(value);
      setValues(valuesArr.join(','));
    }
  };

  const checkAll = () => {
    setReset(false);
    setValues(defaultValues);
  };

  const onResset = () => {
    setReset(true);
    setValues('');
  };

  const getValueMap = (value: string) => (
    <span>
      {blacklistReasons && BLACKLIST_REASONS_NAME[value]}
      {blackListStatus && blackListStatusMap[value]}
      {category && categoryMap[value]}
      {loanStatus && LOAN_STATUS_NAME[value]}
      {borrowMethod && BORROW_METHOD_TYPES[value]}
      {commonFieleds && commonFieledsMap[value]}
      {isReturned && isReturnedMap[value]}
      {bannerType && bannerTypeMap[value]}
      {latestStatus && DEBT_STATUS_NAME[value]}
      {responsesCustomer && NUMBER_OF_DAYS_LATE[value]}
      {statistical && statisticalMap[value]}
      {impactTypes && IMPACT_TYPE[value]}
      {debtCallStatus && RESULT_THE_CALL[value]}
    </span>
  );

  const menu = (
    <Menu>
      {defaultValues.length ? (
        defaultValues.split(',').map((item) => (
          <Menu.Item key={item}>
            {radio ? (
              <Radio
                value={item}
                style={{ width: '100%' }}
                onChange={handlePick}
                checked={values === item}
              >
                {getValueMap(item)}
              </Radio>
            ) : (
              <Checkbox
                value={item}
                style={{ width: '100%' }}
                onChange={handlePick}
                checked={values.split(',').indexOf(item) !== -1}
              >
                {getValueMap(item)}
              </Checkbox>
            )}
          </Menu.Item>
        ))
      ) : (
        <Menu.Item>Chưa có dữ liệu</Menu.Item>
      )}
      {defaultValues.length && !radio && (
        <Menu.Item>
          <Radio checked={defaultValues.length === values.length} onChange={checkAll}>
            Chọn tất cả
          </Radio>
          <Radio checked={reset} onChange={onResset}>
            Reset
          </Radio>
        </Menu.Item>
      )}
    </Menu>
  );

  const defaultValuesLength = defaultValues.length ? defaultValues.split(',').length : 0;
  const valuesLength = values.length ? values.split(',').length : 0;

  const text =
    defaultValuesLength === valuesLength
      ? 'Tất cả'
      : radio
      ? getValueMap(values)
      : ` Đã chọn ${valuesLength}/${defaultValuesLength}`;

  return (
    <Wrapper m={m as string}>
      <Dropdown overlay={menu} onVisibleChange={handleDropdownVisibleChange} visible={dropdown}>
        {button ? (
          <Button style={{ backgroundColor: 'rgba(0, 0, 0, 0.02)', color: '#000' }}>
            {text}
            <DownOutlined style={{ marginLeft: 5 }} />
          </Button>
        ) : (
          <WrapperConent width={width as string} block={block}>
            <div>{label}</div>
            <div>
              {text}
              <DownOutlined style={{ marginLeft: 5 }} />
            </div>
          </WrapperConent>
        )}
      </Dropdown>
    </Wrapper>
  );
};

export default DropdownPicker;
