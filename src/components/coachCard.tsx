"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";

interface Coach {
  id: number;
  nama: string;
  club: string;
  foto: string;
}

interface CoachCardProps {
  coach: Coach;
}

export function CoachCard({ coach }: CoachCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image
          src={coach.foto}
          alt={coach.nama}
          layout="fill"
          objectFit="cover"
          className="object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
          <h3 className="text-xl font-semibold">{coach.nama}</h3>
          <p className="text-sm">{coach.club}</p>
        </div>
      </div>
    </Card>
  );
}
