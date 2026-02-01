// src/app/admin/quotes/[id]/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import QuoteDetailsPanel from '@/components/admin/QuoteDetailsPanel';
import CommunicationLog from '@/components/admin/CommunicationLog';
import FileAttachments from '@/components/admin/FileAttachments';

export default function QuoteDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    // Mock data - In production: API call to fetch quote by ID
    const mockQuote = {
      id: id,
      client: {
        name: 'John Smith',
        email: 'john@techcorp.com',
        phone: '+1234567890',
        company: 'Tech Corp',
        position: 'CEO',
        website: 'https://techcorp.com',
      },
      services: [
        {
          id: 'web-001',
          name: 'Website Development',
          category: 'web',
          type: 'service',
          price: 5000,
          features: ['Responsive Design', 'CMS Integration', 'SEO Optimization'],
        },
        {
          id: 'ai-001',
          name: 'AI Chatbot',
          category: 'ai',
          type: 'service',
          price: 3000,
          features: ['24/7 Support', 'Custom Responses', 'Analytics Dashboard'],
        },
      ],
      projectDetails: {
        budget: '$5,000 - $10,000',
        timeline: '1-3 months',
        description: 'Need a corporate website with AI chatbot integration for customer support.',
        urgency: 'high',
        howHeard: 'Google Search',
      },
      timeline: [
        { date: '2024-01-15', event: 'Quote Request Submitted', status: 'completed' },
        { date: '2024-01-16', event: 'Initial Contact Made', status: 'completed' },
        { date: '2024-01-17', event: 'Requirements Review', status: 'in-progress' },
        { date: '2024-01-20', event: 'Quote Preparation', status: 'pending' },
        { date: '2024-01-22', event: 'Quote Presentation', status: 'pending' },
      ],
      communications: [
        { id: 1, type: 'email', direction: 'incoming', content: 'Hi, I\'m interested in your services...', timestamp: '2024-01-15 14:30', user: 'Client' },
        { id: 2, type: 'email', direction: 'outgoing', content: 'Thank you for your inquiry...', timestamp: '2024-01-16 10:15', user: 'Admin' },
      ],
      files: [
        { id: 1, name: 'requirements.pdf', type: 'pdf', size: '2.4 MB', uploaded: '2024-01-16' },
        { id: 2, name: 'brand-guidelines.zip', type: 'zip', size: '15.2 MB', uploaded: '2024-01-16' },
      ],
      status: 'New',
      assignedTo: null,
      createdAt: '2024-01-15 14:30',
      lastUpdated: '2024-01-16 10:15',
    };

    setQuote(mockQuote);
    setIsLoading(false);
  }, [id]);

  const handleStatusUpdate = (newStatus) => {
    setQuote(prev => ({ ...prev, status: newStatus }));
    console.log(`Updated quote ${id} status to: ${newStatus}`);
  };

  const handleAssign = (assignee) => {
    setQuote(prev => ({ ...prev, assignedTo: assignee }));
  };

  const handleAddNote = (note) => {
    // Add note to communications
    const newNote = {
      id: Date.now(),
      type: 'note',
      direction: 'internal',
      content: note,
      timestamp: new Date().toISOString(),
      user: 'Admin',
    };
    setQuote(prev => ({
      ...prev,
      communications: [...prev.communications, newNote],
    }));
  };

  if (isLoading) {
    return (
      <div className="admin-loading-content">
        <div className="admin-loading-spinner"></div>
        <p>Loading quote details...</p>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="admin-error">
        <h2>Quote not found</h2>
        <p>The quote you're looking for doesn't exist.</p>
        <button onClick={() => router.push('/admin/quotes')} className="admin-btn-primary">
          Back to Quotes
        </button>
      </div>
    );
  }

  return (
    <div className="admin-quote-detail">
      <div className="admin-page-header">
        <div>
          <button onClick={() => router.push('/admin/quotes')} className="admin-btn-back">
            <i className="fas fa-arrow-left"></i>
            Back to Quotes
          </button>
          <h1>Quote: {quote.id}</h1>
          <div className="admin-breadcrumb">
            <span>Quotes</span>
            <i className="fas fa-chevron-right"></i>
            <span>{quote.id}</span>
          </div>
        </div>
        <div className="admin-quote-actions">
          <div className={`admin-status-badge ${quote.status.toLowerCase()}`}>
            {quote.status}
          </div>
          <button className="admin-btn-secondary">
            <i className="fas fa-print"></i>
            Print
          </button>
          <button className="admin-btn-primary">
            <i className="fas fa-envelope"></i>
            Send Quote
          </button>
        </div>
      </div>

      {/* Quote Tabs */}
      <div className="admin-quote-tabs">
        <button
          className={`admin-quote-tab ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          <i className="fas fa-info-circle"></i>
          Details
        </button>
        <button
          className={`admin-quote-tab ${activeTab === 'communications' ? 'active' : ''}`}
          onClick={() => setActiveTab('communications')}
        >
          <i className="fas fa-comments"></i>
          Communications
          {quote.communications.length > 0 && (
            <span className="admin-tab-badge">{quote.communications.length}</span>
          )}
        </button>
        <button
          className={`admin-quote-tab ${activeTab === 'files' ? 'active' : ''}`}
          onClick={() => setActiveTab('files')}
        >
          <i className="fas fa-paperclip"></i>
          Files
          {quote.files.length > 0 && (
            <span className="admin-tab-badge">{quote.files.length}</span>
          )}
        </button>
        <button
          className={`admin-quote-tab ${activeTab === 'timeline' ? 'active' : ''}`}
          onClick={() => setActiveTab('timeline')}
        >
          <i className="fas fa-history"></i>
          Timeline
        </button>
      </div>

      {/* Tab Content */}
      <div className="admin-quote-content">
        {activeTab === 'details' && (
          <QuoteDetailsPanel
            quote={quote}
            onStatusUpdate={handleStatusUpdate}
            onAssign={handleAssign}
            onAddNote={handleAddNote}
          />
        )}
        
        {activeTab === 'communications' && (
          <CommunicationLog
            communications={quote.communications}
            quoteId={quote.id}
            client={quote.client}
          />
        )}
        
        {activeTab === 'files' && (
          <FileAttachments
            files={quote.files}
            quoteId={quote.id}
          />
        )}
        
        {activeTab === 'timeline' && (
          <div className="admin-timeline">
            {quote.timeline.map((event, index) => (
              <div key={index} className={`timeline-event ${event.status}`}>
                <div className="timeline-event-date">{event.date}</div>
                <div className="timeline-event-content">
                  <h4>{event.event}</h4>
                  <div className={`timeline-event-status ${event.status}`}>
                    {event.status.replace('-', ' ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}