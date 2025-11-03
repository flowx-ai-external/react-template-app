import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import './DetailLayout.scss';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: React.ReactNode;
}

interface DetailLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ActionButton[];
  className?: string;
  showLogo?: boolean;
}

export const DetailLayout: React.FC<DetailLayoutProps> = ({
  children,
  title,
  subtitle,
  breadcrumbs = [],
  actions = [],
  className = '',
  showLogo = true,
}) => {
  return (
    <div className={`detail-layout ${className}`}>
      <Sidebar />
      <div className="detail-layout__container">
        {/* Logo Section */}
        {showLogo && (
          <div className="detail-layout__logo-bar">
            <div className="detail-layout__logo">
              <span className="detail-layout__logo-text">Sugoi</span>
              <span className="detail-layout__logo-badge">AI</span>
            </div>
          </div>
        )}

        {/* Header Section */}
        <header className="detail-layout__header">
          <div className="detail-layout__header-content">
            <div className="detail-layout__title-section">
              <h1 className="detail-layout__title">{title}</h1>
              {subtitle && <p className="detail-layout__subtitle">{subtitle}</p>}
            </div>

            {actions.length > 0 && (
              <div className="detail-layout__actions">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className={`detail-layout__action-btn detail-layout__action-btn--${action.variant || 'secondary'}`}
                  >
                    {action.icon && <span className="detail-layout__action-icon">{action.icon}</span>}
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <nav className="detail-layout__breadcrumbs">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {crumb.path ? (
                    <Link to={crumb.path} className="detail-layout__breadcrumb-link">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="detail-layout__breadcrumb-text">{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <span className="detail-layout__breadcrumb-separator">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M6 12l4-4-4-4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}
        </header>

        {/* Main Content */}
        <main className="detail-layout__content">
          {children}
        </main>
      </div>
    </div>
  );
};
