interface KeywordProps {
  keyword: string;
}

const Keyword = ({ keyword }: KeywordProps) => {
  return (
    <div className="px-4 py-1 rounded-full shadow-[-5px_3px_27px_-8px_rgba(0,_0,_0,_0.25)] ring-1 ring-black-100 text-main-color-700">
      {keyword}
    </div>
  );
};

export default Keyword;
