import DefaultImage from '../assets/default_image.png';
import StarIcon from '../assets/icon_star.png';

const SearchSupplementItem = () => {
  return (
    <div className="cursor-pointer">
      <img src={DefaultImage} className="w-full rounded-md" />
      <p className="mt-4 text-sm text-black-500">종근당건강</p>
      <p className="font-semibold text-black-800">영양제 비타민 A</p>

      <div className="flex items-center gap-2 mt-3">
        <img src={StarIcon} className="w-4" />
        <p className="text-sm text-black-500">4.8 (101)</p>
      </div>
    </div>
  );
};

export default SearchSupplementItem;
