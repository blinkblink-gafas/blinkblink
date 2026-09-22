import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import "@/styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Regular, SemiBold, Bold
  variable: "--font-poppins",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className={`${poppins.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
