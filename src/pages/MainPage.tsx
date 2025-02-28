import SearchIcon from '../assets/icon_search.png';
import Keyword from '../components/Keyword';
import Medicine from '../components/Medicine';

const MainPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-40">
      <div className="w-full h-96 bg-black-100"></div>
      <div className="w-fit">
        <p className="text-3xl font-bold text-black-800">
          <span className="text-main-color-500">어떤 영양제</span>를 찾으세요?
        </p>

        <form className="relative">
          <input
            type="text"
            placeholder="제품명, 영양 성분, 건강 고민을 검색해보세요."
            className="w-[40rem] my-8 px-10 py-5 pr-20 rounded-3xl shadow-[-5px_3px_27px_-8px_rgba(0,_0,_0,_0.25)] focus:outline-none"
          ></input>
          <img src={SearchIcon} alt="검색 아이콘" className="absolute w-8 right-6 top-12" />
        </form>

        <div className="flex gap-2 cursor-pointer">
          <Keyword keyword="keyword 1" />
          <Keyword keyword="keyword 2" />
          <Keyword keyword="keyword 3" />
        </div>
      </div>

      <div className="w-full py-20 bg-[linear-gradient(95.8deg,_rgba(242,227,60,0.8)_1.28%,_rgba(0,209,178,0.8)_98.72%)] flex justify-center items-center">
        <div className="w-fit">
          <p className="mb-5 text-2xl font-bold text-white">user님에게 딱 맞춘 영양제</p>

          <div className="flex gap-8">
            <Medicine />
            <Medicine />
            <Medicine />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full p-2">
        <div>
          <p className="mb-6 text-2xl font-bold text-black-800">
            <span className="text-sub-color-500">요즘 인기있는</span> 영양제
          </p>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <p className="mr-6 text-sub-color-800">성별</p>
              <div className="px-4 py-1 rounded-full cursor-pointer bg-sub-color-100">
                <p className="text-sub-color-800">전체</p>
              </div>
              <div className="px-4 py-1 rounded-full cursor-pointer">
                <p className="text-black-500">남성</p>
              </div>
              <div className="px-4 py-1 rounded-full cursor-pointer">
                <p className="text-black-500">여성</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <p className="mr-6 text-sub-color-800">연령</p>
              <div className="px-4 py-1 rounded-full cursor-pointer bg-sub-color-100">
                <p className="text-sub-color-800">전체</p>
              </div>
              <div className="px-4 py-1 rounded-full cursor-pointer">
                <p className="text-black-500">키즈</p>
              </div>
              <div className="px-4 py-1 rounded-full cursor-pointer">
                <p className="text-black-500">10대</p>
              </div>
              <div className="px-4 py-1 rounded-full cursor-pointer">
                <p className="text-black-500">20대</p>
              </div>
              <div className="px-4 py-1 rounded-full cursor-pointer">
                <p className="text-black-500">30대</p>
              </div>
              <div className="px-4 py-1 rounded-full cursor-pointer">
                <p className="text-black-500">40대</p>
              </div>
              <div className="px-4 py-1 rounded-full cursor-pointer">
                <p className="text-black-500">50대</p>
              </div>
              <div className="px-4 py-1 rounded-full cursor-pointer">
                <p className="text-black-500">~60대</p>
              </div>
            </div>

            <div className="flex gap-8 mt-4">
              <Medicine />
              <Medicine />
              <Medicine />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-40 bg-black-100"></div>
    </div>
  );
};

export default MainPage;
