'use client';

import Sidebar from '../../component/admin_Pages/Sidebar';
import TopNav from '../../component/admin_Pages/TopNav';

export default function Sidebar_Navbar({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      {/* Fixed Left Sidebar */}
      <Sidebar />

      {/* Main Content Area next to Sidebar */}
      <div style={{ marginLeft: '260px', width: 'calc(100% - 260px)', display: 'flex', flexDirection: 'column' }}>
        <TopNav />

        {/* Page Content Area */}
        {children && (
          <main style={{ padding: '24px 30px' }}>
            {children}
          </main>
        )}
      </div>
    </div>
  );
}