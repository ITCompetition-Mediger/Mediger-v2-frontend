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
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [accountError, setAccountError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordMatchError, setPasswordMatchError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [showVerificationInput, setShowVerificationInput] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalSignupData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'account') {
      if (!value.match(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
        setAccountError('올바른 형식이 아닙니다.');
      } else {
        setAccountError(null);
      }
    }

    if (name === 'password') {
      if (!value.match(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)) {
        setPasswordError('올바른 형식이 아닙니다.');
      } else {
        setPasswordError(null);
      }
    }

    if (name === 'phone') {
      if (!value.match(/^\d{11}$/)) {
        setPhoneError('올바른 형식이 아닙니다.');
      } else {
        setPhoneError(null);
      }
    }

    if (name === 'email') {
      if (!value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        setEmailError('올바른 형식이 아닙니다.');
      } else {
        setEmailError(null);
      }
    }
  };

  const validatePasswordMatch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (personalSignupData.password !== value) {
      setPasswordMatchError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordMatchError(null);
    }
  };

  const handleRequestVerification = () => {
    setShowVerificationInput(true);
  };

  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
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
              tip="영어 대문자 또는 소문자, 숫자 포함 8자 이상으로 입력해주세요."
              onChange={handleInputChange}
              error={accountError}
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
            error={passwordError}
          />

          <InputForm
            label="비밀번호 확인"
            type="password"
            value={confirmPassword}
            onChange={validatePasswordMatch}
            placeholder="********"
            error={passwordMatchError}
          />

          <div className="relative flex items-center">
            <InputForm
              label="휴대폰 번호"
              type="text"
              placeholder="01000000000"
              value={personalSignupData.phone}
              name="phone"
              tip="하이픈(-)을 빼고 입력해주세요."
              onChange={handleInputChange}
              error={phoneError}
            />
            <div
              onClick={handleRequestVerification}
              className="absolute px-3 py-2 text-sm rounded-lg cursor-pointer text-black-400 hover:bg-main-color-100 hover:text-main-color-800 bg-black-100"
              style={{ top: '35px', right: '-90px' }}
            >
              인증 번호
            </div>
          </div>

          {showVerificationInput && (
            <InputForm
              label="인증 코드"
              type="text"
              placeholder="인증 코드를 입력하세요."
              value={verificationCode}
              onChange={handleVerificationCodeChange}
            />
          )}

          <InputForm
            label="이메일"
            type="text"
            placeholder="mediger@gmail.com"
            value={personalSignupData.email}
            name="email"
            onChange={handleInputChange}
            error={emailError}
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
