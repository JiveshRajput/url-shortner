import { Footer, Header } from '@/features/web';
import { ReactNode } from 'react';

const WebLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default WebLayout;
