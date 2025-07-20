const Navbar = () => {
  return (
    <nav>
      <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4 bg-[#035c67]">
        <a className="flex items-center space-x-3 rtl:space-x-reverse hover:scale-105">
          <img
            src="https://res.cloudinary.com/dmdiia2yv/image/upload/v1738301633/fw7wfmc0yitxpbceerfu_vrdtgb.svg"
            className="h-8"
          />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
