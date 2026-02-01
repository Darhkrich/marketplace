
"use client";

import { useState } from "react";
import Link from "next/link";
import { getServicesByType, getServicesByCategory } from "@/data/app-services";
import "./services.css";
import "@/styles/apps.css";
import AddToQuoteButton from '@/components/common/AddToQuoteButton';

// Service Card Component
function ServiceCard({ service }) {
  return (
    <div className="service-card wc-accent-left">
      <div className="service-card-header">
        <i className={service.icon}></i>
        {service.tag && <span className="service-tag">{service.tag}</span>}
      </div>
      <div className="service-card-body">
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <ul className="wc-service-meta">
          {service.meta?.map((m, i) => (
            <li key={i}>
              <i className={m.icon}></i> {m.text}
            </li>
          ))}
        </ul>
        <div className="service-price">${service.price?.toLocaleString()}</div>
      </div>
      <div className="service-card-actions">
        <Link href={`/services/application/${service.id}`} className="wc-btn-secondary">
          View Details
        </Link>
           {/* FIXED: Changed 'service' to 'template' and 'source' to 'templates' */}
        <AddToQuoteButton 
           item={service} 
          source="templates" 
           className="wc-btn-secondary wc-btn-large"
          />
      </div>
    </div>
  );
}

// Blueprint Card Component
function BlueprintCard({ blueprint }) {
  return (
    <article className="wc-apps-bundle">
      <div className={`wc-apps-bundle-tag ${blueprint.tag === 'Popular' ? 'wc-apps-bundle-tag--accent' : ''}`}>
        {blueprint.tag}
      </div>
      <h3>{blueprint.title}</h3>
      <p>{blueprint.description}</p>
      <ul className="wc-apps-bundle-list">
        {blueprint.features?.map((f, i) => (
          <li key={i}>
            <i className="fas fa-check-circle"></i> {f}
          </li>
        ))}
      </ul>
      <div className="blueprint-price">${blueprint.price?.toLocaleString()}</div>
      <div className="blueprint-actions">
        <Link href={`/services/application/${blueprint.id}`} className="wc-btn-secondary">
          View Blueprint
        </Link>
         {/* FIXED: Changed 'service' to 'template' and 'source' to 'templates' */}
        <AddToQuoteButton 
           item={blueprint} 
          source="templates" 
           className="wc-btn-secondary wc-btn-large"
          />
      </div>
    </article>
  );
}

// Main Page Component
export default function AppsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredServices = getServicesByType(activeFilter);
  const blueprints = getServicesByCategory('blueprint');

  return (
    <main className="wc-services-page wc-apps-page">
    

      {/* Hero Section */}
      
       <section className="wc-services-hero wc-apps-hero">
     
    <div className="wc-services-hero-text">
      <span className="wc-pill">
        <i className="fas fa-mobile-alt"></i>
        Web & Mobile Apps
      </span>
      <h1>Apps that feel premium on every device.</h1>
      <p>
        We design and build fast, modern web and mobile apps that look and feel like 
        native iOS experiences. From MVPs to full products, we handle design, 
        development and launch.
      </p>
    </div>

    <div className="wc-services-hero-demo">
      <div className="wc-hero-demo-card wc-apps-hero-card">
        
<Link href={"/contact"}>
        <button className="wc-btn-primary">Free Consultation</button>
        </Link>
      </div>
    </div>
  </section>
  
      {/* FILTER CHIPS */}
      <section className="wc-apps-filters">
        <div className="wc-apps-filter-chips">
          {["all", "web", "mobile", "fullstack", "saas"].map((type) => (
            <button
              key={type}
              className={`wc-apps-chip ${activeFilter === type ? "wc-apps-chip--active" : ""}`}
              onClick={() => setActiveFilter(type)}
            >
              {type === "all" ? "All Services" : type}
            </button>
          ))}
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="wc-service-section">
        <div className="wc-service-cards wc-apps-cards">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      
      <aside className="wc-service-demo wc-apps-demo">
        <h3>App Flow Preview</h3>
        <p>
          A quick visual of how users move through a typical app that we design: from 
          onboarding to dashboard and settings.
        </p>

        <div className="wc-demo-window wc-apps-demo-window">
          <div className="wc-demo-window-header">
            <span></span><span></span><span></span>
          </div>
          <div className="wc-demo-window-body wc-demo-window-body--plain">
            <div className="wc-apps-flow">
              <div className="wc-apps-flow-step">
                <span className="wc-apps-step-label">1 · Onboarding</span>
                <div className="wc-apps-step-card">
                  Simple welcome screens that explain your product and collect 
                  basic info without overwhelming users.
                </div>
              </div>
              <div className="wc-apps-flow-step">
                <span className="wc-apps-step-label">2 · Main Experience</span>
                <div className="wc-apps-step-card wc-apps-step-card--accent">
                  Clean layout, clear actions, and a design system that stays consistent 
                  across web and mobile.
                </div>
              </div>
              <div className="wc-apps-flow-step">
                <span className="wc-apps-step-label">3 · Settings & Profiles</span>
                <div className="wc-apps-step-card">
                  Profile, notifications, themes and more — organized so users don’t get lost.
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="wc-btn-ghost">Talk about your next app</button>
      </aside>

    
    </main>
  );
}




















      