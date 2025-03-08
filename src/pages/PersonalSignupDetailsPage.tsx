import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const gendersMap = {
  MALE: '남자',
  FEMALE: '여자',
};

const ageGroupsMap = {
  TEENS_TWENTIES: '~20대',
  THIRTIES: '30대',
  FORTIES: '40대',
  FIFTIES: '50대',
  SIXTIES_PLUS: '60대~',
};

const healthCategoriesMap = {
  ESSENTIAL: '필수 건강',
  ENERGY: '에너지',
  STRONG_IMMUNITY: '면역 튼튼',
  HAIR_GROWTH: 'EM 44',
  GOOD_SLEEP: '꿀잠',
  MENSTRUAL_DISCOMFORT: '월경 전 불편',
  BONE_DIAGNOSIS: '뼈진단',
  KIDNEY: '애주가',
  BLOOD_VESSELS: '혈관 튼튼',
  BLOOD_SUGAR: '혈당 관리',
  DIGESTION: '편한 소화',
  DIET: '다이어트',
  SKINCARE: '피부 미용',
  FOCUS: '집중',
  EXAMINEE: '수험생 건강',
};

interface PersonalSignupDetailForm {
  gender: string | null;
  ageGroup: string | null;
  healthConditions: string[];
}

const PersonalSignupDetails = () => {
  const navigate = useNavigate();
  const [personalSignupDetailData, setPersonalSignupDetailData] =
    useState<PersonalSignupDetailForm>({
      gender: null,
      ageGroup: null,
      healthConditions: [],
    });
  const [maxSelectionError, setMaxSelectionError] = useState<string | null>(null);

  const handleGenderChange = (gender: string) => {
    setPersonalSignupDetailData({ ...personalSignupDetailData, gender });
  };

  const handleAgeGroupChange = (ageGroup: string) => {
    setPersonalSignupDetailData({ ...personalSignupDetailData, ageGroup });
  };

  const handleHealthCategoryChange = (category: string) => {
    const updatedHealthConditions = personalSignupDetailData.healthConditions.includes(category)
      ? personalSignupDetailData.healthConditions.filter(item => item !== category)
      : personalSignupDetailData.healthConditions.length < 5
        ? [...personalSignupDetailData.healthConditions, category]
        : personalSignupDetailData.healthConditions;

    if (updatedHealthConditions.length >= 5) {
      setMaxSelectionError('최대 5개만 설정할 수 있습니다.');
    } else {
      setMaxSelectionError(null);
    }

    setPersonalSignupDetailData({
      ...personalSignupDetailData,
      healthConditions: updatedHealthConditions,
    });
  };

  const personalSignup = () => {
    navigate('/');
  };

  return (
    <div className="w-full h-[calc(100vh-3.75rem)] bg-white flex items-center justify-start flex-col">
      <div className="p-24 w-fit">
        <p className="mb-1 text-3xl font-bold text-black-800">추가 정보 입력</p>
        <p className="mb-16 text-black-400">
          거의 다 왔어요. 메디저가 딱 맞는 영양제를 추천해드릴게요!
        </p>

        {/* 성별 */}
        <p className="mb-2 text-sm text-black-400">성별</p>
        <div className="flex gap-2 mb-8">
          {Object.entries(gendersMap).map(([key, value]) => (
            <div
              key={key}
              className={`flex-1 p-2 text-sm text-center border rounded-lg cursor-pointer ${personalSignupDetailData.gender === key ? 'bg-main-color-100 text-main-color-600 border-main-color-200' : 'bg-black-100 border-black-200 text-black-400'}  transition-colors duration-600`}
              onClick={() => handleGenderChange(key)}
            >
              {value}
            </div>
          ))}
        </div>

        {/* 연령대 */}
        <p className="mb-2 text-sm text-black-400">연령대</p>
        <div className="flex gap-2 mb-8">
          {Object.entries(ageGroupsMap).map(([key, value]) => (
            <div
              key={key}
              className={`flex-1 p-2 text-sm text-center border rounded-lg cursor-pointer ${personalSignupDetailData.ageGroup === key ? 'bg-main-color-100 text-main-color-600 border-main-color-200' : 'bg-black-100 border-black-200 text-black-400'}  transition-colors duration-600`}
              onClick={() => handleAgeGroupChange(key)}
            >
              {value}
            </div>
          ))}
        </div>

        {/* 건강 고민 */}
        <div className="flex flex-col justify-start mb-8">
          <label className="mb-2 text-sm text-black-400">
            건강 고민
            <span
              className={`ml-1 ${maxSelectionError ? 'text-red-500 underline underline-offset-4' : ''} `}
            >
              (최대 5개 선택)
            </span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(healthCategoriesMap).map(([key, value]) => (
              <div
                key={key}
                className={`flex-1 p-2 text-center border rounded-lg cursor-pointer ${personalSignupDetailData.healthConditions.includes(key) ? 'bg-main-color-100 text-main-color-600 border-main-color-200' : 'bg-black-100 border-black-200 text-black-400'}  transition-colors duration-600`}
                onClick={() => handleHealthCategoryChange(key)}
              >
                {value}
              </div>
            ))}
          </div>
        </div>

        <div
          className="p-2 my-1 mt-10 mb-20 text-center text-white rounded-lg cursor-pointer bg-main-color-500"
          onClick={personalSignup}
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

export default PersonalSignupDetails;
