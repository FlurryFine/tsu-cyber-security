import { useState } from 'react';
import { Outlet } from 'react-router';
import { Header } from './layout/Header';
import { Sidebar } from './layout/Sidebar';
import { ThemeProvider } from '../context/ThemeContext';
import { ScrollToTop } from './ScrollToTop';
import { BSODContext } from '../context/BSODContext';
import { BSODOverlay } from './BSODOverlay';

export function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [bsodActive, setBsodActive] = useState(false);

  return (
    <ThemeProvider>
      <BSODContext.Provider value={{ triggerBSOD: () => setBsodActive(true) }}>
        <ScrollToTop />
        <div className="h-screen flex flex-col overflow-hidden bg-[var(--bg-primary)]">
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar isOpen={sidebarOpen} />
            <main className="flex-1 overflow-y-auto p-6 bg-[var(--bg-secondary)]">
              <Outlet />
            </main>
          </div>
        </div>
        {bsodActive && <BSODOverlay onComplete={() => setBsodActive(false)} />}
      </BSODContext.Provider>
    </ThemeProvider>
  );
}
