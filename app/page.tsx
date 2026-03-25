// app/page.tsx
import Header from '@/components/Header';
import BannerSection from '@/components/BannerSection';
import Section1 from '@/components/Section1';
import Section2 from '@/components/Section2';
import Section3 from '@/components/Section3';
import Section4 from '@/components/Section4';
import FAQ from '@/components/FAQ';
import Section5 from '@/components/Section5';
import Footer from '@/components/Footer';
import ClientInit from '@/components/ClientInit';

export default function Home() {
  return (
    <>
      {/* Client-side initializer: WOW.js + session tracking */}
      <ClientInit />

      <Header />
      <BannerSection />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <FAQ />
      <Section5 />
      <Footer />
    </>
  );
}
