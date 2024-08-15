import { Header, Footer } from '@/features/url-shortener';
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
