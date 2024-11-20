import Slider from "@/components/Carousesl";
import Cta from "@/components/Cta";
// import Model from "@/components/Models"
import Clasement from "@/components/StandingsTable";
// import Product from "@/components/Product";
// import News from "@/components/News"
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Goal from "@/components/mostGoal";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a QueryClient instance
const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}> {/* Wrap everything here */}
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Slider />
        <Cta />
        <h1 className="text-4xl font-bold text-center text-red-600 mb-8 mt-[5rem]">
          Classements & Statistik Pemain
        </h1>
        <Clasement />
        <Goal/>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
