import { RiLiveFill } from "react-icons/ri";
import { CgWebsite } from "react-icons/cg";
import { MdAppShortcut } from "react-icons/md";
import { MdAnalytics } from "react-icons/md";
const Cta = () => {
  return (
    <center className="bg-gray-50">
        <h1 className="font-bold text-primaryRed text-5xl mt-[3rem]" >Kami Melayani</h1>

        <div className="flex justify-between px-[150px] mt-[5rem] max-xl:px-[50px] max-sm:px-0 gap-5 max-md:grid grid-cols-2" >
         <div className="flex-row justify-center object-center" >
          <RiLiveFill className="text-primaryRed" size={100} />
          <h1 className="text-primaryRed font-bold text-3xl" >Streaming</h1>
         </div>

         <div className="flex-row justify-center object-center" >
          <CgWebsite className="text-primaryRed" size={100} />
          <h1 className="text-primaryRed font-bold text-3xl" >Pembuatan Web</h1>
         </div>

         <div className="flex-row justify-center object-center" >
          <MdAppShortcut className="text-primaryRed" size={100} />
          <h1 className="text-primaryRed font-bold text-3xl" >Pembuatan Aplikasi</h1>
         </div>

         <div className="flex-row justify-center object-center" >
          <MdAnalytics className="text-primaryRed" size={100} />
          <h1 className="text-primaryRed font-bold text-3xl" >Tim Analyst</h1>
         </div>
        </div>
    </center>
  );
};

export default Cta;
