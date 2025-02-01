import { Link, useNavigate } from 'react-router-dom';
import InputForm from '../components/InputForm';
import { useState } from 'react';

interface BusinessSignupForm {
  name: string;
  account: string;
  password: string;
  email: string;
  businessRegistrationNumber: string;
  businessStartDate: string;
  businessOwnerName: string;
  companyName: string;
}

const BusinessSignup = () => {
  const navigate = useNavigate();
  const [businessSignupData, setBusinessSignupData] = useState<BusinessSignupForm>({
    name: '',
    account: '',
    password: '',
    email: '',
    businessRegistrationNumber: '',
    businessStartDate: '',
    businessOwnerName: '',
    companyName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBusinessSignupData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const businessSignup = () => {
    navigate('/signup/business/details');
  };
  return (
    <div className="w-full h-[calc(100vh-3.75rem)] bg-white flex items-center justify-start flex-col">
      <div className="p-24 w-fit">
        <p className="mb-1 text-3xl font-bold text-black-800">사업자 회원가입</p>
        <p className="mb-16 text-black-400">사업자 회원으로 전용 특가 혜택을 누려보세요.</p>

        <form>
          <InputForm
            label="이름"
            type="text"
            placeholder="홍길동"
            name="name"
            value={businessSignupData.name}
            onChange={handleInputChange}
          />

          <div className="relative flex items-center">
            <InputForm
              label="아이디"
              type="text"
              placeholder="ID"
              name="account"
              value={businessSignupData.account}
              onChange={handleInputChange}
              tip="영어 대/소문자 포함 8자 이상으로 입력해주세요."
            />
            <div
              className="absolute px-3 py-2 text-sm rounded-lg cursor-pointer text-black-400 hover:bg-main-color-100 hover:text-main-color-800 bg-black-100"
              style={{ top: '35px', right: '-90px' }}
            >
              중복 확인
            </div>
          </div>

          <InputForm
            label="비밀번호"
            type="password"
            placeholder="********"
            name="password"
            value={businessSignupData.password}
            onChange={handleInputChange}
            tip="숫자, 영어 대/소문자, 특수문자 포함 8자 이상으로 입력해주세요."
          />

          <InputForm
            label="비밀번호 확인"
            type="password"
            placeholder="********"
            error="비밀번호가 일치하지 않습니다."
          />

          <div className="relative flex items-center">
            <InputForm
              label="회사 이메일"
              type="text"
              placeholder="mediger@gmail.com"
              name="email"
              value={businessSignupData.email}
              onChange={handleInputChange}
            />
            <div
              className="absolute px-3 py-2 text-sm rounded-lg cursor-pointer text-black-400 hover:bg-main-color-100 hover:text-main-color-800 bg-black-100"
              style={{ top: '35px', right: '-90px' }}
            >
              인증 코드
            </div>
          </div>

          <InputForm
            label="법인명 또는 상호"
            type="text"
            placeholder="메디저"
            name="companyName"
            value={businessSignupData.companyName}
            onChange={handleInputChange}
          />

          <InputForm
            label="사업자 등록 번호"
            type="text"
            placeholder="123-45-67890"
            name="businessRegistrationNumber"
            value={businessSignupData.businessRegistrationNumber}
            onChange={handleInputChange}
            tip="하이픈(-)을 빼고 입력해주세요."
          />

          <InputForm
            label="개업일자"
            type="text"
            placeholder="2025.01.01"
            name="businessStartDate"
            value={businessSignupData.businessStartDate}
            onChange={handleInputChange}
          />

          <InputForm
            label="대표자명"
            type="text"
            placeholder="홍길동"
            name="businessOwnerName"
            value={businessSignupData.businessOwnerName}
            onChange={handleInputChange}
          />
        </form>

        <div
          className="p-2 my-1 mt-10 mb-24 text-center text-white rounded-lg cursor-pointer bg-main-color-500"
          onClick={businessSignup}
        >
          회원가입
        </div>

        <div className="flex flex-col items-center justify-center px-8 mt-10">
          <p className="mb-2 text-sm text-center text-black-400">
            개인 고객이신가요?
            <br />
            가입 후 나만의 맞춤 서비스를 경험해보세요.
          </p>
          <Link
            to="/signup/personal"
            className="font-bold underline cursor-pointer underline-offset-2 text-main-color-700"
          >
            개인 회원 간편 가입 →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessSignup;
