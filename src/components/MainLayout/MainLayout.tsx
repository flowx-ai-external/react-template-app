import React from 'react';
import { Sidebar } from '../Sidebar';
import './MainLayout.scss';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  showLogo?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, className = '', showLogo = true }) => {
  return (
    <div className={`main-layout ${className}`}>
      <Sidebar />
      <main className="main-layout__content">
        {showLogo && (
          <div className="main-layout__header">
            <div className="main-layout__logo">
              <span className="main-layout__logo-text">Sugoi</span>
              <span className="main-layout__logo-badge">AI</span>
            </div>
          </div>
        )}
        <div className="main-layout__body">
          {children}
        </div>
      </main>
    </div>
  );
};
