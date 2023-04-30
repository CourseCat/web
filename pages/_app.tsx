import "@/styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import customTheme from "../styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={customTheme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
