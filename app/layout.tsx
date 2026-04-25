import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'AgentClinic',
  description: 'Where context windows go to heal.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-stone-50 text-zinc-800 min-h-screen flex flex-col">
        <Header />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
