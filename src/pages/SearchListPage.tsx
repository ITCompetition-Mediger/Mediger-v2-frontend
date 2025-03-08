import { Link } from 'react-router-dom';
import SearchIcon from '../assets/icon_search.png';
import SearchSupplementItem from '../components/SearchSupplementItem';
import CustomPagination from '../components/CustomPagination';
import { useState } from 'react';

const SearchList = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value - 1);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full gap-40 py-28">
      <div className="absolute left-0 z-10 hidden h-full w-fit md:block">
        <div className="sticky p-6 transform -translate-y-1/2 top-1/2">
          <Link to="/search">
            <p className="py-2 text-base font-bold border-b-2 border-dashed border-black-100 text-black-600">
              영양제 검색
            </p>
          </Link>
          <p className="py-2 text-base font-bold text-black-600">영양제 인기 순위</p>
          <p className="py-1 text-sm text-black-400">성별 / 연령대</p>
          <p className="py-1 text-sm text-black-400">효능별</p>
          <p className="py-1 text-sm text-black-400">건강 고민별</p>
        </div>
      </div>

      <div className="w-6/12">
        <p className="text-2xl font-bold text-black-800">영양제 검색</p>

        <form className="relative">
          <input
            type="text"
            placeholder="제품명, 영양 성분, 건강 고민을 검색해보세요."
            className="w-full my-4 px-10 py-4 pr-20 rounded-3xl shadow-[-5px_3px_27px_-8px_rgba(0,_0,_0,_0.25)] focus:outline-none"
          ></input>
          <img src={SearchIcon} alt="검색 아이콘" className="absolute w-8 right-6 top-7" />
        </form>
      </div>

      <div className="w-6/12 bg-white">
        <div className="flex items-center gap-4 mb-4">
          <p className="text-2xl font-bold text-black-800">검색 결과</p>
          <p className="text-lg text-black-500">총 100개</p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-6 lg:grid-cols-4">
          <SearchSupplementItem />
          <SearchSupplementItem />
          <SearchSupplementItem />
          <SearchSupplementItem />
          <SearchSupplementItem />
          <SearchSupplementItem />
          <SearchSupplementItem />
          <SearchSupplementItem />
          <SearchSupplementItem />
          <SearchSupplementItem />
        </div>
      </div>

      <CustomPagination count={10} page={currentPage + 1} onChange={handleChangePage} />
    </div>
  );
};

export default SearchList;
