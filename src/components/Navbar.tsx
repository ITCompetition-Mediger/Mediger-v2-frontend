const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 flex justify-between p-4 px-64 bg-white">
      <img
        src="/images/mediger_logo_notbg.png"
        alt="Logo"
        className="object-contain w-24 cursor-pointer"
      />
      <div className="flex gap-8 ">
        <p className="cursor-pointer text-black-500">home</p>
        <p className="cursor-pointer text-black-500">menu</p>
        <p className="cursor-pointer text-black-500">mypage</p>
      </div>
    </div>
  );
};

export default Navbar;

/*
Navbar의 높이 : 3.75rem
=> Navbar를 제외하고 화면 전체를 꽉 채우고 싶다면? h-[calc(100vh-3.75rem)]
*/
