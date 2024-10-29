import Sidebar from "@/components/common/sidebar";
import "@/styles/globals.css";
import { CssBaseline } from "@mui/material";

export default function App({ Component, pageProps }) {
  return (
    <>
    <CssBaseline />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flexGrow: 1, padding: '20px' }}>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}
