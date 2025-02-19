import Head from 'next/head';
import Header from '../components/Header';
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 3bec758 (adding booking feature files)
import { useState, useRef, useEffect } from 'react';
import Hero from '@/components/Hero';
import SearchResults from '@/components/SearchResults';
import WhySlowTravel from '@/components/WhySlowTravel';
<<<<<<< HEAD
=======
import Hero from '../components/Hero';
import WhySlowTravel from '../components/WhySlowTravel';
>>>>>>> 6a51d3c (structure changed)
=======
>>>>>>> 3bec758 (adding booking feature files)
import HowDriftWayWorks from '../components/HowDriftWayWorks';
import FeaturedDestinations from '../components/FeaturedDestinations';
import Testimonials from '../components/Testimonials';
import EcoPartners from '../components/EcoPartners';
import BlogSection from '../components/BlogSection';
import Footer from '../components/Footer';

export default function Home() {
<<<<<<< HEAD
<<<<<<< HEAD
  const [searchResults, setSearchResults] = useState([]); 
=======
  const [searchResults, setSearchResults] = useState([]);
>>>>>>> 3bec758 (adding booking feature files)
  const searchResultsRef = useRef(null); // Reference for search results

  useEffect(() => {
    if (searchResults.length > 0) {
      searchResultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [searchResults]); // Scroll when search results update

<<<<<<< HEAD
=======
>>>>>>> 6a51d3c (structure changed)
=======
>>>>>>> 3bec758 (adding booking feature files)
  return (
    <>
      <Head><title>Home Page | Driftway</title></Head>
      <Header />
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 3bec758 (adding booking feature files)
      <Hero setSearchResults={setSearchResults} />

      {/* Search Results Section - Scroll to this when results appear */}
      {searchResults.length > 0 && (
        <div ref={searchResultsRef}>
          <SearchResults searchResults={searchResults} />
        </div>
      )}

<<<<<<< HEAD
=======
      <Hero />
>>>>>>> 6a51d3c (structure changed)
=======
>>>>>>> 3bec758 (adding booking feature files)
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
