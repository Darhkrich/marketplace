// app/(user)/layout.jsx
'use client';

import Sidebar from './components/Sidebar';
import MobileMenu from './components/MobileMenu';
import './styles.css'; // Your existing CSS

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