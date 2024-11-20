import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="max-md:hidden">
      <div className="flex float-start absolute mt-8 *:z-20 w-full items-center p-4 font-bold text-red-600 text-2xl pt-0">
        <a href="/" className="flex float-start p-[10px]">
          Sport Technology Moklet <span className="font-bold text-lg"></span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
