import React from 'react';
import Image from 'next/image';
import Pln from "@/assets/pln.jpg"
import Bank from "@/assets/bank-jatim.png"
import Tsm from "@/assets/tsm.png"
import Kazoku from "@/assets/kazoku.png"
import Aqnu from "@/assets/aqnu.jpeg"
const logos = [Bank, Pln,Tsm,Kazoku, Aqnu]

export default function ScrollingLogoBanner () {
    const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];
    return (
        <div className="w-full bg-bgColor overflow-y-hiddenn h-[200px] my-[50px]">
          <div className="relative h-full py-3">
            {/* First row of scrolling logos */}
            <div className="flex absolute animate-scroll-right">
              {duplicatedLogos.map((logoSrc, index) => (
                <div
                  key={`logo-${index}`}
                  className="flex-shrink-0 mx-4 bg-transparent rounded-lg p-2 shadow-md flex items-center justify-center h-[150px]"
                  style={{
                    minWidth: '200px',
                  }}
                >
                  <Image
                    src={logoSrc}
                    alt={`Logo ${index + 1}`}
                    className="w-auto h-full object-contain"
                  />
                </div>
              ))}
            </div>
            
            {/* Second row of scrolling logos */}
            <div className="flex absolute animate-scroll-right-2">
              {duplicatedLogos.map((logoSrc, index) => (
                <div
                  key={`logo-duplicate-${index}`}
                  className="flex-shrink-0 mx-4 bg-transparent rounded-lg p-2 shadow-md flex items-center justify-center h-[150px]"
                  style={{
                    minWidth: '200px',
                  }}
                >
                  <Image
                    src={logoSrc}
                    alt={`Logo ${index + 1}`}
                    className="w-auto h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      );
};

