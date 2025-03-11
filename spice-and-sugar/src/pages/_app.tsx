import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import theme from "@/styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../components/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header userName="YourUserName"/>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}