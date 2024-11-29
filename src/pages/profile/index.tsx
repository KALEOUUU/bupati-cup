import { SiteHeader } from "@/components/header"
import { Footer } from "@/components/Footer"
import BupatiCupProfile from "@/components/profilePage"

export default function Profile() {
  return (
    <div className="flex min-h-screen flex-col bg-red-100">
      <SiteHeader />
      <BupatiCupProfile />
      <Footer />
    </div>
  )
}