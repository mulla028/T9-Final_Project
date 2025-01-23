import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';
import WhySlowTravel from '../components/WhySlowTravel';
import HowDriftWayWorks from '../components/HowDriftWayWorks';
import FeaturedDestinations from '../components/FeaturedDestinations';
import Testimonials from '../components/Testimonials';
import EcoPartners from '../components/EcoPartners';
import BlogSection from '../components/BlogSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head><title>Home Page | Driftway</title></Head>
      <Header />
      <Hero />
      <WhySlowTravel />
      <HowDriftWayWorks />
      <FeaturedDestinations />
      <Testimonials />
      <EcoPartners />
      <BlogSection />
      <Footer />
    </>
  );
}
