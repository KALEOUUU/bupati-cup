'use client'

import {
  LayoutDashboard,
  Package,
  UserCircle,
  Plus,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AddPlayerForm } from '@/components/playerForm';
import { AddClub } from '@/components/addClub';
import { GroupForm } from './groupForm';
import { CoachCard } from '@/components/coachCard';

interface SidebarProps {
  initialActiveDashboard?: string;
}

export function Sidebar({ initialActiveDashboard = 'group' }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeDashboard, setActiveDashboard] = useState(initialActiveDashboard);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/dashboard') setActiveDashboard('group');
    else if (pathname === '/dashboard/club') setActiveDashboard('club');
    else if (pathname === '/dashboard/player') setActiveDashboard('player');
    else if (pathname === '/dashboard/coach') setActiveDashboard('coach');
  }, [pathname]);

  const dummyCoach = {
    id: 1,
    name: 'John Doe',
    club: 'Immortal FC',
    image: '/path-to-coach-image.jpg',
    achievements: { coachOfMatch: false },
  };

  const getFormComponent = () => {
    switch (activeDashboard) {
      case 'group':
        return (
          <GroupForm
            onClose={() => setShowAddForm(false)}
            onSubmit={(groupData) => {
              console.log('Group data submitted:', groupData);
              setShowAddForm(false);
            }}
          />
        );
      case 'club':
        return <AddClub onClose={() => setShowAddForm(false)} />;
      case 'player':
        return <AddPlayerForm onClose={() => setShowAddForm(false)} />;
      case 'coach':
        return (
          <CoachCard
            coach={dummyCoach}
            onAchievementUpdate={(coachId, achievements) =>
              console.log(`Achievements updated for coach ${coachId}:`, achievements)
            }
          />
        );
      default:
        return null;
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <div
      className={`min-h-full ${
        isCollapsed ? 'w-16' : 'w-64'
      } bg-white p-6 flex flex-col transition-all duration-300 ease-in-out relative`}
    >
      <div className={`mb-8 ${isCollapsed ? 'hidden' : ''}`}>
        <h1 className="text-red-600 text-2xl font-bold">IMMORTAL CUP</h1>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-6 hover:bg-red-100 rounded-full shadow-md"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      <nav className={`flex-1 space-y-4 ${isCollapsed ? 'hidden' : ''}`}>
        <Link
          href="/dashboard"
          className={`flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg transition-colors duration-200 ${
            isActive('/dashboard') ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'hover:bg-gray-100'
          }`}
          aria-current={isActive('/dashboard') ? 'page' : undefined}
        >
          <LayoutDashboard className="h-5 w-5" />
          <span>Group Dashboard</span>
        </Link>

        <Link
          href="/dashboard/club"
          className={`flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg transition-colors duration-200 ${
            isActive('/dashboard/club') ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'hover:bg-gray-100'
          }`}
          aria-current={isActive('/dashboard/club') ? 'page' : undefined}
        >
          <Package className="h-5 w-5" />
          <span>Club Dashboard</span>
        </Link>

        <Link
          href="/dashboard/player"
          className={`flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg transition-colors duration-200 ${
            isActive('/dashboard/player') ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'hover:bg-gray-100'
          }`}
          aria-current={isActive('/dashboard/player') ? 'page' : undefined}
        >
          <UserCircle className="h-5 w-5" />
          <span>Player Dashboard</span>
        </Link>

        <Link
          href="/dashboard/coach"
          className={`flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg transition-colors duration-200 ${
            isActive('/dashboard/coach') ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'hover:bg-gray-100'
          }`}
          aria-current={isActive('/dashboard/coach') ? 'page' : undefined}
        >
          <UserCircle className="h-5 w-5" />
          <span>Coach Dashboard</span>
        </Link>
      </nav>

      <Button
        className={`w-full bg-red-600 hover:bg-red-700 text-white transition-colors duration-200 ${
          isCollapsed ? 'hidden' : ''
        }`}
        onClick={() => setShowAddForm(true)}
      >
        <Plus className="h-5 w-5 mr-2" />
        Add {activeDashboard.charAt(0).toUpperCase() + activeDashboard.slice(1)}
      </Button>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">{getFormComponent()}</div>
        </div>
      )}
    </div>
  );
}
