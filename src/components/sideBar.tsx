'use client';

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
import AddCoach from './addCoach';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
        return <AddCoach onClose={() => setShowAddForm(false)} />;
      default:
        return null;
    }
  };

  const isActive = (path: string) => pathname === path;

  const renderNavLink = (href: string, icon: React.ReactNode, label: string) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={`flex items-center ${
              isCollapsed ? 'justify-center' : 'space-x-4'
            } text-gray-600 hover:text-gray-900 py-3 rounded-lg transition-colors duration-200 ${
              isActive(href) ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'hover:bg-gray-100'
            }`}
          >
            {icon}
            {!isCollapsed && <span className="font-medium">{label}</span>}
          </Link>
        </TooltipTrigger>
        {isCollapsed && (
          <TooltipContent side="right">
            <span>{label}</span>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div
      className={`min-h-full flex flex-col bg-white transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64 p-6'
      } relative border-r border-gray-200`}
    >
      {/* Sidebar Header */}
      <div className="mb-8">
        {!isCollapsed && (
          <h1 className="text-red-600 text-xl font-bold tracking-wide">BUPATI CUP</h1>
        )}
      </div>

      {/* Collapse Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-6 hover:bg-red-100 rounded-full shadow-md"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-4">
        {renderNavLink('/dashboard', <LayoutDashboard className="h-6 w-6" />, 'Group Dashboard')}
        {renderNavLink('/dashboard/club', <Package className="h-6 w-6" />, 'Club Dashboard')}
        {renderNavLink('/dashboard/player', <UserCircle className="h-6 w-6" />, 'Player Dashboard')}
        {renderNavLink('/dashboard/coach', <UserCircle className="h-6 w-6" />, 'Coach Dashboard')}
      </nav>

      {/* Add Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className={`w-full bg-red-600 hover:bg-red-700 text-white transition-colors duration-200 ${
                isCollapsed ? 'p-3' : 'py-3 px-4'
              }`}
              onClick={() => setShowAddForm(true)}
            >
              <Plus className="h-5 w-5" />
              {!isCollapsed && (
                <span className="ml-2 font-medium">
                  Add {activeDashboard.charAt(0).toUpperCase() + activeDashboard.slice(1)}
                </span>
              )}
            </Button>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right">
              Add {activeDashboard.charAt(0).toUpperCase() + activeDashboard.slice(1)}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>

      {/* Modal for Adding Forms */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">{getFormComponent()}</div>
        </div>
      )}
    </div>
  );
}
