import { Link, useNavigate } from 'react-router-dom';
import InputForm from '../components/InputForm';
import { useState } from 'react';

interface PersonalSignupForm {
  account: string;
  password: string;
  name: string;
  email: string;
  phone: string;
}

const PersonalSignup = () => {
  const navigate = useNavigate();

  const [personalSignupData, setPersonalSignupData] = useState<PersonalSignupForm>({
    account: '',
    password: '',
    name: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalSignupData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const personalSignup = () => {
    navigate('/signup/personal/details');
  };

  return (
    <div className="w-full h-[calc(100vh-3.75rem)] bg-white flex items-center justify-start flex-col">
      <div className="p-24 w-fit">
        <p className="mb-1 text-3xl font-bold text-black-800">개인 회원가입</p>
        <p className="mb-16 text-black-400">가입은 쉽고 간단합니다. 시작해볼까요?</p>

        <form>
          <InputForm
            label="이름"
            type="text"
            placeholder="홍길동"
            value={personalSignupData.name}
            name="name"
            onChange={handleInputChange}
          />

          <div className="relative flex items-center">
            <InputForm
              label="아이디"
              type="text"
              placeholder="ID"
              value={personalSignupData.account}
              name="account"
              tip="영어 대/소문자 포함 8자 이상으로 입력해주세요."
              onChange={handleInputChange}
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
            value={personalSignupData.password}
            name="password"
            tip="숫자, 영어 대/소문자, 특수문자 포함 8자 이상으로 입력해주세요."
            onChange={handleInputChange}
          />

          <InputForm
            label="비밀번호 확인"
            type="password"
            placeholder="********"
            error="비밀번호가 일치하지 않습니다."
          />

          <div className="relative flex items-center">
            <InputForm
              label="휴대폰 번호"
              type="text"
              placeholder="010-0000-0000"
              value={personalSignupData.phone}
              name="phone"
              tip="하이픈(-)을 빼고 입력해주세요."
              onChange={handleInputChange}
            />
            <div
              className="absolute px-3 py-2 text-sm rounded-lg cursor-pointer text-black-400 hover:bg-main-color-100 hover:text-main-color-800 bg-black-100"
              style={{ top: '35px', right: '-90px' }}
            >
              인증 번호
            </div>
          </div>

          <InputForm
            label="이메일"
            type="text"
            placeholder="mediger@gmail.com"
            value={personalSignupData.email}
            name="email"
            onChange={handleInputChange}
          />
        </form>

        <div
          className="p-2 my-1 mt-10 mb-24 text-center text-white rounded-lg cursor-pointer bg-main-color-500"
          onClick={personalSignup}
        >
          회원가입
        </div>

        <div className="flex flex-col items-center justify-center px-8 mt-10">
          <p className="mb-2 text-sm text-center text-black-400">
            사업자 고객이신가요? <br />
            가입 후 건강한 라이프스타일을 지원해주세요.
          </p>
          <Link
            to="/signup/business"
            className="font-bold underline cursor-pointer underline-offset-2 text-main-color-700"
          >
            사업자 회원 간편 가입 →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PersonalSignup;
