"use client";
import "./services.css";
import Link from 'next/link';
import React, { useState, useMemo } from 'react';
// Fix the import path based on your structure
// If templates.js is in src/data/, use:
// import { templatesData } from '../../../../data/templates';
// If it's in the same folder, use:
import { templatesData } from '@/data/templates';

export default function TemplatesPage() {
  // --- State Management ---
  const INITIAL_VISIBLE_COUNT = 6;
  const LOAD_MORE_INCREMENT = 6;

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeType, setActiveType] = useState('all');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  // --- Filtering Logic ---
  const filteredTemplates = useMemo(() => {
    return templatesData.filter((template) => {
      // 1. Search Query Logic
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        template.name.toLowerCase().includes(query) ||
        template.shortName.toLowerCase().includes(query) ||
        template.description.toLowerCase().includes(query) ||
        template.category.some(cat => cat.includes(query));

      // 2. Category Logic
      const matchesCategory =
        activeCategory === 'all' || template.category.includes(activeCategory);

      // 3. Type Logic
      const matchesType =
        activeType === 'all' || template.type === activeType;

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [searchQuery, activeCategory, activeType]);

  // --- Event Handlers ---
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setVisibleCount(INITIAL_VISIBLE_COUNT); // Reset view on search
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setVisibleCount(INITIAL_VISIBLE_COUNT); // Reset view on filter change
  };

  const handleTypeClick = (type) => {
    setActiveType(type);
    setVisibleCount(INITIAL_VISIBLE_COUNT); // Reset view on type change
  };

  // --- Toggle Load More / Show Less Logic ---
  const handleToggleLoad = () => {
    if (visibleCount < filteredTemplates.length) {
      // If there are more items to show, load them
      setVisibleCount((prev) => prev + LOAD_MORE_INCREMENT);
    } else {
      // If all items are shown, reset to initial state (Show Less)
      setVisibleCount(INITIAL_VISIBLE_COUNT);
    }
  };

  // Determine button state
  const totalItems = filteredTemplates.length;
  const allLoaded = visibleCount >= totalItems;
  const showButton = totalItems > INITIAL_VISIBLE_COUNT; // Only show button if total items exceed initial view

  return (
    <main className="wc-services-page wc-templates-page">

      {/* HERO */}
      <section className="wc-services-hero wc-templates-hero">
        <div className="wc-services-hero-text">
          <span className="wc-pill">
            <i className="fas fa-globe" style={{ fontSize: '0.8rem' }}></i>
            Ready-Made & Customizable
          </span>
          <h1>Launch fast with Websites built to sell.</h1>
          <p>
            Pick a ready-made website or choose a Customizable Website
            as a starting point for something unique. All Websites are responsive on all devices and optimized for speed.
          </p>
        </div>

        <div className="wc-services-hero-demo">
          <div className="wc-hero-demo-card wc-templates-hero-card">
            <div className="wc-hero-label"> to Contact us if you don't find what You want </div>
            <Link href="/contact">
            <button className="wc-btn-primary1"> Contact Us</button>
            </Link>
          </div>
        </div>
      </section>

      {/* SEARCH + FILTER BAR */}
      <section className="wc-templates-controls">
        <div className="wc-templates-search">
          <div className="wc-input-chip">
            <i className="fas fa-search"></i>
            <input
              type="text"
              id="templateSearch"
              placeholder="Search website (e.g. 'restaurant', 'agency', 'portfolio')"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="wc-templates-filters">
          <div className="wc-templates-filter-chips" id="templateFilterChips">
            {[
              { id: 'all', label: 'All', icon: 'fas fa-border-all' },
              { id: 'business', label: 'Business', icon: 'fas fa-briefcase' },
              { id: 'ecommerce', label: 'E-commerce', icon: 'fas fa-shopping-bag' },
              { id: 'portfolio', label: 'Portfolio', icon: 'fas fa-id-card' },
              { id: 'blog', label: 'Blog', icon: 'fas fa-newspaper' },
              { id: 'landing', label: 'Landing Page', icon: 'fas fa-rocket' },
            ].map((cat) => (
              <button
                key={cat.id}
                className={`wc-t-chip ${activeCategory === cat.id ? 'wc-t-chip--active' : ''}`}
                onClick={() => handleCategoryClick(cat.id)}
                data-category={cat.id}
              >
                <i className={cat.icon}></i> {cat.label}
              </button>
            ))}
          </div>

          <div className="wc-templates-toggle" id="templateTypeToggle">
            {[
              { id: 'all', label: 'All' },
              { id: 'ready', label: 'Ready-Made' },
              { id: 'custom', label: 'Customizable' },
            ].map((typeMode) => (
              <button
                key={typeMode.id}
                className={`wc-t-view ${activeType === typeMode.id ? 'wc-t-view--active' : ''}`}
                onClick={() => handleTypeClick(typeMode.id)}
                data-mode={typeMode.id}
              >
                {typeMode.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TEMPLATES GRID */}
      <section className="wc-service-section wc-templates-section">
        <header className="wc-service-section-header">
          <div>
            <h2>Ready-Made Websites & Customizable Templates</h2>
            <p>
              Choose a template, see the price and what's included. You can always ask for extra pages,
              integrations or a fully custom layout on top.
            </p>
          </div>
          <div className="wc-section-badge">Instant launch options</div>
        </header>

        {/* PRIMARY GRID */}
        <div className="wc-templates-grid" id="templatesGrid">
          {filteredTemplates.slice(0, visibleCount).map((tpl) => (
            <article
              key={tpl.id}
              className="wc-template-card"
              data-id={tpl.id}
              data-name={tpl.shortName}
              data-category={tpl.category.join(' ')}
              data-type={tpl.type}
              data-preview={tpl.previewUrl}
            >
              <div className="wc-template-thumb">
                <div>
                  <img src={tpl.image} alt={`${tpl.shortName} template preview`} />
                </div>
              </div>
              <div className="wc-template-body">
                <div className="wc-template-header">
                  <h3>{tpl.name}</h3>
                  <span className={`wc-template-tag ${tpl.badgeClass}`}>
                    {tpl.badge}
                  </span>
                </div>
                <p>{tpl.description}</p>
                <ul className="wc-template-meta">
                  <li><i className={tpl.icons[0]}></i> {tpl.tags[0]}</li>
                  <li><i className={tpl.icons[1]}></i> {tpl.tags[1]}</li>
                </ul>
                <div className="wc-template-footer">
                  <div className="wc-template-price">
                    <span className="wc-price-main">{tpl.price}</span>
                    <span className="wc-price-note">{tpl.priceNote}</span>
                  </div>
                  <div className="wc-template-actions">
                    <a
                      href={tpl.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wc-btn-ghost wc-btn-previewe"
                      style={{ position: 'relative', zIndex: 999, pointerEvents: 'auto' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="fas fa-eye"></i> Preview
                    </a>
                    
                    {/* FIXED LINK - Use backticks and correct path */}
                    <Link href={`/services/templates/${tpl.id}`}>
                      <button
                        className="wc-btn-primary wc-btn-buys"
                        style={{ 
                          position: 'relative', 
                          zIndex: 999, 
                          pointerEvents: 'auto',
                          cursor: 'pointer' 
                        }}
                        data-template-id={tpl.id}
                      >
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredTemplates.length === 0 && (
          <div className="wc-templates-empty" id="templatesEmpty" style={{ display: 'block' }}>
            <div className="wc-templates-empty-inner">
              <i className="fas fa-search"></i>
              <h3>Didn't find the template you're looking for?</h3>
              <p>
                Tell us about your business, and we'll design a unique website or a new template just for you.
              </p>
              <Link href="/contact" className="wc-btn-ghost wc-btn-contact">
                Contact us for a custom website
              </Link>
            </div>
          </div>
        )}

        {/* LOAD MORE / SHOW LESS BUTTON */}
        {showButton && (
          <div className="wc-templates-loadmore">
            <button
              className="wc-btn-ghost"
              id="btnLoadMoreTemplates"
              onClick={handleToggleLoad}
            >
              {allLoaded ? "Show Less" : "Load more websites"}
            </button>
          </div>
        )}

      </section>
    </main>
  );
}