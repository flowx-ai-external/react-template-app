import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DiscoverPanel } from '../DiscoverPanel';
import './Sidebar.scss';

interface SidebarProps {
  className?: string;
}

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleDiscoverClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDiscoverOpen(!isDiscoverOpen);
  };

  const navItems: NavItem[] = [
    {
      path: '/launcher',
      label: 'Launcher',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      path: '/',
      label: 'Home',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      path: '/discover',
      label: 'Discover',
      onClick: handleDiscoverClick,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      path: '/history',
      label: 'History',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      path: '/kitchen-sink',
      label: 'Kitchen Sink',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      path: '/process',
      label: 'Process',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar--collapsed' : ''} ${className}`}>
      <div className="sidebar__content">
        {/* Logo/Toggle Area */}
        <div className="sidebar__header">
          <button
            className="sidebar__toggle"
            onClick={toggleSidebar}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12h18M3 6h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="sidebar__nav">
          {navItems.map((item) => {
            if (item.onClick) {
              // Render as button for items with onClick handlers
              return (
                <button
                  key={item.path}
                  onClick={item.onClick}
                  className={`sidebar__nav-item ${item.path === '/discover' && isDiscoverOpen ? 'sidebar__nav-item--active' : ''}`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <span className="sidebar__nav-icon">{item.icon}</span>
                  {!isCollapsed && <span className="sidebar__nav-label">{item.label}</span>}
                </button>
              );
            }

            // Render as NavLink for regular navigation
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`
                }
                title={isCollapsed ? item.label : undefined}
              >
                <span className="sidebar__nav-icon">{item.icon}</span>
                {!isCollapsed && <span className="sidebar__nav-label">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* User Avatar */}
        <div className="sidebar__footer">
          <div className="sidebar__user">
            <div className="sidebar__user-avatar">
              <span>BM</span>
            </div>
            {!isCollapsed && (
              <div className="sidebar__user-info">
                <div className="sidebar__user-name">User Name</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Discover Panel */}
      <DiscoverPanel isOpen={isDiscoverOpen} onClose={() => setIsDiscoverOpen(false)} />
    </aside>
  );
};
