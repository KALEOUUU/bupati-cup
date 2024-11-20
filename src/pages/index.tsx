import Slider from "@/components/Carousesl"
import Cta from "@/components/Cta";
// import Model from "@/components/Models"
import Clasement from "@/components/StandingsTable";
// import Product from "@/components/Product";
// import News from "@/components/News"
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Goal from "@/components/mostGoal";

const data = {
  group_name: "A",
  club_list: [
    {
      id: 1,
      nama: "Club 1",
      main: 5,
      poin: 13,
      menang: 4,
      kalah: 1,
      seri: 0,
      goal: 10,
      kebobolan: 5,
      selisih: 5,
    },
    {
      id: 2,
      nama: "Club 2",
      main: 5,
      poin: 10,
      menang: 3,
      kalah: 2,
      seri: 0,
      goal: 8,
      kebobolan: 6,
      selisih: 2,
    },
    {
      id: 3,
      nama: "Club 3",
      main: 5,
      poin: 9,
      menang: 2,
      kalah: 2,
      seri: 1,
      goal: 7,
      kebobolan: 6,
      selisih: 1,
    },
    {
      id: 4,
      nama: "Club 4",
      main: 5,
      poin: 5,
      menang: 1,
      kalah: 3,
      seri: 1,
      goal: 6,
      kebobolan: 8,
      selisih: -2,
    },
    {
      id: 5,
      nama: "Club 5",
      main: 5,
      poin: 3,
      menang: 1,
      kalah: 4,
      seri: 0,
      goal: 5,
      kebobolan: 9,
      selisih: -4,
    },
    {
      id: 6,
      nama: "Club 6",
      main: 5,
      poin: 1,
      menang: 0,
      kalah: 5,
      seri: 0,
      goal: 4,
      kebobolan: 12,
      selisih: -8,
    },
  ],
};

export default function Home() {
  return (
    <>
    <div className="min-h-screen bg-gray-50">
        <Navbar/>
        <Slider/>
        <Cta/>
        <h1 className="text-4xl font-bold text-center text-red-600 mb-8 mt-[5rem]">
          Classements & Statistik Pemain
        </h1>
        <Clasement data={data} />
        <Goal data={[]} />
        <Footer/>
        </div>
    </>
  );
}
