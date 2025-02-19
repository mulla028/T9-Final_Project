import { AuthProvider } from '@/context/AuthContext'; // Import AuthProvider component
<<<<<<< HEAD
<<<<<<< HEAD
import { LoadScript } from "@react-google-maps/api";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const libraries = ['places'];

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      < LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries} >
        <Component {...pageProps} />
      </LoadScript>
=======
=======
import { LoadScript } from "@react-google-maps/api";
>>>>>>> 3bec758 (adding booking feature files)
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const libraries = ['places'];

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
<<<<<<< HEAD
      <Component {...pageProps} />
>>>>>>> 6a51d3c (structure changed)
=======
      < LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries} >
        <Component {...pageProps} />
      </LoadScript>
>>>>>>> 3bec758 (adding booking feature files)
    </AuthProvider>
  );
}
