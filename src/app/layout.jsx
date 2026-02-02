// src/app/layout.jsx
import { CartProvider } from '../context/CartContext';
import '../styles/globals.css';

// This should be at the top level of your layout.js
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1, // Optional: prevents auto-zoom on input focus in iOS
}



export const metadata = {
  title: 'Service Quotes',
  description: 'Request quotes for development services',
};
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
/>
export default function RootLayout({ children }) {
  return (
    <html lang="en"
    >
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}