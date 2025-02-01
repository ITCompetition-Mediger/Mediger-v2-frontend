import { Link, useNavigate } from 'react-router-dom';
import InputForm from '../components/InputForm';
import { useState } from 'react';

interface BusinessSignupDetailsForm {
  businessAddress: string;
  onlineSalesRegistrationNumber: string;
  settlementBank: string;
  settlementAccount: string;
  documentAttachment: File | null;
}

const BusinessSignupDetails = () => {
  const navigate = useNavigate();
  const [onlineSalesRegistrationNumberError, setOnlineSalesRegistrationNumberError] = useState<
    string | null
  >(null);
  const [businessSignupDetailData, setBusinessSignupDetailData] =
    useState<BusinessSignupDetailsForm>({
      businessAddress: '',
      onlineSalesRegistrationNumber: '',
      settlementBank: 'KB국민은행',
      settlementAccount: '',
      documentAttachment: null,
    });

  // 파일 변경 감지
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBusinessSignupDetailData(prev => ({
        ...prev,
        documentAttachment: file,
      }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBusinessSignupDetailData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'onlineSalesRegistrationNumber') {
      if (!value.match(/^\d{12}$/)) {
        setOnlineSalesRegistrationNumberError('올바른 형식이 아닙니다.');
      } else {
        setOnlineSalesRegistrationNumberError(null);
      }
    }
  };

  const businessSignupDetails = () => {
    navigate('/');
  };

  return (
    <div className="w-full h-[calc(100vh-3.75rem)] bg-white flex items-center justify-start flex-col">
      <div className="p-24 w-fit">
        <p className="mb-1 text-3xl font-bold text-black-800">사업자 회원 추가 정보 입력</p>
        <p className="mb-16 text-black-400">입점에 필요한 추가 정보를 입력해주세요.</p>

        <form>
          <InputForm
            label="사업장 주소"
            type="text"
            placeholder="서울시 구로구 연동로 320"
            value={businessSignupDetailData.businessAddress}
            name="businessAddress"
            onChange={handleInputChange}
          />

          <InputForm
            label="통신판매업 신고번호"
            type="text"
            placeholder="123456789012"
            value={businessSignupDetailData.onlineSalesRegistrationNumber}
            name="onlineSalesRegistrationNumber"
            onChange={handleInputChange}
            tip="하이픈(-)을 빼고 입력해주세요."
            error={onlineSalesRegistrationNumberError}
          />

          <p className="mb-2 text-sm text-black-400">은행 선택</p>
          <select
            name="settlementBank"
            value={businessSignupDetailData.settlementBank}
            onChange={handleInputChange}
            className="p-4 mb-8 transition-colors bg-white border-b-2 w-96 focus:outline-none placeholder:text-black-400 text-black-800 focus:border-main-color-500 border-black-400 duration-600"
          >
            {[
              'KB국민은행',
              '신한은행',
              '우리은행',
              'KEB하나은행',
              'SC제일은행',
              '씨티은행',
              'Sh수협은행',
              'NH농협은행',
              '카카오뱅크',
              '케이뱅크',
              '토스뱅크',
              '한국은행',
              '수출입은행',
              'KDB산업은행',
              'IBK기업은행',
            ].map(bank => (
              <option value={bank}>{bank}</option>
            ))}
          </select>

          <InputForm
            label="정산 계좌"
            type="text"
            placeholder="1234567890123"
            value={businessSignupDetailData.settlementAccount}
            name="settlementAccount"
            onChange={handleInputChange}
            tip="하이픈(-)을 제외하고 입력해주세요."
          />

          <p className="mt-4 mb-2 text-sm text-black-400">첨부 파일</p>
          <div className="relative flex items-center mb-8">
            {/* 파일 선택 input */}
            <input
              id="file"
              type="file"
              className="absolute h-full opacity-0 cursor-pointer w-96"
              onChange={handleFileChange}
            />

            {/* 파일 찾기 버튼 label */}
            <label
              htmlFor="file"
              className="z-10 px-3 py-2 text-sm rounded-lg cursor-pointer text-black-400 hover:bg-main-color-100 hover:text-main-color-800 bg-black-100"
            >
              파일 찾기
            </label>

            {businessSignupDetailData.documentAttachment && (
              <p className="ml-4 text-sm text-black-400">
                {businessSignupDetailData.documentAttachment.name}
              </p>
            )}
          </div>
        </form>

        <div
          onClick={businessSignupDetails}
          className="p-2 my-1 mt-10 mb-24 text-center text-white rounded-lg cursor-pointer bg-main-color-500"
        >
          회원가입
        </div>

        <Link
          to="/"
          className="flex flex-col items-center justify-center px-8 mt-6 font-bold underline cursor-pointer underline-offset-2 text-main-color-700"
        >
          다음에 입력하기
        </Link>
      </div>
    </div>
  );
};

export default BusinessSignupDetails;
