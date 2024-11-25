import { Sidebar } from "@/components/sideBar"
import { GroupList } from "@/components/groupList"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#FFF1F2]">
      <Sidebar />
      <div className="flex-1">
        <main className="p-6">
          <h1 className="mb-6 text-2xl font-bold text-black">Group Dashboard</h1>
          <GroupList />
        </main>
      </div>
    </div>
  )
}

