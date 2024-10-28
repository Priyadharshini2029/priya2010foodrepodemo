import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { DataContext } from "@/Provider/DataContext"; // Import the context provider

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DataContext> {/* Wrap the entire app with DataContext */}
      <Component {...pageProps} />
    </DataContext>
  );
}
