"use client";

import { Carousel } from "flowbite-react";
import Image from "next/image";
import Image1 from "@/assets/berita_1.png";
import Image2 from "@/assets/berita_2.png";
import Image3 from "@/assets/berita_3.png";
import Link from "next/link";
const ImageList = [
  {
    id: "Image1",
    src: Image1,
    description: "SMK TELKOM MALANG X TIMNAS INDONESIA",
    keterangan: "SMK TELKOM MALANG BERKONTRIBUSI UNTUK TIMNAS INDONESIA U-17 DALAM KUALIFIKASI PIALA DUNIA",
    link: "https://timesindonesia.co.id/indonesia-positif/469929/smk-telkom-malang-berkontribusi-di-timnas-indonesia-yang-tampil-di-piala-dunia-u17-2023Kategori%20Berita%20%20%20%20Informasi%20Umum%20%20%20%20Prestasi%20%20%20%20Agenda%20Sekolah%20%20%20%20Pengumuman%20Siswa%20%20%20%20Pengumuman%20Pegawai%20%20%20%20Pengumuman%20Orang%20Tua%20Siswa%20%20%20%20Karya%20SiswaInfo%20Terbaru" // Tambahkan src untuk setiap gambar
  },
  {
    id: "Image2",
    src: Image2,  
    description: "KOMITMEN SMK TELKOM MALANG",
    keterangan: "KOMITMEN SMK TELKOM MALANG UNTUK MENINGKATKAN KUALITAS LULUSAN",
    link: "https://jatim-timur.tribunnews.com/2024/11/18/berkomitmen-cetak-lulusan-berkualitas-smk-telkom-malang-kerja-sama-dengan-markle-inovasi-teknologi"
  },
  {
    id: "Image3",
    src: Image3,
    description: "SMK TELKOM MALANG X JAGOAN HOSTING",
    keterangan: "TELKOM MALANG BERKOLABORASI DENGAN INDUSTRI BESAR",
    link: "https://www.jagoanhosting.com/blog/kerjasama-smk-telkom/"
  },
];

export function Component() {
  return (
    <section className=" w-full min-h-[100%] max-h-[100%] object-fill max-sm:h-[60vh] md:h-[40vh] xl:h-[100vh] lg:h-[100vh] 2xl:h-[100vh]">
      <Carousel
        className="rounded-none"
        theme={{
          scrollContainer: {
            base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth ",
            snap: "snap-x",
          },
          control: {
            base: "inline-flex m-[1rem] h-10 w-10 items-center bg-[#BE1E2D] justify-center border-2 border-white sm:w-10 sm:h-10",
          },
          indicators: {
            base: "h-[15px] w-[30px] rounded-[3px]",
            active: {
              on: "bg-[#BE1E2D] dark:bg-gray-800",
              off: "bg-white/50 hover:bg-white ",
            },
          },
        }}
      >
        {ImageList.map((imageItem) => (
          <div
            key={imageItem.id}
            id={imageItem.id}
            className="flex h-full relative bg-gray-400 dark:bg-gray-700 dark:text-white"
          >
            <Image
              src={imageItem.src}
              alt={imageItem.id}
              layout="fill"
              objectFit="cover"
            />
            <div className="text-white absolute text-left bottom-[150px] left-[200px] max-sm:bottom-[80px] max-sm:left-[3rem] max-lg:left-[7rem] ">
              <h1 className="text-4xl font-extrabold text-red-600 max-md:hidden max-sm:text-2xl">
               {imageItem.description}
              </h1>
              <p className="text-xl font-bold text-red-600 max-sm:hidden" >{imageItem.keterangan}</p>
              <p className="text-md font-bold max-sm:text-sm" ></p>
              <Link href={imageItem.link} target="_blank">
              <button className="group border-primaryRed border-2 py-[0.8rem] text-lg font-bold w-[30%] max-sm:py-[0.3rem] duration-200 hover:bg-primaryRed hover:border-primaryRed">
             <h1 className="group-hover:text-white text-primaryRed">Baca</h1>
            </button>
            </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
}

export default Component;
