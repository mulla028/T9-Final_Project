import { AuthProvider } from '@/context/AuthContext'; // Import AuthProvider component
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
