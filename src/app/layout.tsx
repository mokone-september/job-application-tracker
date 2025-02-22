// src/app/layout.tsx
import { Inter } from 'next/font/google'; // Changed from '@next/font'
import './globals.css';
import { ApplicationProvider } from './context/ApplicationContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Job Application Tracker',
  description: 'Track your job applications effectively',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApplicationProvider>
          <div className="container mx-auto px-4 py-8 max-w-3xl">
            {children}
          </div>
        </ApplicationProvider>
      </body>
    </html>
  );
}