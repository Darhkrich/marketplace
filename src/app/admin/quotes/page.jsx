// src/app/admin/quotes/page.jsx
'use client';

import { useState, useEffect } from 'react';


export default function QuotesPage() {
  const [quotes, setQuotes] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - In production: API call
    const mockQuotes = [
      {
        id: 'QR-2024-001',
        client: { name: 'John Smith', email: 'john@techcorp.com', phone: '+1234567890' },
        company: 'Tech Corp',
        services: ['Website Development', 'AI Chatbot'],
        budget: '$5,000 - $10,000',
        timeline: '1-3 months',
        description: 'Need a corporate website with AI chatbot integration',
        submitted: '2024-01-15 14:30',
        status: 'New',
        priority: 'high',
        source: 'Website',
        assignedTo: null,
      },
      // Add more mock quotes...
    ];

    setQuotes(mockQuotes);
    setIsLoading(false);
  }, []);

  const handleUpdateStatus = (quoteId, newStatus) => {
    // Update quote status
    setQuotes(prev => prev.map(quote => 
      quote.id === quoteId ? { ...quote, status: newStatus } : quote
    ));
    console.log(`Updated quote ${quoteId} to status: ${newStatus}`);
  };

  const handleAssign = (quoteId, assignee) => {
    setQuotes(prev => prev.map(quote => 
      quote.id === quoteId ? { ...quote, assignedTo: assignee } : quote
    ));
  };

  const handleDelete = (quoteId) => {
    if (confirm('Are you sure you want to delete this quote?')) {
      setQuotes(prev => prev.filter(quote => quote.id !== quoteId));
    }
  };

  const filteredQuotes = quotes.filter(quote => {
    if (filter !== 'all' && quote.status !== filter) return false;
    if (search) {
      const searchLower = search.toLowerCase();
      return (
        quote.id.toLowerCase().includes(searchLower) ||
        quote.client.name.toLowerCase().includes(searchLower) ||
        quote.company.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  return (
    <div className="admin-quotes-page">
      <div className="admin-page-header">
        <h1>Quote Management</h1>
        <div className="admin-actions">
          <button className="admin-btn-primary">
            <i className="fas fa-plus"></i>
            Add New Quote
          </button>
          <button className="admin-btn-secondary">
            <i className="fas fa-download"></i>
            Export
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-filters">
        <div className="admin-search">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search quotes by ID, client, or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="admin-filter-tabs">
          {['all', 'New', 'Contacted', 'Quote Sent', 'Negotiation', 'Won', 'Lost'].map(status => (
            <button
              key={status}
              className={`admin-filter-tab ${filter === status ? 'active' : ''}`}
              onClick={() => setFilter(status)}
            >
              {status === 'all' ? 'All Quotes' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Quotes Table */}
    

      {/* Statistics */}
      <div className="admin-quotes-stats">
        <div className="admin-stat-card">
          <h3>Total Quotes</h3>
          <p className="stat-value">{quotes.length}</p>
        </div>
        <div className="admin-stat-card">
          <h3>New Requests</h3>
          <p className="stat-value">{quotes.filter(q => q.status === 'New').length}</p>
        </div>
        <div className="admin-stat-card">
          <h3>Conversion Rate</h3>
          <p className="stat-value">24%</p>
        </div>
        <div className="admin-stat-card">
          <h3>Avg. Response Time</h3>
          <p className="stat-value">4.2 hours</p>
        </div>
      </div>
    </div>
  );
}