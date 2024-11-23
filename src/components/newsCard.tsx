import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

interface NewsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  content?: string
  image: string
  label?: string
  large?: boolean
}

export function NewsCard({ title, content, image, label, large, className, ...props }: NewsCardProps) {
  return (
    <div className={cn("group relative overflow-hidden rounded-lg mx-auto max-w-md", className)} {...props}>
      <Link href="#" className="relative block">
        <div className={cn("relative", large ? "aspect-[2/1]" : "aspect-[4/3]")}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 p-4 text-white">
          {label && (
            <div className="mb-2">
              <span className="rounded bg-blue-600 px-2 py-1 text-sm font-medium">{label}</span>
            </div>
          )}
          <h2 className={cn("font-bold", large ? "text-2xl" : "text-lg")}>{title}</h2>
          {content && <p className="mt-2 line-clamp-2 text-sm text-gray-200">{content}</p>}
        </div>
      </Link>
    </div>
  )
}

