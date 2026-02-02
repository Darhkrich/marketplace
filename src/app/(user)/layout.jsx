// app/(user)/layout.jsx
'use client';

import Sidebar from './components/Sidebar';
import MobileMenu from './components/MobileMenu';
import './styles.css'; // Your existing CSS

// This should be at the top level of your layout.js
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1, // Optional: prevents auto-zoom on input focus in iOS
}


export default function UserLayout({ children }) {
  return (
    <>
     
    <div className="dashboard-container">
      <Sidebar />
     <MobileMenu />
      
      <div className="main-content">
        {children}
      </div>
    </div>
    </>
  );
}