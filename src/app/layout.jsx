// src/app/layout.jsx
import { CartProvider } from '../context/CartContext';
import '../styles/globals.css';

export const metadata = {
  title: 'Service Quotes',
  description: 'Request quotes for development services',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}