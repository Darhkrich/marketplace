import Sidebar from './components/Sidebar';
import MobileMenu from './components/MobileMenu';
// This should be at the top level of your layout.js
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1, // Optional: prevents auto-zoom on input focus in iOS
}



export default function Layout({ children }) {
  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
      {/* Mobile Menu - Hidden on desktop */}
      <div className="block lg:hidden">
        <MobileMenu />
      </div>
      
      <main>
        {children}
      </main>
    </>
  );
}