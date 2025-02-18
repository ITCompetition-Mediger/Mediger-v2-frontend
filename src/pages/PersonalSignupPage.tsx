import { Link } from 'react-router-dom';
import InputForm from '../components/InputForm';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  authVerify,
  checkAccountAvailability,
  sendVerificationCode,
  useSignupPersonal,
} from '../api/Signup';
import checkImg from '../assets/check.png';
import { AxiosError } from 'axios';

interface PersonalSignupForm {
  account: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  passwordConfirm: string;
  code: string;
  accountCheck: boolean;
  codeCheck: boolean;
}

const PersonalSignup = () => {
  const { mutate: signupPersonal } = useSignupPersonal();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<PersonalSignupForm>({
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
      const axiosError = error as AxiosError<{ codeName?: string }>;
      if (axiosError.response?.data.codeName === 'VA002') {
        console.log('Response Data:', axiosError.response.data);
        setError('account', { type: 'manual', message: '이미 존재하는 아이디입니다.' });
      } else {
        setError('account', { type: 'manual', message: '문제가 발생했습니다. 다시 시도해주세요.' });
      }

      setValue('accountCheck', false);
    }
  };

  const handleSendVerificationCode = () => {
    const phone = watch('phone');

    if (!phone) {
      setError('phone', { type: 'manual', message: '전화번호를 입력해주세요.' });
      return;
    }

    if (!phone.match(/^\d{11}$/)) {
      setError('phone', { type: 'manual', message: '전화번호 형식에 맞지 않습니다.' });
      return;
    }

    clearErrors('phone');

    setShowVerificationInput(true);
    sendVerificationCode(phone);
  };

  const handleAuthVerify = async () => {
    const phone = watch('phone');
    const code = watch('code');

    if (!code) {
      setError('code', { type: 'manual', message: '인증번호를 입력해주세요.' });
      return;
    }

    try {
      const isAvailable = await authVerify(phone, code);
      if (isAvailable) {
        setIsCodeCheck(true);
        setValue('codeCheck', true);
        clearErrors('code');
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ codeName?: string }>;
      if (axiosError.response?.data.codeName === 'CF001') {
        console.log('Response Data:', axiosError.response.data);
        setError('code', { type: 'manual', message: '인증 번호가 일치하지 않습니다.' });
      } else {
        setError('code', { type: 'manual', message: '문제가 발생했습니다. 다시 시도해주세요.' });
      }

      setValue('codeCheck', false);
    }
  };

  const onSubmit: SubmitHandler<PersonalSignupForm> = ({
    account,
    password,
    name,
    email,
    phone,
    accountCheck,
    codeCheck,
  }) => {
    if (!accountCheck) {
      setError('account', { type: 'manual', message: '아이디 중복 확인을 해주세요.' });
      return;
    }
    if (!codeCheck && !showVerificationInput) {
      setError('phone', { type: 'manual', message: '전화번호 인증을 해주세요.' });
      return;
    }
    if (!codeCheck && showVerificationInput) {
      setError('code', { type: 'manual', message: '전화번호 인증을 해주세요.' });
      return;
    }

    const postData = {
      account,
      password,
      name,
      email,
      phone,
    };
    signupPersonal(postData);
  };

  // 재인증
  const account = watch('account');
  useEffect(() => {
    setIsAccountCheck(false);
    setValue('accountCheck', false);
  }, [account, setValue]);

  const code = watch('code');
  useEffect(() => {
    setIsCodeCheck(false);
    setValue('codeCheck', false);
  }, [code, setValue]);

  const phone = watch('phone');
  useEffect(() => {
    setIsCodeCheck(false);
    setValue('codeCheck', false);
    setShowVerificationInput(false);
    setValue('code', '');
  }, [phone, setValue]);

  return (
    <div className="w-full h-[calc(100vh-3.75rem)] bg-white flex items-center justify-start flex-col">
      <div className="p-24 w-fit">
        <p className="mb-1 text-3xl font-bold text-black-800">개인 회원가입</p>
        <p className="mb-16 text-black-400">가입은 쉽고 간단합니다. 시작해볼까요?</p>

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
              label="휴대폰 번호"
              type="text"
              placeholder="01000000000"
              tip="하이픈(-)을 빼고 입력해주세요."
              error={errors.phone?.message}
              register={register('phone', {
                required: '전화번호를 입력해주세요.',
                pattern: {
                  value: /^\d{11}$/,
                  message: '전화번호 형식에 맞지 않습니다.',
                },
              })}
            />
            {!isCodeCheck && (
              <div
                onClick={handleSendVerificationCode}
                className="absolute px-3 py-2 text-sm rounded-lg cursor-pointer text-black-400 hover:bg-main-color-100 hover:text-main-color-800 bg-black-100"
                style={{ top: '35px', right: '-90px' }}
              >
                인증 번호
              </div>
            )}
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
                disabled={isCodeCheck}
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
            label="이메일"
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

          <button
            type="submit"
            className="w-full p-3 my-1 mt-10 mb-24 text-center text-white rounded-lg cursor-pointer bg-main-color-500"
          >
            회원가입
          </button>
        </form>

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
