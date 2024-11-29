import { LayoutDashboard, Package, UserCircle, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from 'react'
import { AddPlayerForm } from "@/components/playerForm"
import { AddClub } from '@/components/addClub'
import { GroupForm } from './groupForm'

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [activeDashboard, setActiveDashboard] = useState<'group' | 'club' | 'player'>('group')

  const getFormComponent = () => {
    switch (activeDashboard) {
      case 'group':
        return (
          <GroupForm 
            onClose={() => setShowAddForm(false)} 
            onSubmit={(groupData) => {
              // Handle group submission logic here
              console.log('Group data submitted:', groupData);
            }} 
          />
        );
      case 'club':
        return <AddClub onClose={() => setShowAddForm(false)} />;
      case 'player':
        return <AddPlayerForm onClose={() => setShowAddForm(false)} />;
    }
  }

  return (
    <div className={`min-h-full ${isCollapsed ? 'w-16' : 'w-64'} bg-white p-6 flex flex-col transition-all duration-300 ease-in-out relative`}>
      <div className={`mb-8 ${isCollapsed ? 'hidden' : ''}`}>
        <h1 className="text-red-600 text-2xl font-bold">IMMORTAL CUP</h1>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-6 hover:bg-red-100 rounded-full shadow-md"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
      
      <nav className={`flex-1 space-y-4 ${isCollapsed ? 'hidden' : ''}`}>
        <Link 
          href="/dashboard"
          className={`flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 ${activeDashboard === 'group' ? 'bg-red-50' : ''}`}
          onClick={() => setActiveDashboard('group')}
        >
          <LayoutDashboard className="h-5 w-5" />
          <span className={activeDashboard === 'group' ? 'text-red-600' : ''}>Group Dashboard</span>
        </Link>
        
        <Link 
          href="/dashboard/club"
          className={`flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 ${activeDashboard === 'club' ? 'bg-red-50' : ''}`}
          onClick={() => setActiveDashboard('club')}
        >
          <Package className="h-5 w-5" />
          <span className={activeDashboard === 'club' ? 'text-red-600' : ''}>Club Dashboard</span>
        </Link>
        
        <Link 
          href="/dashboard/player"
          className={`flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 ${activeDashboard === 'player' ? 'bg-red-50' : ''}`}
          onClick={() => setActiveDashboard('player')}
        >
          <UserCircle className="h-5 w-5" />
          <span className={activeDashboard === 'player' ? 'text-red-600' : ''}>Player Dashboard</span>
        </Link>
      </nav>
      
      <Button 
        className={`w-full bg-red-600 hover:bg-red-700 ${isCollapsed ? 'hidden' : ''}`}
        onClick={() => setShowAddForm(true)}
      >
        <Plus className="h-5 w-5 mr-2" />
        Add {activeDashboard.charAt(0).toUpperCase() + activeDashboard.slice(1)}
      </Button>
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            {getFormComponent()}
          </div>
        </div>
      )}
    </div>
  )
}
