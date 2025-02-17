import { Link } from 'react-router-dom';
import InputForm from '../components/InputForm';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  authVerify,
  checkAccountAvailability,
  sendVerificationCode,
  useSignupBusiness,
} from '../api/Signup';
import checkImg from '../assets/check.png';

interface BusinessSignupForm {
  name: string;
  account: string;
  password: string;
  email: string;
  registrationNumber: string;
  startDate: string;
  ownerName: string;
  companyName: string;
  passwordConfirm: string;
  code: string;
  accountCheck: boolean;
  codeCheck: boolean;
}

const BusinessSignup = () => {
  const { mutate: signupBusiness } = useSignupBusiness();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<BusinessSignupForm>({
    defaultValues: { accountCheck: false, codeCheck: false },
  });
  const [showVerificationInput, setShowVerificationInput] = useState<boolean>(false);
  const [isAccountCheck, setIsAccountCheck] = useState<boolean>(false);
  const [isCodeCheck, setIsCodeCheck] = useState<boolean>(false);

  const handleCheckAccount = async () => {
    const account = watch('account');

    if (!account) {
      setError('account', { type: 'manual', message: '아이디를 입력해주세요.' });
      return;
    }

    if (!account.match(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
      setError('account', { type: 'manual', message: '아이디 형식에 맞지 않습니다.' });
      return;
    }

    clearErrors('account');

    try {
      const isAvailable = await checkAccountAvailability(account);
      if (isAvailable) {
        setIsAccountCheck(true);
        setValue('accountCheck', true);
      }
    } catch (error) {
      console.log(error);
      setError('account', { type: 'manual', message: '이미 사용 중인 아이디입니다.' });
      setValue('accountCheck', false);
    }
  };

  const handleSendVerificationCode = () => {
    const email = watch('email');

    if (!email) {
      setError('email', { type: 'manual', message: '이메일을 입력해주세요.' });
      return;
    }

    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      setError('email', { type: 'manual', message: '이메일 형식에 맞지 않습니다.' });
      return;
    }

    clearErrors('email');

    setShowVerificationInput(true);
    sendVerificationCode(email);
  };

  const handleAuthVerify = async () => {
    const email = watch('email');
    const code = watch('code');

    if (!code) {
      setError('code', { type: 'manual', message: '인증번호를 입력해주세요.' });
      return;
    }

    try {
      const isAvailable = await authVerify(email, code);
      if (isAvailable) {
        setIsCodeCheck(true);
        setValue('codeCheck', true);
        clearErrors('code');
      }
    } catch (error) {
      console.log(error);
      setError('code', { type: 'manual', message: '잘못된 인증 번호입니다.' });
      setValue('codeCheck', false);
    }
  };

  const onSubmit: SubmitHandler<BusinessSignupForm> = ({
    account,
    password,
    name,
    email,
    registrationNumber,
    startDate,
    ownerName,
    companyName,
    accountCheck,
    codeCheck,
  }) => {
    if (!accountCheck) {
      setError('account', { type: 'manual', message: '아이디 중복 확인을 해주세요.' });
      return;
    }
    if (!codeCheck && !showVerificationInput) {
      setError('email', { type: 'manual', message: '이메일 인증을 해주세요.' });
      return;
    }
    if (!codeCheck && showVerificationInput) {
      setError('code', { type: 'manual', message: '이메일 인증을 해주세요.' });
      return;
    }

    const postData = {
      account,
      password,
      name,
      email,
      registrationNumber,
      startDate,
      ownerName,
      companyName,
    };
    signupBusiness(postData);
  };

  return (
    <div className="w-full h-[calc(100vh-3.75rem)] bg-white flex items-center justify-start flex-col">
      <div className="p-24 w-fit">
        <p className="mb-1 text-3xl font-bold text-black-800">사업자 회원가입</p>
        <p className="mb-16 text-black-400">사업자 회원으로 전용 특가 혜택을 누려보세요.</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputForm
            label="이름"
            type="text"
            placeholder="홍길동"
            error={errors.name?.message}
            register={register('name', {
              required: '이름을 입력해주세요.',
            })}
          />

          <div className="relative flex items-center">
            <InputForm
              label="아이디"
              type="text"
              placeholder="ID"
              tip="영어 대문자 또는 소문자, 숫자 포함 8자 이상으로 입력해주세요."
              error={errors.account?.message}
              register={register('account', {
                required: '아이디를 입력해주세요.',
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                  message: '아이디 형식에 맞지 않습니다.',
                },
              })}
            />
            {isAccountCheck ? (
              <img
                src={checkImg}
                alt="인증완료"
                className="absolute h-auto w-7"
                style={{ top: '35px', right: '-50px' }}
              />
            ) : (
              <div
                className="absolute px-3 py-2 text-sm rounded-lg cursor-pointer text-black-400 hover:bg-main-color-100 hover:text-main-color-800 bg-black-100"
                style={{ top: '35px', right: '-90px' }}
                onClick={handleCheckAccount}
              >
                중복 확인
              </div>
            )}
          </div>

          <InputForm
            label="비밀번호"
            type="password"
            placeholder="********"
            tip="숫자, 영어 대/소문자, 특수문자 포함 8자 이상으로 입력해주세요."
            error={errors.password?.message}
            register={register('password', {
              required: '비밀번호를 입력해주세요.',
              minLength: {
                value: 8,
                message: '최소 8자부터 입력 가능합니다.',
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()[\]{}|;:,.<>?/~`=_+-]).{8,}$/,
                message: '비밀번호 형식에 맞지 않습니다.',
              },
            })}
          />

          <InputForm
            label="비밀번호 확인"
            type="password"
            placeholder="********"
            error={errors.passwordConfirm?.message}
            register={register('passwordConfirm', {
              required: '확인할 비밀번호를 입력해주세요.',
              validate: {
                matchPassword: value => {
                  const password = watch('password');
                  return password === value || '비밀번호가 일치하지 않습니다';
                },
              },
            })}
          />

          <div className="relative flex items-center">
            <InputForm
              label="회사 이메일"
              type="text"
              placeholder="mediger@gmail.com"
              error={errors.email?.message}
              register={register('email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '이메일 형식에 맞지 않습니다.',
                },
              })}
            />
            <div
              onClick={handleSendVerificationCode}
              className="absolute px-3 py-2 text-sm rounded-lg cursor-pointer text-black-400 hover:bg-main-color-100 hover:text-main-color-800 bg-black-100"
              style={{ top: '35px', right: '-90px' }}
            >
              인증 코드
            </div>
          </div>

          {showVerificationInput && (
            <div className="relative flex items-center">
              <InputForm
                label="인증 코드"
                type="text"
                placeholder="인증 코드를 입력하세요."
                error={errors.code?.message}
                register={register('code', {
                  required: '인증 코드를 입력해주세요.',
                })}
              />
              {isCodeCheck ? (
                <img
                  src={checkImg}
                  alt="인증완료"
                  className="absolute h-auto w-7"
                  style={{ top: '35px', right: '-50px' }}
                />
              ) : (
                <div
                  onClick={handleAuthVerify}
                  className="absolute px-3 py-2 text-sm rounded-lg cursor-pointer text-black-400 hover:bg-main-color-100 hover:text-main-color-800 bg-black-100"
                  style={{ top: '35px', right: '-90px' }}
                >
                  인증 확인
                </div>
              )}
            </div>
          )}

          <InputForm
            label="법인명 또는 상호"
            type="text"
            placeholder="메디저"
            error={errors.companyName?.message}
            register={register('companyName', {
              required: '이름을 입력해주세요.',
            })}
          />

          <InputForm
            label="사업자 등록 번호"
            type="text"
            placeholder="1234567890"
            tip="하이픈(-)을 빼고 입력해주세요."
            error={errors.registrationNumber?.message}
            register={register('registrationNumber', {
              required: '사업자 등록 번호를 입력해주세요.',
              pattern: {
                value: /^\d{10}$/,
                message: '사업자 등록 번호가 형식에 맞지 않습니다.',
              },
            })}
          />

          <InputForm
            label="개업일자"
            type="text"
            placeholder="2025-01-01"
            tip="연도-월-일 형식으로 입력해주세요."
            error={errors.startDate?.message}
            register={register('startDate', {
              required: '개업일자를 입력해주세요.',
              pattern: {
                value: /^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/,
                message: '개업일자가 형식에 맞지 않습니다.',
              },
            })}
          />

          <InputForm
            label="대표자명"
            type="text"
            placeholder="홍길동"
            error={errors.ownerName?.message}
            register={register('ownerName', {
              required: '이름을 입력해주세요.',
            })}
          />

          <button
            type="submit"
            className="w-full p-3 my-1 mt-10 mb-24 text-center text-white rounded-lg cursor-pointer bg-main-color-500"
          >
            회원가입
          </button>
        </form>

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
