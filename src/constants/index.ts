export const API_URL = 'https://api-dev.avy.vn/api/v1';
export const BASE_MANGO_URL = 'https://api-dev.avy.vn/mango/v1';

export const OCCUPATIONS = [
  'Công nghệ kỹ thuật',
  'Công nghệ thông tin',
  'Dịch vụ',
  'Giáo dục',
  'Khoa học cơ bản',
  'Kiến trúc xây dựng',
  'Kinh doanh',
  'Nghệ thuật',
  'Nông nghiệp',
  'Pháp lý',
  'Phi chính phủ',
  'Sản xuất',
  'Tài chính - Ngân hàng',
  'Truyền thông - Marketing',
  'Tự do',
  'Y tế',
];

export const ROLES = [
  { name: 'Admin', value: 'admin' },
  { name: 'Supervisor', value: 'supervisor' },
  { name: 'CLevel', value: 'c-level' },
  { name: 'SalesLeader', value: 'sales-leader' },
  { name: 'Marketer', value: 'marketer' },
  { name: 'Tech', value: 'tech' },
  { name: 'CustomerCare', value: 'customer-care' },
];

export const GENDERS = ['Nam', 'Nữ', 'Khác'];

export const MARITAL_STATUSES = ['Độc thân', 'Đã kết hôn'];

export const DURATION_SALARY = [
  { value: 30, name: '1 Tháng' },
  { value: 60, name: '2 Tháng' },
  { value: 90, name: '3 Tháng' },
  { value: 120, name: '4 Tháng' },
  { value: 150, name: '5 Tháng' },
  { value: 180, name: '6 Tháng' },
];

export const DURATION_INSURANCE = [
  { value: 7, name: '7 Ngày' },
  { value: 14, name: '14 Ngày' },
  { value: 21, name: '21 Ngày' },
  { value: 28, name: '28 Ngày' },
];

export const DURATION_FLASH = [
  { value: 7, name: '7 Ngày' },
  { value: 14, name: '14 Ngày' },
  { value: 21, name: '21 Ngày' },
  { value: 28, name: '28 Ngày' },
];

export const REASONS_BLACKLIST = [
  { value: 'duplicateIdCardNumber', name: 'Trùng CMND/CCCD' },
  { value: 'duplicateMedicalInsuranceCode', name: 'Trùng BHYT' },
  { value: 'similarFace', name: 'Gương tương đồng' },
  { value: 'duplicateDeviceId', name: 'Trùng DeviceID' },
  { value: 'duplicateIpAddress', name: 'Trùng IP Address' },
  { value: 'duplicateRelation', name: 'Trùng SĐT người thân' },
  { value: 'evaluationIssue', name: 'Gian dối khâu thẩm định' },
];

export const BLACKLIST_TYPES = [
  { value: 'normal', name: 'Bình thường' },
  { value: 'white', name: 'Cần chú ý' },
  { value: 'warning', name: 'Đề phòng' },
  { value: 'underwriting', name: 'Nguy cơ' },
  { value: 'reject', name: 'Chặn' },
];

export const BLACKLIST_REASONS_NAME = {
  canceledLoans: 'Tiền lệ hủy đơn',
  financialIssues: 'Vấn đề tài chính',
  lateLoans: 'Tiền lệ trả chậm',
  invalidSim: 'Sim không hợp lệ',
  duplicateIdCardNumber: 'Trùng CMND/CCCD ',
  duplicateMedicalInsuranceCode: 'Trùng thẻ BHYT',
  similarFace: 'Gương mặt tương đồng',
  duplicateDeviceId: 'Trùng DeviceID',
  duplicateIpAddress: 'Trùng IP Address',
  duplicateRelation: 'Trùng SĐT người thân',
  unreliableSocialAccounts: 'Mạng xã hội không tin cậy',
  unreliableContacts: 'Danh bạ không tin cậy',
  insufficientContacts: 'Danh bạ không hợp lệ',
  missingInformation: 'Không cung cấp thông tin',
  evaluationIssue: 'Gian dối khâu thẩm định',
  other: 'Lí do khác',
};

export const BORROW_METHOD_TYPES = {
  salary: 'Qua bảng lương',
  insurance: 'Qua thẻ BHYT',
  flash: 'Vay nhanh',
};

export const LOAN_STATUS_NAME = {
  draft: 'Đơn Nháp',
  pending: 'Chờ duyệt',
  editing: 'Chờ chỉnh sửa',
  signing: 'Xác nhận khoản vay',
  signed: 'Duyệt giải ngân',
  approved: 'Chờ giải ngân',
  transferring: 'Chờ đầu tư',
  borrowing: 'Đang vay',
  finished: 'Tất toán',
  reject: 'Từ chối',
  canceled: 'Đã huỷ',
};

export const BLACKLIST_STATUS_NAME = {
  normal: 'Bình thường',
  white: 'Cần chú ý',
  warning: 'Đề phòng',
  underwriting: 'Nguy cơ',
  reject: 'Chặn',
};

export const DEBT_STATUS_NAME = {
  fullPaid: 'Đã thanh toán',
  partlyPaid: 'Thanh toán một phần',
  unpaid: 'Chưa thanh toán',
};

export const NUMBER_OF_DAYS_LATE = {
  undueDebt: 'Chưa tới hạn',
  dueDebt: 'Tới hạn',
  '1-3': 'Muộn 1-3 ngày',
  '4-10': 'Muộn 4-10 ngày',
  '11-30': 'Muộn 11-30 ngày',
  'over-90': 'Muộn trên 90 ngày',
};

export const RELATIONSHIP_NAME = {
  parent: 'Bố/Mẹ',
  sibling: 'Anh/Chị/Em',
  spouse: 'Vợ/Chồng',
  colleague: 'Đồng nghiệp',
  friend: 'Bạn bè',
  other: 'Khác',
};

export const IMPACT_TYPE = {
  user: 'Gọi người vay',
  relation: 'Gọi người thân',
  contact: 'Gọi danh bạ',
  // create: 'Tạo mới',
};

export const RESULT_THE_CALL = {
  USER_BUSY: 'Máy bận',
  NO_USER_RESPONSE: 'Không nhấc máy',
  NO_ANSWER: 'Thuê bao',
  NORMAL_TEMPORARY_FAILURE: 'Thất bại',
  NORMAL_CLEARING: 'Thành công',
};

export const OCCUPATIONS_MAP = {
  InformationTechnology: 'Công nghệ - Thông tin',
  MechanicalTechnology: 'Công nghệ - Kỹ thuật',
  FundamentalScience: 'Khoa học cơ bản',
  ConstructionAndArchitecture: 'Kiến trúc và xây dựng',
  Business: 'Kinh doanh',
  ServiceIndustry: 'Dịch vụ',
  FinanceBankingInsurance: 'Tài chính - Ngân hàng - Bảo hiểm',
  Education: 'Giáo dục',
  LawHumanities: 'Luật - Nhân văn',
  ArtsAestheticsGraphics: 'Nghệ thuật - Thẩm mỹ - Đồ hoạ',
  AgricultureForestryFishery: 'Nông - Lâm - Ngư nghiệp',
  ManufacturingAndProcessing: 'Sản xuất và chế biến',
  CommunicationMarketing: 'Truyền thông - Marketing',
  Medical: 'Y tế',
  NonGovernmentalIndustry: 'Phi chính phủ',
  Administration: 'Hành chính',
  Freelance: 'Tự do',
  Mining: 'Khai khoáng',
  RealEstateIndustry: 'Bất động sản ',
};
