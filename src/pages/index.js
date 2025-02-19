import Head from 'next/head';
import Header from '../components/Header';
<<<<<<< HEAD
import { useState, useRef, useEffect } from 'react';
import Hero from '@/components/Hero';
import SearchResults from '@/components/SearchResults';
import WhySlowTravel from '@/components/WhySlowTravel';
=======
import Hero from '../components/Hero';
import WhySlowTravel from '../components/WhySlowTravel';
>>>>>>> 6a51d3c (structure changed)
import HowDriftWayWorks from '../components/HowDriftWayWorks';
import FeaturedDestinations from '../components/FeaturedDestinations';
import Testimonials from '../components/Testimonials';
import EcoPartners from '../components/EcoPartners';
import BlogSection from '../components/BlogSection';
import Footer from '../components/Footer';

export default function Home() {
<<<<<<< HEAD
  const [searchResults, setSearchResults] = useState([]); 
  const searchResultsRef = useRef(null); // Reference for search results

  useEffect(() => {
    if (searchResults.length > 0) {
      searchResultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [searchResults]); // Scroll when search results update

=======
>>>>>>> 6a51d3c (structure changed)
  return (
    <>
      <Head><title>Home Page | Driftway</title></Head>
      <Header />
<<<<<<< HEAD
      <Hero setSearchResults={setSearchResults} />

      {/* Search Results Section - Scroll to this when results appear */}
      {searchResults.length > 0 && (
        <div ref={searchResultsRef}>
          <SearchResults searchResults={searchResults} />
        </div>
      )}

=======
      <Hero />
>>>>>>> 6a51d3c (structure changed)
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
