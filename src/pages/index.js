import Head from 'next/head';
import Header from '../components/Header';
import { useState, useRef, useEffect } from 'react';
import Hero from '@/components/Hero';
import SearchResults from '@/components/SearchResults';
import WhySlowTravel from '@/components/WhySlowTravel';
import HowDriftWayWorks from '../components/HowDriftWayWorks';
import FeaturedDestinations from '../components/FeaturedDestinations';
import LocalExperience from '../components/LocalExperiences';
import Testimonials from '../components/Testimonials';
import EcoPartners from '../components/EcoPartners';
import BlogSection from '../components/BlogSection';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';

export default function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const searchResultsRef = useRef(null); // Reference for search results
  const router = useRouter();

  useEffect(() => {
    if (searchResults.length > 0) {
      searchResultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [searchResults]); // Scroll when search results update
  useEffect(() => {
    const hash = router.asPath.split('#')[1];
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        // Delay for smooth scroll after render
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <>
      <Head><title>Home Page | Driftway</title></Head>
      <Header />
      <Hero setSearchResults={setSearchResults} />

      {/* Search Results Section - Scroll to this when results appear */}
      {searchResults.length > 0 && (
        <div ref={searchResultsRef}>
          <SearchResults searchResults={searchResults} />
        </div>
      )}

      <WhySlowTravel />
      <HowDriftWayWorks />
      <FeaturedDestinations />
      <LocalExperience />
      <Testimonials />
      <EcoPartners />
      <BlogSection />
      <Footer />
    </>
  );
}
