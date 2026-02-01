// src/app/admin/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';



export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalQuotes: 0,
    pendingQuotes: 0,
    totalClients: 0,
    revenue: 0,
  });
  const [recentQuotes, setRecentQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load mock data - In production, this would be API calls
  useEffect(() => {
    const loadDashboardData = () => {
      // Mock stats data
      setStats({
        totalQuotes: 48,
        pendingQuotes: 12,
        totalClients: 24,
        revenue: 125400,
      });

      // Mock recent quotes
      setRecentQuotes([
        {
          id: 'QR-2024-001',
          client: 'John Smith',
          company: 'Tech Corp',
          service: 'Website Development',
          budget: '$5,000 - $10,000',
          date: '2024-01-15',
          status: 'New',
          priority: 'high',
        },
        {
          id: 'QR-2024-002',
          client: 'Sarah Johnson',
          company: 'Creative Agency',
          service: 'AI Automation',
          budget: '$10,000 - $20,000',
          date: '2024-01-14',
          status: 'Contacted',
          priority: 'medium',
        },
        {
          id: 'QR-2024-003',
          client: 'Mike Wilson',
          company: 'Startup XYZ',
          service: 'Mobile App',
          budget: '$20,000+',
          date: '2024-01-13',
          status: 'Quote Sent',
          priority: 'high',
        },
        {
          id: 'QR-2024-004',
          client: 'Emma Davis',
          company: 'E-commerce Store',
          service: 'Website Template',
          budget: '$1,000 - $5,000',
          date: '2024-01-12',
          status: 'New',
          priority: 'medium',
        },
        {
          id: 'QR-2024-005',
          client: 'Robert Brown',
          company: 'Consulting Firm',
          service: 'Full-Stack Solution',
          budget: '$50,000+',
          date: '2024-01-11',
          status: 'Negotiation',
          priority: 'high',
        },
      ]);

      setIsLoading(false);
    };

    loadDashboardData();
  }, []);

  const handleQuoteAction = (quoteId, action) => {
    console.log(`${action} clicked for quote ${quoteId}`);
    // In production: API call to update quote
  };

  if (isLoading) {
    return (
      <div className="admin-loading-content">
        <div className="admin-loading-spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Stats Overview */}
      <div className="admin-stats-grid">
   
       
       
     
      </div>

      {/* Recent Quotes Section */}
      <div className="admin-section">
        <div className="admin-section-header">
          <h2>Recent Quote Requests</h2>
          <Link href="/admin/quotes" className="admin-btn-secondary">
            View All Quotes
          </Link>
        </div>
        
      </div>

      {/* Quick Actions */}
      <div className="admin-section">
        <h2>Quick Actions</h2>
        <div className="admin-quick-actions">
          <button className="admin-quick-action">
            <i className="fas fa-plus-circle"></i>
            <span>Create New Quote</span>
          </button>
          <button className="admin-quick-action">
            <i className="fas fa-user-plus"></i>
            <span>Add New Client</span>
          </button>
          <button className="admin-quick-action">
            <i className="fas fa-envelope"></i>
            <span>Send Bulk Email</span>
          </button>
          <button className="admin-quick-action">
            <i className="fas fa-download"></i>
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="admin-section">
        <h2>Recent Activity</h2>
        <div className="admin-activity-feed">
          <div className="admin-activity-item">
            <div className="activity-icon new-quote">
              <i className="fas fa-plus"></i>
            </div>
            <div className="activity-content">
              <p><strong>New quote request</strong> from Tech Corp</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          <div className="admin-activity-item">
            <div className="activity-icon status-change">
              <i className="fas fa-sync-alt"></i>
            </div>
            <div className="activity-content">
              <p>Quote <strong>QR-2024-002</strong> status changed to "Contacted"</p>
              <span className="activity-time">4 hours ago</span>
            </div>
          </div>
          <div className="admin-activity-item">
            <div className="activity-icon new-client">
              <i className="fas fa-user-plus"></i>
            </div>
            <div className="activity-content">
              <p><strong>New client registered</strong> - Creative Agency</p>
              <span className="activity-time">Yesterday</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}