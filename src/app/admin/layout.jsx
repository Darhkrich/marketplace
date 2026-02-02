'use client';

import Link from 'next/link';
import './admin.css';

// This should be at the top level of your layout.js
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1, // Optional: prevents auto-zoom on input focus in iOS
}




export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      {/* Admin Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>Admin Panel</h2>
          <div className="admin-status">
            <span className="admin-status-indicator online"></span>
            <span>Online</span>
          </div>
        </div>

        <nav className="admin-nav">
          <div className="admin-nav-section">
            <div className="admin-nav-label">Dashboard</div>
            <Link href="/admin" className="admin-nav-item">
              <i className="fas fa-tachometer-alt"></i>
              <span>Overview</span>
            </Link>
          </div>

          <div className="admin-nav-section">
            <div className="admin-nav-label">Quotes & Orders</div>
            <Link href="/admin/quotes" className="admin-nav-item">
              <i className="fas fa-file-invoice-dollar"></i>
              <span>Quote Requests</span>
              <span className="admin-nav-badge">12</span>
            </Link>
            <Link href="/admin/clients" className="admin-nav-item">
              <i className="fas fa-users"></i>
              <span>Clients</span>
              <span className="admin-nav-badge">24</span>
            </Link>
          </div>

          <div className="admin-nav-section">
            <div className="admin-nav-label">Services</div>
            <Link href="/admin/services" className="admin-nav-item">
              <i className="fas fa-cube"></i>
              <span>Service Catalog</span>
            </Link>
            <Link href="/admin/communications" className="admin-nav-item">
              <i className="fas fa-comments"></i>
              <span>Communications</span>
              <span className="admin-nav-badge">3</span>
            </Link>
          </div>

          <div className="admin-nav-section">
            <div className="admin-nav-label">Settings</div>
            <Link href="/admin/settings" className="admin-nav-item">
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </Link>
            <Link href="/" className="admin-nav-item">
              <i className="fas fa-home"></i>
              <span>Back to Site</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-header-left">
            <h1>Admin Dashboard</h1>
            <div className="admin-breadcrumb">
              <span>Dashboard</span>
            </div>
          </div>
          <div className="admin-header-right">
            <div className="admin-user">
              <div className="admin-user-avatar">
                <i className="fas fa-user-shield"></i>
              </div>
              <div className="admin-user-info">
                <span className="admin-user-name">Admin User</span>
                <span className="admin-user-role">Administrator</span>
              </div>
            </div>
          </div>
        </header>

        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
}