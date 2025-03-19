import { Provider } from "react-redux";
import { AuthProvider } from "@/context/AuthContext";
import { LoadScript } from "@react-google-maps/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import store from "@/redux/store";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const libraries = ["places"];

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}> 
      <AuthProvider>
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries}>
          <Component {...pageProps} />
        </LoadScript>
      </AuthProvider>
    </Provider>
  );
}
