import { ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface Group {
  id: string
  name: string
  teamCount: number
}

const groups: Group[] = [
  { id: "1", name: "Group A", teamCount: 4 },
  { id: "2", name: "Group B", teamCount: 4 },
  { id: "3", name: "Group C", teamCount: 4 },
  { id: "4", name: "Group D", teamCount: 4 },
]

export function GroupList() {
  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <div
          key={group.id}
          className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm text-black"
        >
          <div className="flex items-center justify-between flex-1 pr-4">
            <span className="text-lg font-medium">{group.name}</span>
            <div className="flex items-center gap-4">
              <span className="text-black">{group.teamCount} Tim</span>
              <ChevronDown className="h-5 w-5 text-black" />
            </div>
          </div>
          <Button variant="outline" className="text-[#BE1E2D] bg-[#FFF1F2] hover:bg-[#BE1E2D] hover:text-[#FFF1F2]">
            Edit
          </Button>
        </div>
      ))}
    </div>
  )
}

