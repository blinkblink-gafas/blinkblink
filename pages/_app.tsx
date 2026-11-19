import { useEffect } from "react";
import type { AppProps } from "next/app";
import { Barlow_Condensed, Poppins } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { setupPersistence } from "@/store/persistence";
import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"], // Regular, SemiBold, Bold, Black (headlines)
  variable: "--font-poppins",
  display: "swap",
});

// Tall, narrow headline face for the editorial look — headings, prices, product names.
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  // Restore the saved cart/wishlist after mount so server and client markup match.
  useEffect(() => setupPersistence(store), []);

  return (
    <Provider store={store}>
      <div className={`${poppins.variable} ${barlowCondensed.variable} font-sans`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </Provider>
  );
}
