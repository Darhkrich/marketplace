'use client';
import "./services.css";
import "./pricing.css";

import { useState } from 'react';
import BuilderSection from './BuilderSection';
import { pricingData } from '@/data/pricing';
import AddToQuoteButton from '@/components/common/AddToQuoteButton';


export default function PricingPage() {
  // State for category tabs
  const [activeCategory, setActiveCategory] = useState('websites');
  
  // State for website type toggle
  const [websiteType, setWebsiteType] = useState('ready');
  
  // State for billing mode
  const [billingMode, setBillingMode] = useState('one-time');
  
  // State for selected package
  const [selectedPackage, setSelectedPackage] = useState(null);
  
  // State for notification
  const [notification, setNotification] = useState({ visible: false, message: '' });

  // Handle package selection
  const handlePackageSelect = (pkg) => {
    const packageData = {
      ...pkg,
      price: billingMode === 'monthly' ? pkg.billingMonthly : pkg.billingOneTime,
      billingMode
    };
    
    setSelectedPackage(packageData);
    handlePackageSelection(packageData.id, packageData);
  };

  // Handle package selection (with notification)
  const handlePackageSelection = (packageId, data) => {
    // Update selected package summary
    const badge = data.badge ? ` • ${data.badge}` : '';
    
    // Save to localStorage (simulating dashboard integration)
    const existing = JSON.parse(localStorage.getItem('wc_selected_packages') || '[]');
    const index = existing.findIndex(pkg => pkg.id === packageId);
    if (index !== -1) {
      existing[index] = data;
    } else {
      existing.push(data);
    }
    localStorage.setItem('wc_selected_packages', JSON.stringify(existing));
    
    // Show notification
    setNotification({
      visible: true,
      message: `✅ "${data.title}" has been added to your client dashboard.`
    });
    
    // Auto-hide notification
    setTimeout(() => {
      setNotification({ visible: false, message: '' });
    }, 7000);
  };

  // Go to client dashboard
  const goToCheckout = () => {
    // In a real application, this would navigate to the dashboard
    window.location.href = '/dashboard';
  };

  // Helper function to capitalize
  const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <main className="wc-services-page wc-pricing-page">
      {/* Notification message */}
      <div 
        id="packageNotification" 
        className={`wc-package-notification ${notification.visible ? 'wc-package-notification--visible' : ''}`} 
        aria-live="polite"
      >
        {notification.message && (
          <>
            <span>{notification.message}</span>
            <br/>
            <span>Go to your <a href="/Checkout">client dashboard</a> to check it out.</span>
          </>
        )}
      </div>

      {/* HERO */}
      <section className="wc-services-hero wc-pricing-hero">

        <div className="wc-services-hero-text">
          <span className="wc-pill">
            <i className="fas fa-tags" style={{ fontSize: '0.8rem' }}></i>
            Transparent pricing
          </span>
          <h1>Pricing that grows with your ideas.</h1>
          <p>
            Choose a ready-made package or build your own mix of websites, apps and AI automation. 
            We keep everything simple, clear and scalable.
          </p>

        </div>

        <div className="wc-services-hero-demo">
         
        </div>
      </section>

      {/* CATEGORY TABS */}
      <section className="wc-pricing-categories">
        <div className="wc-pricing-tabs" id="pricingTabs">
          <button
            className={`wc-pricing-tab ${activeCategory === 'websites' ? 'wc-pricing-tab--active' : ''}`}
            onClick={() => setActiveCategory('websites')}
          >
            <i className="fas fa-globe"></i> Websites
          </button>
          <button
            className={`wc-pricing-tab ${activeCategory === 'apps' ? 'wc-pricing-tab--active' : ''}`}
            onClick={() => setActiveCategory('apps')}
          >
            <i className="fas fa-mobile-alt"></i> Web & Mobile Apps
          </button>
          <button
            className={`wc-pricing-tab ${activeCategory === 'ai' ? 'wc-pricing-tab--active' : ''}`}
            onClick={() => setActiveCategory('ai')}
          >
            <i className="fas fa-robot"></i> AI Automations
          </button>
        </div>
      </section>

      
          <div className="wc-pricing-toggle">
            <span className="wc-toggle-label">Billing</span>
            <div className="wc-pricing-toggle-inner" id="billingToggle">
              <button
                className={`wc-toggle-option ${billingMode === 'one-time' ? 'wc-toggle-option--active' : ''}`}
                onClick={() => setBillingMode('one-time')}
              >
                One-time setup
              </button>
              <button
                className={`wc-toggle-option ${billingMode === 'monthly' ? 'wc-toggle-option--active' : ''}`}
                onClick={() => setBillingMode('monthly')}
              >
                Monthly plan
              </button>
            </div>
            <span className="wc-toggle-hint">
              Monthly option for ongoing maintenance & support.
            </span>
          </div>

      {/* PRICING SECTIONS */}

      {/* WEBSITES: Ready-made & Customizable */}
      <section className={`wc-pricing-section ${activeCategory === 'websites' ? 'wc-pricing-section--active' : ''}`} data-section="websites">
        <header className="wc-service-section-header">
          <div>
            <h2>Website Packages</h2>
            <p>
              Launch fast with ready-made templates or go flexible with customizable websites. 
              All include hosting setup, security and support.
            </p>
          </div>
          <div className="wc-section-badge">Websites & Landing Pages</div>
        </header>

        {/* Website type toggle */}
        <div className="wc-pricing-subtoggle" id="websiteTypeToggle">
          <button
            className={`wc-subtoggle-option ${websiteType === 'ready' ? 'wc-subtoggle-option--active' : ''}`}
            onClick={() => setWebsiteType('ready')}
          >
            Ready-made templates
          </button>
          <button
            className={`wc-subtoggle-option ${websiteType === 'custom' ? 'wc-subtoggle-option--active' : ''}`}
            onClick={() => setWebsiteType('custom')}
          >
            Customizable websites
          </button>
        </div>

        {/* Ready-made templates pricing cards */}
        <div className={`wc-pricing-grid wc-pricing-grid--web ${websiteType === 'ready' ? 'wc-pricing-grid--visible' : ''}`} data-webtype="ready">
          {pricingData.websites.ready.map((pkg) => (
            <article
              key={pkg.id}
              className={`wc-pricing-card ${pkg.popular ? 'wc-pricing-card--highlight' : ''}`}
              data-package-id={pkg.id}
            >
              <div className="wc-pricing-tag">
                {pkg.tier === 'pro' ? 'Pro Business' : pkg.tier === 'ecommerce-plus' ? 'E-commerce Plus' : 'Starter Essential'}
              </div>
              {pkg.popular && <div className="wc-pricing-popular">Most popular</div>}
              <h3>{pkg.title}</h3>
              <p className="wc-pricing-subtitle">{pkg.subtitle}</p>

              <div className="wc-pricing-price">
                <span className="wc-price-main">
                  <span className="wc-price-currency">$</span>
                  <span className="wc-price-value">
                    {billingMode === 'monthly' ? pkg.billingMonthly : pkg.billingOneTime}
                  </span>
                </span>
                <span className="wc-price-note">
                  {billingMode === 'monthly' ? 'Monthly • Maintenance & support plan' : 'One-time setup • Main build included'}
                </span>
              </div>

              <ul className="wc-pricing-features">
                {pkg.features.map((feature, index) => (
                  <li key={index}><i className="fas fa-check"></i> {feature}</li>
                ))}
              </ul>

           
              
{/* FIXED: Changed 'service' to 'template' and 'source' to 'templates' */}
            <AddToQuoteButton 
              item={pkg} 
              source="templates" 
              className="wc-btn-ghost wc-btn-customize"
            />

              {pkg.footnote && <div className="wc-pricing-footnote">{pkg.footnote}</div>}
            </article>
          ))}
        </div>

        {/* Customizable websites pricing cards */}
        <div className={`wc-pricing-grid wc-pricing-grid--web ${websiteType === 'custom' ? 'wc-pricing-grid--visible' : ''}`} data-webtype="custom">
          {pricingData.websites.custom.map((pkg) => (
            <article
              key={pkg.id}
              className={`wc-pricing-card ${pkg.popular || pkg.bestValue ? 'wc-pricing-card--highlight' : ''}`}
              data-package-id={pkg.id}
            >
              <div className="wc-pricing-tag">
                {pkg.tier === 'pro' ? 'Pro Business' : pkg.tier === 'ecommerce-plus' ? 'E-commerce Plus' : 'Starter Essential'}
              </div>
              {pkg.popular && <div className="wc-pricing-popular">Most popular</div>}
              {pkg.bestValue && <div className="wc-pricing-popular">Best value</div>}
              <h3>{pkg.title}</h3>
              <p className="wc-pricing-subtitle">{pkg.subtitle}</p>

              <div className="wc-pricing-price">
                <span className="wc-price-main">
                  <span className="wc-price-currency">$</span>
                  <span className="wc-price-value">
                    {billingMode === 'monthly' ? pkg.billingMonthly : pkg.billingOneTime}
                  </span>
                </span>
                <span className="wc-price-note">
                  {billingMode === 'monthly' ? 'Monthly • Maintenance & support plan' : 'One-time setup • Main build included'}
                </span>
              </div>

              <ul className="wc-pricing-features">
                {pkg.features.map((feature, index) => (
                  <li key={index}><i className="fas fa-check"></i> {feature}</li>
                ))}
              </ul>


              {/* FIXED: Changed 'service' to 'template' and 'source' to 'templates' */}
            <AddToQuoteButton 
              item={pkg} 
              source="templates" 
              className="wc-btn-ghost wc-btn-customize"
              onClick={() => handlePackageSelect(pkg)}
            />

              {pkg.footnote && <div className="wc-pricing-footnote">{pkg.footnote}</div>}
            </article>



          ))}
        </div>
      </section>

      {/* APPS section */}
      <section className={`wc-pricing-section ${activeCategory === 'apps' ? 'wc-pricing-section--active' : ''}`} data-section="apps">
        <header className="wc-service-section-header">
          <div>
            <h2>Web & Mobile App Packages</h2>
            <p>
              From simple MVPs to full dashboards and client portals, choose the app package that matches your idea.
            </p>
          </div>
          <div className="wc-section-badge">Apps & Dashboards</div>
        </header>

        <div className="wc-pricing-grid">
          {pricingData.apps.map((pkg) => (
            <article
              key={pkg.id}
              className={`wc-pricing-card ${pkg.popular ? 'wc-pricing-card--highlight' : ''}`}
              data-package-id={pkg.id}
            >
              <div className="wc-pricing-tag">
                {pkg.tier === 'pro' ? 'Pro Business' : pkg.tier === 'ecommerce-plus' ? 'Scale Plus' : 'Starter Essential'}
              </div>
              {pkg.popular && <div className="wc-pricing-popular">Popular</div>}
              <h3>{pkg.title}</h3>
              <p className="wc-pricing-subtitle">{pkg.subtitle}</p>

              <div className="wc-pricing-price">
                <span className="wc-price-main">
                  <span className="wc-price-currency">$</span>
                  <span className="wc-price-value">
                    {billingMode === 'monthly' ? pkg.billingMonthly : pkg.billingOneTime}
                  </span>
                </span>
                <span className="wc-price-note">
                  {billingMode === 'monthly' ? 'Monthly • Maintenance & support plan' : 'One-time • Core app'}
                </span>
              </div>

              <ul className="wc-pricing-features">
                {pkg.features.map((feature, index) => (
                  <li key={index}><i className="fas fa-check"></i> {feature}</li>
                ))}
              </ul>

             

              
{/* FIXED: Changed 'service' to 'template' and 'source' to 'templates' */}
            <AddToQuoteButton 
              item={pkg} 
              source="templates" 
              className="wc-btn-ghost wc-btn-customize"
            />
            </article>
          ))}
        </div>
      </section>

      {/* AI section */}
      <section className={`wc-pricing-section ${activeCategory === 'ai' ? 'wc-pricing-section--active' : ''}`} data-section="ai">
        <header className="wc-service-section-header">
          <div>
            <h2>AI Automation Packages</h2>
            <p>
              Connect your website, apps and tools to smart automations that save time and close more deals.
            </p>
          </div>
          <div className="wc-section-badge">AI & Workflows</div>
        </header>

        <div className="wc-pricing-grid">
          {pricingData.ai.map((pkg) => (
            <article
              key={pkg.id}
              className={`wc-pricing-card ${pkg.popular ? 'wc-pricing-card--highlight' : ''}`}
              data-package-id={pkg.id}
            >
              <div className="wc-pricing-tag">
                {pkg.tier === 'pro' ? 'Pro Business' : pkg.tier === 'ecommerce-plus' ? 'E-commerce Plus' : 'Starter Essential'}
              </div>
              {pkg.popular && <div className="wc-pricing-popular">Popular</div>}
              <h3>{pkg.title}</h3>
              <p className="wc-pricing-subtitle">{pkg.subtitle}</p>

              <div className="wc-pricing-price">
                <span className="wc-price-main">
                  <span className="wc-price-currency">$</span>
                  <span className="wc-price-value">
                    {billingMode === 'monthly' ? pkg.billingMonthly : pkg.billingOneTime}
                  </span>
                </span>
                <span className="wc-price-note">
                  {billingMode === 'monthly' ? 'Monthly • Maintenance & support plan' : 'One-time • Setup & handover'}
                </span>
              </div>

              <ul className="wc-pricing-features">
                {pkg.features.map((feature, index) => (
                  <li key={index}><i className="fas fa-check"></i> {feature}</li>
                ))}
              </ul>

             
{/* FIXED: Changed 'service' to 'template' and 'source' to 'templates' */}
            <AddToQuoteButton 
              item={pkg} 
              source="templates" 
              className="wc-btn-ghost wc-btn-customize"
            />


            </article>
          ))}
        </div>
      </section>

      {/* BUILDER SECTION - Separate Component */}
      <BuilderSection 
        onPackageSelect={handlePackageSelection}
        onDashboardNavigate={goToCheckout}
      />
    </main>
  );
}

