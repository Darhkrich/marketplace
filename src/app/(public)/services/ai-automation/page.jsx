"use client";
import "./services.css";
import { useState, useMemo } from "react";
import Link from 'next/link';
import { aiAutomations, aiBundles, sectors } from "@/data/aiAutomations";

export default function AIAutomationPage() {
  const [activeSector, setActiveSector] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter automations based on sector and search
  const filteredAutomations = useMemo(() => {
    return aiAutomations.filter(automation => {
      const matchesSector = activeSector === "all" || automation.sector === activeSector;
      const matchesSearch = 
        searchQuery === "" || 
        automation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        automation.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        automation.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesSector && matchesSearch;
    });
  }, [activeSector, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <main className="wc-services-page wc-ai-page">

      {/* HERO */}
      <section className="wc-services-hero wc-ai-hero">
        <div className="wc-services-hero-text">
          <span className="wc-pill">
            <i className="fas fa-robot" /> AI Automation
          </span>
          <h1>Automate your workflows, not your customers.</h1>
          <p>
            We build AI automations for businesses — from chatbots and lead
            qualification to email workflows and internal tools.
          </p>
        </div>

        <div className="wc-services-hero-demo">
          <div className="wc-hero-demo-card wc-ai-hero-card">
            <div className="wc-hero-label">Automation Flow Preview</div>

            <div className="wc-hero-window">
              <div className="wc-hero-window-header">
                <span /><span /><span />
              </div>
              <div className="wc-hero-window-body">
                <p>A customer message triggers smart actions:</p>
                <div className="wc-demo-automation">
                  <div className="wc-demo-bubble wc-demo-bubble--user">
                    "Hi, I want a website for my shop."
                  </div>
                  <div className="wc-demo-bubble wc-demo-bubble--bot">
                    "Great! What type of products do you sell?"
                  </div>
                  <div className="wc-demo-bubble wc-demo-bubble--system">
                    Lead created · Email sent · Task assigned
                  </div>
                </div>
              </div>
            </div>

            <Link href="/contact" className="wc-btn-primary">
              Book AI Automation Call
            </Link>
          </div>
        </div>
      </section>

      {/* SEARCH & FILTER */}
      <section className="wc-ai-controls">
        <div className="wc-ai-search">
          <div className="wc-input-chip">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search automations (e.g. 'chatbot', 'email', 'scheduling')"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="wc-ai-filters">
          <div className="wc-ai-filters-header">
            <h2>Browse AI automations by sector</h2>
            <p>Pick your industry to see what we can automate.</p>
          </div>

          <div className="wc-ai-filter-chips">
            {sectors.map(sector => (
              <button
                key={sector.id}
                className={`wc-ai-chip ${
                  activeSector === sector.id ? "wc-ai-chip--active" : ""
                }`}
                onClick={() => setActiveSector(sector.id)}
              >
                {sector.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* AUTOMATIONS GRID */}
      <section className="wc-service-section wc-ai-section">
        <header className="wc-service-section-header">
          <div>
            <h2>AI Automation Solutions</h2>
            <p>
              Choose from our pre-built AI automations or request a custom solution.
              Each automation includes setup, training, and ongoing support.
            </p>
          </div>
          <div className="wc-section-badge">No-code setup available</div>
        </header>

        <div className="wc-ai-automations-grid">
          {filteredAutomations.map(automation => (
            <article key={automation.id} className="wc-ai-automation-card">
              <div className="wc-ai-automation-header">
                <div className="wc-ai-automation-icon">
                  <i className={automation.icon}></i>
                </div>
                <div className="wc-ai-automation-badge">
                  <span className={`wc-sector-badge wc-sector-${automation.sector}`}>
                    {automation.sector.replace("-", " ")}
                  </span>
                </div>
              </div>
              
              <div className="wc-ai-automation-body">
                <h3>{automation.title}</h3>
                <p>{automation.description}</p>
                
                <div className="wc-ai-automation-features">
                  <h4>Key Features:</h4>
                  <ul>
                    {automation.features.slice(0, 3).map((feature, index) => (
                      <li key={index}>
                        <i className="fas fa-check-circle" /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="wc-ai-automation-meta">
                  <div className="wc-ai-automation-price">
                    <span className="wc-price-main">{automation.price}</span>
                    <span className="wc-price-note">{automation.priceNote}</span>
                  </div>
                  <div className="wc-ai-automation-delivery">
                    <i className="fas fa-clock"></i>
                    <span>{automation.deliveryTime} setup</span>
                  </div>
                </div>
              </div>
              
              <div className="wc-ai-automation-footer">
                <div className="wc-ai-automation-actions">
                  <Link 
                    href={`/services/ai-automation/${automation.id}`}
                    className="wc-btn-primary wc-btn-view-details"
                  >
                    <i className="fas fa-eye"></i> View Details
                  </Link>
                  <Link 
                    href={`/contact?automation=${automation.id}`}
                    className="wc-btn-ghost wc-btn-customize"
                  >
                    <i className="fas fa-cog"></i> Customize
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredAutomations.length === 0 && (
          <div className="wc-ai-empty-state">
            <div className="wc-ai-empty-inner">
              <i className="fas fa-search"></i>
              <h3>No automations found for "{searchQuery}"</h3>
              <p>
                Can't find what you're looking for? We can build a custom AI automation
                specifically for your business needs.
              </p>
              <Link href="/contact" className="wc-btn-primary">
                Request Custom Automation
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* READY-MADE BUNDLES */}
      <section className="wc-service-section wc-ai-bundles-section">
        <header className="wc-service-section-header">
          <div>
            <h2>Ready-Made AI Automation Bundles</h2>
            <p>Complete solutions for specific business needs. Fast setup, proven results.</p>
          </div>
        </header>

        <div className="wc-ai-bundles-grid">
          {aiBundles.map(bundle => (
            <article key={bundle.id} className="wc-ai-bundle-card">
              <div className="wc-ai-bundle-header">
                <div className="wc-ai-bundle-tag">{bundle.tag}</div>
                <h3>{bundle.title}</h3>
                <p>{bundle.description}</p>
              </div>
              
              <div className="wc-ai-bundle-body">
                <div className="wc-ai-bundle-includes">
                  <h4>Includes:</h4>
                  <ul>
                    {bundle.items.slice(0, 4).map((item, index) => (
                      <li key={index}>
                        <i className="fas fa-check" /> {item}
                      </li>
                    ))}
                    {bundle.items.length > 4 && (
                      <li className="wc-ai-bundle-more">
                        <i className="fas fa-plus" /> +{bundle.items.length - 4} more features
                      </li>
                    )}
                  </ul>
                </div>
                
                <div className="wc-ai-bundle-features">
                  <div className="wc-ai-bundle-feature">
                    <i className="fas fa-rocket"></i>
                    <span>{bundle.deliveryTime} setup</span>
                  </div>
                  <div className="wc-ai-bundle-feature">
                    <i className="fas fa-chart-line"></i>
                    <span>Proven results</span>
                  </div>
                </div>
              </div>
              
              <div className="wc-ai-bundle-footer">
                <div className="wc-ai-bundle-pricing">
                  <div className="wc-ai-bundle-price">
                    <span className="wc-price-main">{bundle.price}</span>
                    <span className="wc-price-note">{bundle.priceNote}</span>
                  </div>
                  <Link 
                    href={`/services/ai-automation/bundle/${bundle.id}`}
                    className="wc-btn-primary wc-btn-bundle"
                  >
                    View Bundle Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="wc-ai-cta">
        <div className="wc-ai-cta-card">
          <h2>Need a Custom AI Solution?</h2>
          <p>
            Tell us about your business challenges, and we'll design a custom AI automation
            that saves you time and money.
          </p>
          <div className="wc-ai-cta" >
          <div className="wc-ai-cta-buttons">
           
           
           
           
           
            <Link href="/contact"className="wc-btn-primary wc-btn-cta-primary">
          <i className="cta-primary">
              <i className="fas fa-calendar">
              </i> Schedule Consultation
           </i>
          
            </Link>
            <Link href="/services/ai-autom/ai-automation/custom" className="wc-btn-ghost wc-btn clas">
              <i className="fas fa-lightbulb"></i> Learn About Custom Solutions
            </Link>
          
      
          </div>
        </div>
      </div>
      </section>

    </main>
  );
}
