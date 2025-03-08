import { Link, useNavigate } from 'react-router-dom';
import InputForm from '../components/InputForm';
import { useForm, SubmitHandler } from 'react-hook-form';

const banksMap = {
  KB_KOOKMIN: 'KB국민은행',
  SHINHAN: '신한은행',
  WOOREE: '우리은행',
  KEB_HANA: 'KEB하나은행',
  SC_FIRST_BANK: 'SC제일은행',
  CITIBANK: '씨티은행',
  SH_SUHYEOP: 'Sh수협은행',
  NH_NONGHYUP: 'NH농협은행',
  KAKAO_BANK: '카카오뱅크',
  K_BANK: '케이뱅크',
  TOSS_BANK: '토스뱅크',
  BANK_OF_KOREA: '한국은행',
  EXIM_BANK: '수출입은행',
  KDB_BANK: 'KDB산업은행',
  IBK_CORPORATE: 'IBK기업은행',
};

interface BusinessSignupDetailsForm {
  businessAddress: string;
  onlineSalesRegistrationNumber: string;
  settlementBank: string;
  settlementAccount: string;
  documentAttachment: FileList | null;
}

const BusinessSignupDetails = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BusinessSignupDetailsForm>();
  const documentAttachment = watch('documentAttachment');

  const onSubmit: SubmitHandler<BusinessSignupDetailsForm> = data => {
    console.log(data);
    navigate('/');
  };

  return (
    <div className="w-full h-[calc(100vh-3.75rem)] bg-white flex items-center justify-start flex-col">
      <div className="p-24 w-fit">
        <p className="mb-1 text-3xl font-bold text-black-800">사업자 회원 추가 정보 입력</p>
        <p className="mb-16 text-black-400">입점에 필요한 추가 정보를 입력해주세요.</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputForm
            label="사업장 주소"
            type="text"
            placeholder="서울시 구로구 연동로 320"
            error={errors.businessAddress?.message}
            register={register('businessAddress', {
              required: '사업장 주소를 입력해주세요.',
            })}
          />

          {/* 통신판매업 신고번호 형식은 2020-서울지역-0000이다. */}
          <InputForm
            label="통신판매업 신고번호"
            type="text"
            placeholder="123456789012"
            tip="하이픈(-)을 빼고 입력해주세요."
            error={errors.onlineSalesRegistrationNumber?.message}
            register={register('onlineSalesRegistrationNumber', {
              required: '통신판매업 신고번호를 입력해주세요.',
              pattern: {
                value: /^\d{4}[가-힣]{2,10}\d{4}$/,
                message: '통신판매업 신고번호 형식에 맞지 않습니다.',
              },
            })}
          />

          <p className="mb-2 text-sm text-black-400">은행 선택</p>
          <select
            {...register('settlementBank', {
              required: '은행을 선택해주세요',
            })}
            className="p-4 mb-8 transition-colors bg-white border-b-2 w-96 focus:outline-none placeholder:text-black-400 text-black-800 focus:border-main-color-500 border-black-400 duration-600"
          >
            {Object.entries(banksMap).map(([key, value]) => (
              <option value={key}>{value}</option>
            ))}
          </select>
          {errors.settlementBank && <p className="text-red-500">{errors.settlementBank.message}</p>}

          <InputForm
            label="정산 계좌"
            type="text"
            placeholder="1234567890123"
            tip="하이픈(-)을 빼고 입력해주세요."
            error={errors.settlementAccount?.message}
            register={register('settlementAccount', {
              required: '정산 계좌를 입력해주세요.',
            })}
          />

          <p className="mt-4 mb-2 text-sm text-black-400">첨부 파일 (선택)</p>
          <div className="relative flex items-center mb-8">
            {/* 파일 선택 input */}
            <input
              id="file"
              type="file"
              className="absolute h-full opacity-0 cursor-pointer w-96"
              {...register('documentAttachment')}
            />

            {/* 파일 찾기 버튼 label */}
            <label
              htmlFor="file"
              className="z-10 px-3 py-2 text-sm rounded-lg cursor-pointer text-black-400 hover:bg-main-color-100 hover:text-main-color-800 bg-black-100"
            >
              파일 찾기
            </label>

            {documentAttachment?.[0] && (
              <p className="ml-4 text-sm text-black-400">
                {documentAttachment[0].name.length > 43
                  ? documentAttachment[0].name.slice(0, 48) + ' ...'
                  : documentAttachment[0].name}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full p-3 my-1 mt-10 mb-24 text-center text-white rounded-lg cursor-pointer bg-main-color-500"
          >
            회원가입
          </button>
        </form>

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
