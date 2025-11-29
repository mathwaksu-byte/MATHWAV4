import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';

interface LayoutProps {
  children: ReactNode;
  siteSettings?: any;
}

export default function Layout({ children, siteSettings }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar siteSettings={siteSettings} />
      <main className="flex-grow pt-5">{children}</main>
      <Footer siteSettings={siteSettings} />
      <FloatingWhatsApp siteSettings={siteSettings} />
    </div>
  );
}
