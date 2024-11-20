import React from "react";
import Image from "next/image"; 
import logo from "@/assets/logo stm@4x-8.png";

const Navbar: React.FC = () => {
  return (
    <nav className="hidden md:block">
      <div className="absolute top-8 left-0 z-20 w-full flex items-center p-4">
        <div className="flex items-center">
          <Image 
            src={logo} 
            alt="Sport Technology Moklet logo" 
            className="h-16 w-auto" 
          />
          <h1 className="ml-4 font-bold text-red-600 text-2xl">
    
          </h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
