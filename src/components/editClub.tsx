"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Team } from "@/pages/types/dashboard"

interface EditClubDialogProps {
  team: Team
  trigger: React.ReactNode
}

export function EditClub({ team, trigger }: EditClubDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white text-black">
        <DialogHeader>
          <DialogTitle className="text-black">Edit Club</DialogTitle>
          <DialogDescription className="text-black">
            Make changes to the club details here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setOpen(false)
          }}
          className="grid gap-4 py-4"
        >
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-black">Club Name</Label>
            <Input id="name" defaultValue={team.name} className="text-black" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="group" className="text-black">Group</Label>
            <Select defaultValue={team.group} >
              <SelectTrigger id="group" className="text-black">
                <SelectValue placeholder="Select group" className="text-black"/>
              </SelectTrigger>
              <SelectContent className="text-black">
                <SelectItem value="A" >Group A</SelectItem>
                <SelectItem value="B">Group B</SelectItem>
                <SelectItem value="C">Group C</SelectItem>
                <SelectItem value="D">Group D</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="logo" className="text-black">Club Logo</Label>
            <Input id="logo" type="file" accept="image/*"/>
          </div>
          <DialogFooter>
            <Button type="submit" className="text-[#BE1E2D] bg-[#FFF1F2] hover:bg-[#BE1E2D] hover:text-[#FFF1F2]" >Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

